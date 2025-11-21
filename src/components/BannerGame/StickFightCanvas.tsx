'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CombatEngine } from './combatEngine';
import { InputHandler } from './inputHandler';
import { PlayerState, GameState, InputType, InputCommand } from './types';
import { generateSpriteFrame, drawStickman, drawHitEffect, generateHitBoxes, drawHitboxes } from './animations';
import { generateRandomUsername, getLeaderboard, updateLeaderboard, savePlayerData, getRandomOpponent } from './utils';

interface StickFightCanvasProps {
  className?: string;
}

const FPS = 60;
const FRAME_TIME = 1000 / FPS;
const ROUND_TIME = 60000; // 60 seconds per round
const ROUNDS_TO_WIN = 2;

export default function StickFightCanvas({ className = '' }: StickFightCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const combatEngineRef = useRef<CombatEngine>(new CombatEngine());
  const inputHandlerRef = useRef<InputHandler>();
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const lastAttackRef = useRef<Record<string, boolean>>({ j: false, k: false, l: false, ';': false });

  const [username] = useState(() => generateRandomUsername());
  const [gameActive, setGameActive] = useState(false);
  const [showMoveList, setShowMoveList] = useState(false);
  const [opponent, setOpponent] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);

  const [gameState, setGameState] = useState<GameState>(() => ({
    player1: createInitialPlayerState(200, 'right'),
    player2: createInitialPlayerState(400, 'left'),
    round: 1,
    roundTimer: ROUND_TIME,
    gameOver: false,
    frameCount: 0,
    hitStop: 0
  }));

  const [roundWins, setRoundWins] = useState({ player1: 0, player2: 0 });
  const [hitEffects, setHitEffects] = useState<Array<{ type: string, x: number, y: number, frame: number }>>([]);
  const [inputDisplay, setInputDisplay] = useState<{ player1: string[], player2: string[] }>({ player1: [], player2: [] });

  // Create initial player state
  function createInitialPlayerState(x: number, facing: 'left' | 'right'): PlayerState {
    return {
      x,
      y: 300,
      velocityX: 0,
      velocityY: 0,
      health: 100,
      meter: 0,
      currentMove: 'idle',
      currentMoveId: '',
      moveFrame: 0,
      facing,
      grounded: true,
      crouching: false,
      blocking: false,
      stunFrames: 0,
      invincibleFrames: 0,
      comboCount: 0,
      comboDamage: 0,
      comboTimer: 0,
      inputBuffer: [],
      lastMoveId: '',
      animationState: { name: 'idle', frame: 0, totalFrames: 0, loop: true },
      sprite: generateSpriteFrame('idle', 0, facing, true)
    };
  }

  // Handle control button presses
  const handleControlPress = useCallback((input: InputType) => {
    if (!gameActive || gameState.gameOver) return;

    const engine = combatEngineRef.current;
    engine.addInput('player1', input);
    setInputDisplay(prev => ({
      ...prev,
      player1: [...prev.player1.slice(-4), input]
    }));
  }, [gameActive, gameState.gameOver]);

  // Handle directional input
  const handleDirectionPress = useCallback((direction: 'up' | 'down' | 'forward' | 'back') => {
    if (!gameActive || gameState.gameOver) return;

    const engine = combatEngineRef.current;
    engine.addInput('player1', direction);
  }, [gameActive, gameState.gameOver]);

  // Initialize input handler
  useEffect(() => {
    if (gameActive) {
      inputHandlerRef.current = new InputHandler();

      // Add debug toggle
      const handleDebugKey = (e: KeyboardEvent) => {
        if (e.key === '`') {
          setShowDebug(prev => !prev);
        }
      };

      window.addEventListener('keydown', handleDebugKey);

      return () => {
        window.removeEventListener('keydown', handleDebugKey);
        if (inputHandlerRef.current) {
          inputHandlerRef.current.destroy();
        }
      };
    }
  }, [gameActive]);

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    const deltaTime = timestamp - lastTimeRef.current;

    if (deltaTime >= FRAME_TIME) {
      lastTimeRef.current = timestamp;

      setGameState(prev => {
        if (prev.gameOver || prev.hitStop > 0) {
          if (prev.hitStop > 0) {
            return { ...prev, hitStop: prev.hitStop - 1 };
          }
          return prev;
        }

        const newState = { ...prev };
        const engine = combatEngineRef.current;

        // Update frame count
        newState.frameCount++;

        // Update facing direction
        engine.updateFacing(newState.player1, newState.player2);

        // Process player 1 input
        const inputHandler = inputHandlerRef.current;
        if (inputHandler) {
          // Handle movement
          const direction = inputHandler.getMovementDirection();
          engine.handleMovement(newState.player1, direction);

          // Handle blocking
          if (inputHandler.isBlocking() && newState.player1.currentMove === 'idle') {
            newState.player1.currentMove = newState.player1.crouching ? 'block_crouch' : 'block_stand';
            newState.player1.blocking = true;
          } else if (!inputHandler.isBlocking() &&
                     (newState.player1.currentMove === 'block_stand' ||
                      newState.player1.currentMove === 'block_crouch')) {
            newState.player1.currentMove = 'idle';
            newState.player1.blocking = false;
          }

          // Handle attacks - check for new button presses
          const attacks = ['j', 'k', 'l', ';'];
          attacks.forEach(key => {
            const isPressed = inputHandler.isKeyPressed(key);
            if (isPressed && !lastAttackRef.current[key]) {
              // New button press
              const inputMap: Record<string, InputType> = {
                'j': 'punch1',
                'k': 'punch2',
                'l': 'kick1',
                ';': 'kick2'
              };
              engine.addInput('player1', inputMap[key]);
              setInputDisplay(prev => ({
                ...prev,
                player1: [...prev.player1.slice(-4), inputMap[key]]
              }));
            }
            lastAttackRef.current[key] = isPressed;
          });

          // Add directional inputs for special moves
          const heldInputs = inputHandler.getHeldInputs();
          if (heldInputs.includes('down') || heldInputs.includes('forward') ||
              heldInputs.includes('back') || heldInputs.includes('up')) {
            heldInputs.forEach(input => {
              if (['down', 'forward', 'back', 'up'].includes(input)) {
                engine.addInput('player1', input);
              }
            });
          }
        }

        // Process attacks
        const p1Move = engine.getNextMove(newState.player1, 'player1');
        if (p1Move) {
          engine.executeMove(newState.player1, p1Move);
        }

        // Improved AI opponent behavior
        if (newState.player2.currentMove === 'idle' && newState.player2.stunFrames === 0) {
          const distance = Math.abs(newState.player1.x - newState.player2.x);
          const playerIsOnRight = newState.player1.x > newState.player2.x;

          // Movement AI - consider facing direction
          if (distance > 100) {
            // Move closer - forward means towards the opponent
            if ((playerIsOnRight && newState.player2.facing === 'right') ||
                (!playerIsOnRight && newState.player2.facing === 'left')) {
              engine.handleMovement(newState.player2, 'forward');
            } else {
              engine.handleMovement(newState.player2, 'back');
            }
          } else if (distance < 50) {
            // Back away if too close
            engine.handleMovement(newState.player2, 'back');
          }

          // Attack AI - more aggressive
          if (distance < 80 && newState.frameCount % 30 === 0) {
            const attackRoll = Math.random();
            if (attackRoll < 0.3) {
              engine.addInput('player2', 'punch1');
            } else if (attackRoll < 0.5) {
              engine.addInput('player2', 'punch2');
            } else if (attackRoll < 0.7) {
              engine.addInput('player2', 'kick1');
            } else if (attackRoll < 0.85) {
              engine.addInput('player2', 'kick2');
            } else {
              // Special move attempt
              engine.addInput('player2', 'down');
              engine.addInput('player2', 'forward');
              engine.addInput('player2', 'punch2');
            }
          }

          // Defensive AI
          if (newState.player1.currentMove.includes('kick') || newState.player1.currentMove.includes('punch')) {
            if (Math.random() < 0.3) {
              newState.player2.currentMove = 'block_stand';
              newState.player2.blocking = true;
            }
          }
        }

        const p2Move = engine.getNextMove(newState.player2, 'player2');
        if (p2Move) {
          engine.executeMove(newState.player2, p2Move);
        }

        // Update player frames
        engine.updatePlayerFrame(newState.player1);
        engine.updatePlayerFrame(newState.player2);

        // Update sprites
        newState.player1.sprite = generateSpriteFrame(
          newState.player1.currentMove,
          newState.player1.moveFrame,
          newState.player1.facing,
          newState.player1.grounded
        );
        newState.player2.sprite = generateSpriteFrame(
          newState.player2.currentMove,
          newState.player2.moveFrame,
          newState.player2.facing,
          newState.player2.grounded
        );

        // Check hits
        const p1Hit = engine.checkHits(newState.player1, newState.player2);
        if (p1Hit.hit) {
          engine.applyHit(newState.player1, newState.player2, p1Hit.damage, p1Hit.hitType);
          newState.hitStop = 8; // Freeze for impact

          // Add hit effect
          setHitEffects(prev => [...prev, {
            type: p1Hit.hitType,
            x: newState.player2.x,
            y: newState.player2.y - 40,
            frame: 0
          }]);
        }

        const p2Hit = engine.checkHits(newState.player2, newState.player1);
        if (p2Hit.hit) {
          engine.applyHit(newState.player2, newState.player1, p2Hit.damage, p2Hit.hitType);
          newState.hitStop = 8;

          setHitEffects(prev => [...prev, {
            type: p2Hit.hitType,
            x: newState.player1.x,
            y: newState.player1.y - 40,
            frame: 0
          }]);
        }

        // Update round timer
        newState.roundTimer -= FRAME_TIME;

        // Check round end conditions
        if (newState.player1.health <= 0 || newState.player2.health <= 0 || newState.roundTimer <= 0) {
          // Determine round winner
          const winner = newState.player1.health > newState.player2.health ? 'player1' : 'player2';

          setRoundWins(prev => ({
            ...prev,
            [winner]: prev[winner as keyof typeof prev] + 1
          }));

          // Check match end
          if (roundWins[winner as keyof typeof roundWins] + 1 >= ROUNDS_TO_WIN) {
            newState.gameOver = true;
            newState.winner = winner;

            // Update stats
            if (winner === 'player1') {
              updateLeaderboard(username, 1);
            }
          } else {
            // Next round
            newState.round++;
            newState.roundTimer = ROUND_TIME;
            newState.player1 = createInitialPlayerState(200, 'right');
            newState.player2 = createInitialPlayerState(400, 'left');
          }
        }

        return newState;
      });

      // Update hit effects
      setHitEffects(prev => prev
        .map(effect => ({ ...effect, frame: effect.frame + 1 }))
        .filter(effect => effect.frame < 20)
      );
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [username, roundWins]);

  // Start game loop
  useEffect(() => {
    if (!gameActive) return;

    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameActive, gameLoop]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw grid background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid pattern
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    const gridSize = 20;

    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (gameActive) {
      // Draw stage ground
      ctx.fillStyle = '#888';
      ctx.fillRect(0, 280, canvas.width, 20);

      // Draw players
      drawStickman(ctx, gameState.player1, '#000000');
      drawStickman(ctx, gameState.player2, '#666666');

      // Draw hitboxes for debugging
      if (showDebug) {
        const p1Boxes = generateHitBoxes(
          gameState.player1.currentMove,
          gameState.player1.moveFrame,
          gameState.player1.x,
          gameState.player1.y,
          gameState.player1.facing
        );
        const p2Boxes = generateHitBoxes(
          gameState.player2.currentMove,
          gameState.player2.moveFrame,
          gameState.player2.x,
          gameState.player2.y,
          gameState.player2.facing
        );

        drawHitboxes(ctx, p1Boxes.hitBoxes, p1Boxes.hurtBoxes, true);
        drawHitboxes(ctx, p2Boxes.hitBoxes, p2Boxes.hurtBoxes, true);
      }

      // Draw hit effects
      hitEffects.forEach(effect => {
        drawHitEffect(ctx, effect.x, effect.y, effect.frame, effect.type as any);
      });

      // Draw UI overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, 40);

      // Timer and round
      ctx.fillStyle = '#fff';
      ctx.font = '18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.ceil(gameState.roundTimer / 1000)}`, canvas.width / 2, 25);

      // Player names and wins
      ctx.textAlign = 'left';
      ctx.font = '14px monospace';
      ctx.fillText(`${username} [${roundWins.player1}]`, 10, 25);

      ctx.textAlign = 'right';
      ctx.fillText(`[${roundWins.player2}] ${opponent?.username || 'CPU'}`, canvas.width - 10, 25);

      // Combo counter
      if (gameState.player1.comboCount > 1) {
        ctx.textAlign = 'center';
        ctx.font = '20px monospace';
        ctx.fillStyle = '#ffd700';
        ctx.fillText(`${gameState.player1.comboCount} HIT COMBO!`, canvas.width / 2, 80);
        ctx.font = '14px monospace';
        ctx.fillText(`${gameState.player1.comboDamage} DMG`, canvas.width / 2, 100);
      }

      // Debug info
      if (showDebug) {
        ctx.fillStyle = '#ff0';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('DEBUG MODE (` to toggle)', canvas.width - 10, canvas.height - 10);
      }
    }
  }, [gameState, gameActive, username, opponent, roundWins, hitEffects, showDebug]);

  // Load opponent
  useEffect(() => {
    const loadedOpponent = getRandomOpponent();
    setOpponent(loadedOpponent || { username: 'CPU', inputs: [] });
  }, []);

  // Start game
  const handleStartGame = () => {
    setGameActive(true);
    setGameState({
      player1: createInitialPlayerState(200, 'right'),
      player2: createInitialPlayerState(400, 'left'),
      round: 1,
      roundTimer: ROUND_TIME,
      gameOver: false,
      frameCount: 0,
      hitStop: 0
    });
    setRoundWins({ player1: 0, player2: 0 });
  };

  return (
    <div className={`relative bg-gray-100 ${className}`}>
      <canvas
        ref={canvasRef}
        width={600}
        height={320}
        className="w-full max-w-[600px] border border-gray-300"
        style={{ imageRendering: 'crisp-edges' }}
      />

      {/* Control Panel */}
      {gameActive && (
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          {/* Directional Pad */}
          <div className="relative w-24 h-24">
            <button
              className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded"
              onMouseDown={() => handleDirectionPress('up')}
            >
              ↑
            </button>
            <button
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded"
              onMouseDown={() => handleDirectionPress('down')}
            >
              ↓
            </button>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded"
              onMouseDown={() => handleDirectionPress('back')}
            >
              ←
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded"
              onMouseDown={() => handleDirectionPress('forward')}
            >
              →
            </button>
          </div>

          {/* Input Display */}
          <div className="text-white text-sm font-mono bg-gray-900 px-3 py-2 rounded">
            {inputDisplay.player1.slice(-3).join(' → ')}
          </div>

          {/* Attack Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              className="w-12 h-12 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-xs"
              onMouseDown={() => handleControlPress('punch1')}
            >
              LP
            </button>
            <button
              className="w-12 h-12 bg-red-700 hover:bg-red-600 text-white font-bold rounded text-xs"
              onMouseDown={() => handleControlPress('punch2')}
            >
              HP
            </button>
            <button
              className="w-12 h-12 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded text-xs"
              onMouseDown={() => handleControlPress('kick1')}
            >
              LK
            </button>
            <button
              className="w-12 h-12 bg-orange-700 hover:bg-orange-600 text-white font-bold rounded text-xs"
              onMouseDown={() => handleControlPress('kick2')}
            >
              HK
            </button>
          </div>
        </div>
      )}

      {!gameActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 text-white">
          <h2 className="text-3xl font-bold mb-4">StickFight Mini</h2>
          <p className="mb-2">Fighter: {username}</p>
          <p className="mb-6">VS: {opponent?.username || 'Loading...'}</p>

          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition-colors mb-4"
          >
            START FIGHT
          </button>

          <button
            onClick={() => setShowMoveList(!showMoveList)}
            className="text-sm underline"
          >
            {showMoveList ? 'Hide' : 'Show'} Controls
          </button>

          {showMoveList && (
            <div className="mt-4 text-xs bg-gray-800 p-4 rounded max-w-sm">
              <p className="font-bold mb-2">Keyboard Controls:</p>
              <p>Movement: WASD</p>
              <p>Light Punch: J | Heavy Punch: K</p>
              <p>Light Kick: L | Heavy Kick: ;</p>
              <p>Block: U</p>
              <p className="mt-2 font-bold">Special Moves:</p>
              <p>↓→ + P: Uppercut</p>
              <p>↓← + K: Sweep</p>
              <p>→←→ + P: Demon Rush</p>
              <p className="mt-2">Debug: ` (backtick)</p>
            </div>
          )}
        </div>
      )}

      {gameState.gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 text-white">
          <h2 className="text-4xl font-bold mb-4">
            {gameState.winner === 'player1' ? 'YOU WIN!' : 'YOU LOSE!'}
          </h2>
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
