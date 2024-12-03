
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SavePage({ params, searchParams }) {
  const p = await searchParams;
  const userId = p?.userId
  const checkpoint = parseInt(p?.checkpoint)
  const score = parseInt(p?.score)
  const health = parseInt(p?.health)
  const currentWeaponId = parseInt(p?.currentWeaponId)
  console.log(userId, checkpoint, score, health, currentWeaponId)
  const session = await auth();
  if (!session) {
    redirect('/auth/login')
  }
  if (session.user.id !== userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id}
  })

  if (user?.score === null || score > user.score) {
    await db.user.update({
      where: {
        id: session.user.id
      },
      data: {
        score
      }
    })
  }

  let adjustedScore
  if (score >= 15 && checkpoint === 0) {
      adjustedScore = 0;
  } 

  await db.gameState.upsert({
    where: {
      user_id: userId
    },
    update: {
      checkpoint,
      score: adjustedScore,
      health,
      currentWeapon: currentWeaponId,
    },
    create: {
      checkpoint,
      score,
      health,
      currentWeapon: currentWeaponId,
      user_id: userId
    }
  });

  redirect('/')
}