import { OpenAIApi, Configuration } from "openai-edge";

// OpenAI API配置
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// 初始化OpenAI API客户端
const openai = new OpenAIApi(config);

/**
 * 获取文本的嵌入向量
 * @param text 需要获取嵌入向量的文本
 * @returns 嵌入向量数组
 */
export async function getEmbeddings(text: string): Promise<number[]> {
    try {
        // 替换文本中的换行符，优化输入
        const sanitizedText = text.replace(/\n/g, " ");

        // 调用OpenAI API创建嵌入向量
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: sanitizedText,
        });

        // 解析API响应
        const result = await response.json();

        // 返回嵌入向量
        return result.data[0].embedding as number[];
    } catch (error) {
        console.error("调用OpenAI嵌入API时出错:", error);
        throw new Error("获取嵌入向量失败");
    }
}
