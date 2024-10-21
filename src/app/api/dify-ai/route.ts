import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// 定义 URL
const DIDY_API_URL = process.env.DIDY_API_URL || "https://api.dify.ai/v1";
// 定义 API_KEY
const DIFY_API_KEY = process.env.DIFY_API_KEY;

export async function POST(req: NextRequest) {
  const { techDirection } = await req.json();

  // 确保请求体中包含 techDirection 字段
  if (!techDirection) {
    return NextResponse.json({ message: "技术方向不存在？" }, { status: 400 });
  }

  try {
    const response = await axios.post(
      `${DIDY_API_URL}/workflows/run`,
      {
        inputs: { title: techDirection },
        response_mode: "blocking",
        user: "test-user",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DIFY_API_KEY}`,
        },
      }
    );

    const outputs = response.data.data.outputs;
    // 检查输出类型和格式
    console.log("输出内容:", outputs.questions);

    // 解析 outputs 中的 JSON 字符串
    let parsedOutputs;
    try {
      parsedOutputs = JSON.parse(outputs.questions);
    } catch (e) {
      console.error("解析 outputs.questions 失败:", e);
      return NextResponse.json(
          { message: "输出格式无效" },
          { status: 400 }
      );
    }

    // 检查解析后的数据是否包含 questions 数组
    if (!parsedOutputs.questions || !Array.isArray(parsedOutputs.questions)) {
      console.error("解析后的数据不包含有效的 questions 数组");
      return NextResponse.json(
          { message: "输出格式无效" },
          { status: 400 }
      );
    }

    // 返回解析后的数据，确保 questions 是一个数组
    return NextResponse.json(parsedOutputs);
  } catch (error: unknown) {
    console.error("运行工作流错误:", error);

    const errorMessage =
      ((error as Error & { response?: { data?: string } }).response
        ?.data as string) || (error as Error).message;

    return NextResponse.json(
      { message: "内容输出错误:", error: errorMessage },
      { status: 500 }
    );
  }
}
