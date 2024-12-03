import { db } from "@/lib/db"

export const saveGameProgress = async (
  userId: string, 
  gameStateData: { 
    checkpoint: number; 
    level: number; 
    health: number 
  },
  weapons: string[],
  powerups: string[],
) => {
  if (!userId) return null;
  try {
    const inventory = await db.inventory.upsert({
      where: { gameState_id: userId },
      update: {
        weapon_ids: weapons,
        powerup_ids: powerups,
      },
      create: {
        weapon_ids: weapons,
        powerup_ids: powerups,
        gameState: { create: gameStateData }
      }
    });

    const gameState = await db.gameState.upsert({
      where: { user_id: userId },
      update: gameStateData,
      create: {
        ...gameStateData,
        user: { connect: { id: userId } },
        inventory: { create: { id: inventory.id } }
      }
    });

    console.log('GameState saved:', gameState);
    return gameState;
  } catch (error: any) {
    console.error('Error saving GameState:', error);
    return null
  }
}