package domain

import (
	"testing"
)

// TestJiebaTokenizer 测试 jieba 分词器基本功能
func TestJiebaTokenizer(t *testing.T) {
	tokenizer := NewJiebaTokenizer()

	tests := []struct {
		name     string
		input    string
		wantMore bool // 期望至少有这么多分词
	}{
		{
			name:     "中文分词测试",
			input:    "我爱北京天安门",
			wantMore: true,
		},
		{
			name:     "中英文混合",
			input:    "Go语言是一种编程语言",
			wantMore: true,
		},
		{
			name:     "英文测试",
			input:    "Hello World",
			wantMore: true,
		},
		{
			name:     "搜索模式分词",
			input:    "人工智能技术应用",
			wantMore: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tokens := tokenizer.Tokenize([]byte(tt.input))

			if len(tokens) == 0 {
				t.Errorf("JiebaTokenizer.Tokenize() returned no tokens for input: %s", tt.input)
				return
			}

			t.Logf("输入: %s", tt.input)
			t.Logf("分词结果:")
			for i, token := range tokens {
				t.Logf("  [%d] %s", i, string(token.Term))
			}
		})
	}
}

// TestJiebaAnalyzer 测试 jieba 分析器
func TestJiebaAnalyzer(t *testing.T) {
	analyzer := NewJiebaAnalyzer()

	input := "这是一个中文分词测试"
	tokens := analyzer.Analyze([]byte(input))

	if len(tokens) == 0 {
		t.Errorf("JiebaAnalyzer.Analyze() returned no tokens")
		return
	}

	t.Logf("分析器测试 - 输入: %s", input)
	for i, token := range tokens {
		t.Logf("  [%d] %s (position: %d)", i, string(token.Term), token.Position)
	}
}
