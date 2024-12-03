import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log(req);
    const { userId, checkpoint, score, health, currentWeapon } = await req.json();

    const user = await getUserById(userId);

    if (!user) {
      return new NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await db.gameState.delete({
      where: { user_id: userId}
    });

    const savedGameState = await db.gameState.create({
      data: {
        checkpoint,
        score,
        health,
        currentWeapon,
        connect: {
          user_id: userId,
        }
      }
    });

    return new NextResponse.json(savedGameState, { status: 200 });
  } catch (error) {
    console.error('Error saving game state:', error);
    return new NextResponse.json({ error: 'Failed to save game state' }, { status: 500 } )
  }
}