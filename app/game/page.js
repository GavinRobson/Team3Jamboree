"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import GameScene from "@/components/game/GameScene";

export default function GamePage() {
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
      scene: GameScene,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
    };
    console.log(config)
    // Initialize Phaser game instance
    const game = new Phaser.Game(config);

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
