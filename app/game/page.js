"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import GameScene from "@/components/game/GameScene";
import PauseMenu from "@/components/game/PauseMenu";
import { useSearchParams } from "next/navigation";

export default function GamePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('u');
  const checkpoint = searchParams.get('checkpoint');
  const score = searchParams.get('score');
  const health = searchParams.get('health');
  const currentWeapon = searchParams.get('currentWeapon');

  const gameContainerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Phaser configuration
    const config = {
      type: Phaser.CANVAS,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: gameContainerRef.current,
      canvas: canvasRef.current,
      scene: [GameScene, PauseMenu],
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
    };
    // Initialize Phaser game instance
    const game = new Phaser.Game(config);
    game.scene.start('GameScene', { 
      userId: userId,
      checkpoint,
      score,
      health,
      currentWeapon
    })

    // Cleanup function to destroy the Phaser instance when component unmounts
    return () => {
      if (game) {
        console.log("Phaser destroyed")
        game.destroy(true);
      }
    };
  }, []);

  return (
    <div ref={gameContainerRef} className="w-screen h-screen flex items-center justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
}
