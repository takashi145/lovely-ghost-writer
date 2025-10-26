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
指定された人物の未来を以下のルールに従って占います。

【ルール】
- 今月の未来を予言する内容にする  
- 1ヶ月を4週に分け、各週ごとに1節の四行詩を作る（計4節）  
- 文体は詩的で、やや古風な表現を用いる
- 直接的な説明は避け、起こることを暗示する象徴的なイメージを用いる
- 各節には、読者への助言や行動指針を暗示的に含める
- 出力は4つの四行詩だけを空行で区切って表示する
- 題名・週番号・解説などは一切入れない

【ユーザー情報】
名前: ${name}
生年月日: ${birthDate}
血液型: ${bloodType}

【出力例】
霧深き谷に月は隠れ、歩みは試される
落葉に足を取られても、心の灯を頼れ
水面に映る光に従えば、助けは現れん
迷いを抱えつつも、前に進むべきであろう

古樹の影で風が囁き、過去は静かに去る
残る枝に触れれば、新しき縁は芽吹く
影の小径は惑わせるが、恐れず踏み込め
短き休息を取りつつ、次の道を探すがよい`;

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
