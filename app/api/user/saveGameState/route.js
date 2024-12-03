import { getUserById } from "@/data/user";

export async function POST(req) {
  try {
    const { userId, gameState, weapons, powerups } = await req.json();

    const user = await getUserById(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const savedGameState = await db.gameState.upsert({
      where: {
        id: user.gameState_id || '',
      },
      update: {
        checkpoint: gameState.checkpoint,
        level: gameState.level,
        health: gameState.health,
      },
      create: {
        checkpoint: gameState.checkpoint,
        level: gameState.level,
        health: gameState.health,
        user_id: user.id,
        inventory: {
          createe: {
            weapon_ids: weapons,
            powerup_ids: powerups
          }
        }
      }
    });

    return new Response(JSON.stringify(savedGameState), { status: 200 });
  } catch (error) {
    console.error('Error saving game state:', error);
    return new Response(JSON.stringify({ error: 'Failed to save game state' }), { status: 500 } )
  }
}