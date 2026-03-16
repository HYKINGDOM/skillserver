package domain

import (
	"sync"

	"github.com/blevesearch/bleve/v2/analysis"
	"github.com/yanyiwu/gojieba"
)

// JiebaTokenizer 实现 bleve.Tokenizer 接口
// 使用 gojieba 进行中文分词
type JiebaTokenizer struct {
	jieba *gojieba.Jieba
	once  sync.Once
}

// 全局单例实例，避免重复加载词典
var (
	globalJieba     *gojieba.Jieba
	globalJiebaOnce sync.Once
)

// getGlobalJieba 获取全局 jieba 实例（单例模式）
func getGlobalJieba() *gojieba.Jieba {
	globalJiebaOnce.Do(func() {
		// 使用默认词典路径
		globalJieba = gojieba.NewJieba()
	})
	return globalJieba
}

// NewJiebaTokenizer 创建新的 jieba 分词器
func NewJiebaTokenizer() *JiebaTokenizer {
	return &JiebaTokenizer{
		jieba: getGlobalJieba(),
	}
}

// Tokenize 实现 analysis.Tokenizer 接口
// 将输入文本分词为 Token 流
func (t *JiebaTokenizer) Tokenize(input []byte) analysis.TokenStream {
	inputStr := string(input)

	// 使用精确模式分词，适合搜索场景
	words := t.jieba.CutForSearch(inputStr, true)

	tokens := make(analysis.TokenStream, 0, len(words))

	position := 0
	for _, word := range words {
		// 跳过空白字符
		if len(word) == 0 {
			continue
		}

		// 创建 token
		token := &analysis.Token{
			Term:     []byte(word),
			Position: position,
			Type:     analysis.Ideographic, // 中文使用 Ideographic 类型
		}

		tokens = append(tokens, token)
		position++
	}

	return tokens
}

// JiebaAnalyzer 组合分词器和其他分析组件
type JiebaAnalyzer struct {
	tokenizer *JiebaTokenizer
}

// NewJiebaAnalyzer 创建新的 jieba 分析器
func NewJiebaAnalyzer() *JiebaAnalyzer {
	return &JiebaAnalyzer{
		tokenizer: NewJiebaTokenizer(),
	}
}

// Analyze 实现 analysis.Analyzer 接口
func (a *JiebaAnalyzer) Analyze(input []byte) analysis.TokenStream {
	return a.tokenizer.Tokenize(input)
}
