package domain

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"

	"github.com/blevesearch/bleve/v2"
	"github.com/blevesearch/bleve/v2/analysis"
	"github.com/blevesearch/bleve/v2/analysis/analyzer/custom"
	"github.com/blevesearch/bleve/v2/analysis/token/lowercase"
	"github.com/blevesearch/bleve/v2/mapping"
	"github.com/blevesearch/bleve/v2/search/query"
)

// jiebaAnalyzerName 定义 jieba 分析器名称
const jiebaAnalyzerName = "jieba_analyzer"

// Searcher handles full-text search using bleve
type Searcher struct {
	indexPath string
	index     bleve.Index
}

// NewSearcher creates a new Searcher with a bleve index
func NewSearcher(skillsDir string) (*Searcher, error) {
	indexPath := filepath.Join(skillsDir, ".index")

	// Try to open existing index
	index, err := bleve.Open(indexPath)
	if err != nil {
		// Create new index with jieba analyzer if it doesn't exist
		mapping := createIndexMapping()
		index, err = bleve.New(indexPath, mapping)
		if err != nil {
			return nil, fmt.Errorf("failed to create search index: %w", err)
		}
	}

	return &Searcher{
		indexPath: indexPath,
		index:     index,
	}, nil
}

// createIndexMapping 创建带有 jieba 中文分词器的索引映射
func createIndexMapping() mapping.IndexMapping {
	indexMapping := bleve.NewIndexMapping()

	// 注册 jieba 分词器
	jiebaTokenizer := NewJiebaTokenizer()
	
	// 创建自定义分析器，组合 jieba 分词器和小写转换
	err := indexMapping.AddCustomAnalyzer(jiebaAnalyzerName,
		map[string]interface{}{
			"type":          custom.Name,
			"tokenizer":     jiebaTokenizer,
			"token_filters": []string{lowercase.Name},
		},
	)
	if err != nil {
		// 如果注册失败，使用默认映射
		return indexMapping
	}

	// 设置默认分析器为 jieba 分析器
	indexMapping.DefaultAnalyzer = jiebaAnalyzerName

	// 创建文档映射
	docMapping := bleve.NewDocumentMapping()

	// name 字段 - 使用 jieba 分析器
	nameFieldMapping := bleve.NewTextFieldMapping()
	nameFieldMapping.Analyzer = jiebaAnalyzerName
	docMapping.AddFieldMappingsAt("name", nameFieldMapping)

	// content 字段 - 使用 jieba 分析器
	contentFieldMapping := bleve.NewTextFieldMapping()
	contentFieldMapping.Analyzer = jiebaAnalyzerName
	docMapping.AddFieldMappingsAt("content", contentFieldMapping)

	// description 字段 - 使用 jieba 分析器
	descFieldMapping := bleve.NewTextFieldMapping()
	descFieldMapping.Analyzer = jiebaAnalyzerName
	docMapping.AddFieldMappingsAt("description", descFieldMapping)

	// license 字段 - 使用 jieba 分析器
	licenseFieldMapping := bleve.NewTextFieldMapping()
	licenseFieldMapping.Analyzer = jiebaAnalyzerName
	docMapping.AddFieldMappingsAt("license", licenseFieldMapping)

	// compatibility 字段 - 使用 jieba 分析器
	compatFieldMapping := bleve.NewTextFieldMapping()
	compatFieldMapping.Analyzer = jiebaAnalyzerName
	docMapping.AddFieldMappingsAt("compatibility", compatFieldMapping)

	// 设置默认文档映射
	indexMapping.AddDocumentMapping("_default", docMapping)

	return indexMapping
}

// IndexSkills indexes a list of skills
func (s *Searcher) IndexSkills(skills []Skill) error {
	// Clear existing index by deleting and recreating
	s.index.Close()
	os.RemoveAll(s.indexPath)

	mapping := createIndexMapping()
	index, err := bleve.New(s.indexPath, mapping)
	if err != nil {
		return fmt.Errorf("failed to recreate index: %w", err)
	}
	s.index = index

	// Index each skill
	for _, skill := range skills {
		doc := map[string]any{
			"name":    skill.Name,
			"content": skill.Content,
		}
		if skill.Metadata != nil {
			if skill.Metadata.Description != "" {
				doc["description"] = skill.Metadata.Description
			}
			// Index metadata fields if present
			if skill.Metadata.License != "" {
				doc["license"] = skill.Metadata.License
			}
			if skill.Metadata.Compatibility != "" {
				doc["compatibility"] = skill.Metadata.Compatibility
			}
		}
		if err := index.Index(skill.Name, doc); err != nil {
			return fmt.Errorf("failed to index skill %s: %w", skill.Name, err)
		}
	}

	return nil
}

// Search performs a full-text search and returns matching skills
func (s *Searcher) Search(queryStr string) ([]Skill, error) {
	if s.index == nil {
		return []Skill{}, nil
	}

	// 对查询字符串进行分词，支持中文搜索
	queries := s.buildSearchQueries(queryStr)

	disjunction := bleve.NewDisjunctionQuery(queries...)

	req := bleve.NewSearchRequest(disjunction)
	req.Size = 100 // Limit results

	searchResults, err := s.index.Search(req)
	if err != nil {
		return nil, fmt.Errorf("search failed: %w", err)
	}

	var skills []Skill
	for _, hit := range searchResults.Hits {
		// The hit.ID is the skill name/ID used for indexing
		skills = append(skills, Skill{
			Name: hit.ID,
			ID:   hit.ID, // ID is the same as Name
		})
	}

	return skills, nil
}

// buildSearchQueries 构建搜索查询，支持中文分词
func (s *Searcher) buildSearchQueries(queryStr string) []query.Query {
	var queries []query.Query

	// 使用 jieba 对查询字符串进行分词
	tokenizer := NewJiebaTokenizer()
	tokens := tokenizer.Tokenize([]byte(queryStr))

	// 英文单词正则，用于检测纯英文查询
	englishPattern := regexp.MustCompile(`^[a-zA-Z0-9]+$`)

	// 为每个分词结果创建查询
	for _, token := range tokens {
		term := string(token.Term)
		if len(term) == 0 {
			continue
		}

		// 对每个字段创建匹配查询
		queries = append(queries, s.createFieldQueries(term)...)
	}

	// 如果分词后没有查询条件，使用原始查询
	if len(queries) == 0 {
		queries = s.createFieldQueries(queryStr)
	}

	// 如果查询字符串包含英文，也添加原始查询以支持英文搜索
	if englishPattern.MatchString(queryStr) {
		queries = append(queries, s.createFieldQueries(queryStr)...)
	}

	return queries
}

// createFieldQueries 为指定词创建所有字段的查询
func (s *Searcher) createFieldQueries(term string) []query.Query {
	var queries []query.Query

	fields := []string{"content", "name", "description", "license", "compatibility"}

	for _, field := range fields {
		q := bleve.NewMatchQuery(term)
		q.SetField(field)
		queries = append(queries, q)
	}

	return queries
}

// Close closes the search index
func (s *Searcher) Close() error {
	if s.index != nil {
		return s.index.Close()
	}
	return nil
}

// Analyzer 返回用于搜索的分析器（供外部使用）
func (s *Searcher) Analyzer() analysis.Analyzer {
	return NewJiebaAnalyzer()
}
