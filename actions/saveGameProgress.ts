import { db } from "@/lib/db"

export const saveGameProgress = async (
  userId: string, 
  checkpoint: number,
  score: number,
  health: number,
  currentWeapon: number
) => {
  if (!userId) return null;
  try {
    await db.gameState.delete({
      where: { userId: userId }
    })

    const gameState = await db.gameState.create({
      data: {
        checkpoint,
        score,
        health,
        currentWeapon,
        connect: {
          user_id: userId
        }
      }
    })

    console.log('GameState saved:', gameState);
    return gameState;
  } catch (error: any) {
    console.error('Error saving GameState:', error);
    return null
  }
}