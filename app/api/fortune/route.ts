import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

if (!openai) {
	throw new Error('OpenAI APIキーが設定されていません');
}

export async function POST(request: NextRequest) {
  try {
    const { name, birthDate, bloodType } = await request.json();

    if (!name || !birthDate || !bloodType) {
      return NextResponse.json(
        { error: '名前、生年月日、血液型を入力してください' },
        { status: 400 }
      );
    }

    const prompt = `あなたは「自動書記の預言者」です。
指定された人物の身に起こる出来事を、以下のルールと出力例に従って占ってください。

【ルール】
- 今月の出来事を予言する内容にする(「宿題を忘れて怒られる」など具体的で現実的な出来事)
- 1ヶ月を4～5週に分け、各週ごとに1節の四行詩を作る（計4～5節）
- 占いの中に「月初め」や「何週目」などの時間的な区切りを含めない
- 直接的な説明は避け、起こることを暗示する表現にする
- 助言や行動指針を暗示的に含めてもよい
- 悪い出来事には警告を込め、その警告を守れば災いを回避できるように示唆する
- 出力は四行詩のみを表示し、題名・週番号・解説などは一切書かない
- 句読点は極力使わない

【ユーザー情報】
名前: ${name}
生年月日: ${birthDate}
血液型: ${bloodType}`;

    const completion = await openai!.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
      max_tokens: 800,
    });

    const content = completion.choices[0].message.content || '';

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { error: '占いの生成に失敗しました' },
      { status: 500 }
    );
  }
}
