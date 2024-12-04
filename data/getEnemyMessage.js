import OpenAI from "openai";

export const getEnemyMessage = async (health) => {
  const openai = new OpenAI({ 
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true 
  });
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { 
        role: "system", 
        content: `You are an assignment that is an enemy in my game. The goal of the game is for the user to complete (kill) the assignments that come in before they kill the user. Base your response on the health of the player: ${health}. Keep your response on the shorter side and come up with a name for the assignment in this formet: <assignment_name>: <message>` 
      },
      {
        role: 'user',
        content: "Say something you think that type of enemy would say."
      }
    ]
  })

  return completion.choices[0].message
}