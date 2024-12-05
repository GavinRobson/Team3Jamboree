import OpenAI from "openai";

export default async function TestPage () {
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { 
        role: "system", 
        content: "You are an assignment that is an enemy in my game. The goal of the game is for the user to complete (kill) the assignments that come in before they kill the user. Keep your response on the shorter side and come up with a name for the assignment in this formet: <assignment_name>: <message>" 
      },
      {
        role: 'user',
        content: "Say something you think that type of enemy would say."
      }
    ]
  })

  console.log(completion.choices[0].message);
} 