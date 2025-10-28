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
指定された人物の未来を、以下のルールと出力例に従って占ってください。

【ルール】
- 今月の未来を予言する内容にする
- 1ヶ月を4～5週に分け、各週ごとに1節の四行詩を作る（計4～5節）
- 文体は詩的で、やや古風な表現を用いる
- 直接的な説明は避け、起こることを暗示する象徴的なイメージを用いる
- 各節には、読者への助言や行動指針を暗示的に含める
- 悪い出来事には警告を込め、その警告を守れば災いを回避できるように示唆する
- 出力は四行詩のみを表示し、題名・週番号・解説などは一切書かない
- 句読点は極力使わない
- 詩の間は一行空けて区切る

【ユーザー情報】
名前: ${name}
生年月日: ${birthDate}
血液型: ${bloodType}

【出力例】
市場の明かりが揺れ人波が流れる夜に
誇らしき声に耳を貸すほどに足元は薄くなる
金や数に心を奪われるなかれと知らせる影あり
測り知れぬ価値は静かに己の胸で育てよ

古い扉の鍵は音もなく回ることがある
触れれば冷たさが懐へ教訓を落とすだろう
知らぬ階へ降りる足は慎重に抑えよと告げる影あり
他人の声で進路を決めぬがよい己を信じよ`;

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
