import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o', // change to gpt-3.5-turbo if needed
        messages: [
          {
            role: 'system',
            content: `
You are Loopwise: a Socratic tutor. 
Never explain directly. Only ask intelligent, layered questions.
Your job is to challenge the learner to reveal misunderstandings and deepen clarity.
Use the Feynman method: guide the user to explain things simply.
Always assume they may be confused. Keep questioning until mastery is clear.
Do not let them escape the loop.
            `.trim()
          },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    const data = await completion.json();

    // 🟠 DEBUG: If OpenAI returns an error
    if (data.error) {
      return NextResponse.json({ reply: `⚠️ OpenAI error: ${data.error.message}` }, { status: 500 });
    }

    // 🟠 DEBUG: If no valid reply
    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ reply: `⚠️ No valid reply. Raw data: ${JSON.stringify(data)}` }, { status: 500 });
    }

    // ✅ Success
    return NextResponse.json({ reply: data.choices[0].message.content });

  } catch (err: any) {
    console.error("💥 Caught error:", err);
    return NextResponse.json({ reply: `⚠️ Internal error: ${err.message}` }, { status: 500 });
  }
}
