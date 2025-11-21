import { PlayerState, SpriteFrame, MoveType, HitBox } from './types';

// Base stickman proportions
const STICKMAN_HEIGHT = 80;
const HEAD_RADIUS = 10;
const TORSO_LENGTH = 25;
const ARM_LENGTH = 20;
const LEG_LENGTH = 30;

// Generate sprite frame for different animation states
export function generateSpriteFrame(
    moveType: MoveType,
    frame: number,
    facing: 'left' | 'right',
    grounded: boolean
): SpriteFrame {
    const flip = facing === 'left' ? -1 : 1;
    const baseY = grounded ? 0 : -20;

    // Default idle pose
    let sprite: SpriteFrame = {
        head: { x: 0, y: baseY - STICKMAN_HEIGHT, radius: HEAD_RADIUS },
        neck: { x: 0, y: baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 2 },
        spine: { x: 0, y: baseY - STICKMAN_HEIGHT + HEAD_RADIUS + TORSO_LENGTH },
        hips: { x: 0, y: baseY - LEG_LENGTH },

        leftShoulder: { x: -5 * flip, y: baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 8 },
        leftElbow: { x: -12 * flip, y: baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 18 },
        leftHand: { x: -15 * flip, y: baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 28 },

        rightShoulder: { x: 5 * flip, y: baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 8 },
        rightElbow: { x: 12 * flip, y: baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 18 },
        rightHand: { x: 15 * flip, y: baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 28 },

        leftHip: { x: -5, y: baseY - LEG_LENGTH },
        leftKnee: { x: -8, y: baseY - LEG_LENGTH / 2 },
        leftFoot: { x: -10, y: baseY },

        rightHip: { x: 5, y: baseY - LEG_LENGTH },
        rightKnee: { x: 8, y: baseY - LEG_LENGTH / 2 },
        rightFoot: { x: 10, y: baseY }
    };

    // Animate based on move type
    const t = frame / 10; // Normalized time

    switch (moveType) {
        case 'walk_forward':
            const walkCycle = Math.sin(t * Math.PI * 2);
            sprite.leftKnee.x = -8 + walkCycle * 10;
            sprite.leftFoot.x = -10 + walkCycle * 15;
            sprite.rightKnee.x = 8 - walkCycle * 10;
            sprite.rightFoot.x = 10 - walkCycle * 15;
            sprite.leftHand.x = -15 * flip - walkCycle * 5 * flip;
            sprite.rightHand.x = 15 * flip + walkCycle * 5 * flip;
            break;

        case 'walk_backward':
            const backCycle = Math.sin(t * Math.PI * 2);
            sprite.leftKnee.x = -8 - backCycle * 8;
            sprite.leftFoot.x = -10 - backCycle * 12;
            sprite.rightKnee.x = 8 + backCycle * 8;
            sprite.rightFoot.x = 10 + backCycle * 12;
            break;

        case 'crouch':
            sprite.spine.y = baseY - STICKMAN_HEIGHT + HEAD_RADIUS + TORSO_LENGTH + 10;
            sprite.hips.y = baseY - LEG_LENGTH + 15;
            sprite.leftKnee.x = -15;
            sprite.leftKnee.y = baseY - 10;
            sprite.rightKnee.x = 15;
            sprite.rightKnee.y = baseY - 10;
            sprite.head.y = baseY - STICKMAN_HEIGHT + 15;
            sprite.neck.y = baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 17;
            break;

        case 'jump':
            const jumpArc = Math.sin(t * Math.PI);
            sprite.leftKnee.y = baseY - LEG_LENGTH / 2 - jumpArc * 10;
            sprite.leftFoot.y = baseY - jumpArc * 15;
            sprite.rightKnee.y = baseY - LEG_LENGTH / 2 - jumpArc * 10;
            sprite.rightFoot.y = baseY - jumpArc * 15;
            sprite.leftHand.y = baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 28 - jumpArc * 10;
            sprite.rightHand.y = baseY - STICKMAN_HEIGHT + HEAD_RADIUS + 28 - jumpArc * 10;
            break;

        case 'jab':
            if (frame < 5) {
                // Wind up
                sprite.rightElbow.x = 5 * flip;
                sprite.rightHand.x = 8 * flip;
            } else if (frame < 7) {
                // Strike
                sprite.rightElbow.x = 25 * flip;
                sprite.rightHand.x = 45 * flip;
                sprite.rightHand.y -= 5;
            }
            break;

        case 'straight':
            if (frame < 6) {
                // Pull back
                sprite.rightElbow.x = -5 * flip;
                sprite.rightHand.x = -10 * flip;
                sprite.spine.x = -3 * flip;
            } else if (frame < 9) {
                // Punch
                sprite.rightElbow.x = 30 * flip;
                sprite.rightHand.x = 50 * flip;
                sprite.spine.x = 5 * flip;
            }
            break;

        case 'hook':
            const hookAngle = frame < 7 ? 0 : Math.PI / 4;
            sprite.rightElbow.x = 20 * flip * Math.cos(hookAngle);
            sprite.rightElbow.y -= 10 * Math.sin(hookAngle);
            sprite.rightHand.x = 40 * flip * Math.cos(hookAngle * 1.5);
            sprite.rightHand.y -= 15 * Math.sin(hookAngle * 1.5);
            break;

        case 'uppercut':
            if (frame < 8) {
                // Crouch and wind up
                sprite.spine.y += 10;
                sprite.rightHand.y += 15;
                sprite.rightHand.x = 5 * flip;
            } else if (frame < 11) {
                // Rising punch
                sprite.spine.y -= 5;
                sprite.rightHand.y -= 35;
                sprite.rightHand.x = 25 * flip;
            }
            break;

        case 'low_kick':
            if (frame < 6) {
                sprite.rightKnee.x = 15 * flip;
                sprite.rightFoot.x = 20 * flip;
            } else if (frame < 9) {
                sprite.rightKnee.x = 35 * flip;
                sprite.rightFoot.x = 55 * flip;
                sprite.rightFoot.y = baseY - 10;
            }
            break;

        case 'mid_kick':
            if (frame < 7) {
                sprite.rightKnee.y = baseY - LEG_LENGTH / 2 - 15;
                sprite.rightFoot.y = baseY - 20;
            } else if (frame < 11) {
                sprite.rightKnee.x = 30 * flip;
                sprite.rightKnee.y = baseY - LEG_LENGTH / 2 - 20;
                sprite.rightFoot.x = 60 * flip;
                sprite.rightFoot.y = baseY - 35;
            }
            break;

        case 'high_kick':
            const kickRotation = frame < 8 ? 0 : (frame - 8) * Math.PI / 8;
            sprite.rightKnee.x = 25 * flip * Math.cos(kickRotation);
            sprite.rightKnee.y = baseY - LEG_LENGTH / 2 - 30 * Math.sin(kickRotation);
            sprite.rightFoot.x = 50 * flip * Math.cos(kickRotation);
            sprite.rightFoot.y = baseY - 60 * Math.sin(kickRotation);
            sprite.spine.x = -10 * flip; // Lean back
            break;

        case 'sweep':
            sprite.spine.y = baseY - 20;
            sprite.hips.y = baseY - 15;
            sprite.leftHand.y = baseY - 10;
            sprite.rightFoot.x = 40 * flip * Math.cos(t * Math.PI);
            sprite.rightFoot.y = baseY;
            sprite.rightKnee.x = 25 * flip * Math.cos(t * Math.PI);
            sprite.rightKnee.y = baseY - 5;
            break;

        case 'launcher':
            if (frame < 7) {
                sprite.spine.y += 5;
                sprite.rightHand.y += 10;
            } else if (frame < 10) {
                sprite.rightHand.y -= 40;
                sprite.rightHand.x = 30 * flip;
                sprite.leftHand.y -= 30;
                sprite.spine.y -= 10;
            }
            break;

        case 'hit_stun':
            sprite.spine.x = -10 * flip;
            sprite.head.x = -15 * flip;
            sprite.leftHand.x = -25 * flip;
            sprite.rightHand.x = 5 * flip;
            break;

        case 'block_stun':
            sprite.leftHand.x = 10 * flip;
            sprite.leftHand.y -= 15;
            sprite.rightHand.x = 10 * flip;
            sprite.rightHand.y -= 15;
            sprite.spine.x = -5 * flip;
            break;

        case 'knockdown':
            const fallProgress = Math.min(t, 1);
            sprite.spine.y = baseY - 10 * (1 - fallProgress);
            sprite.head.y = baseY - 15 * (1 - fallProgress);
            sprite.spine.x = -20 * flip * fallProgress;
            sprite.leftHand.y = baseY - 5 * (1 - fallProgress);
            sprite.rightHand.y = baseY - 5 * (1 - fallProgress);
            sprite.leftFoot.x = -20 * fallProgress;
            sprite.rightFoot.x = 20 * fallProgress;
            break;
    }

    return sprite;
}

// Draw the stickman from sprite data
export function drawStickman(
    ctx: CanvasRenderingContext2D,
    state: PlayerState,
    color: string = '#ffffff'
): void {
    const { x, y, sprite } = state;

    ctx.save();
    ctx.translate(x, y);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw body parts
    // Head
    ctx.beginPath();
    ctx.arc(sprite.head.x, sprite.head.y, sprite.head.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Torso
    ctx.beginPath();
    ctx.moveTo(sprite.neck.x, sprite.neck.y);
    ctx.lineTo(sprite.spine.x, sprite.spine.y);
    ctx.lineTo(sprite.hips.x, sprite.hips.y);
    ctx.stroke();

    // Left arm
    ctx.beginPath();
    ctx.moveTo(sprite.leftShoulder.x, sprite.leftShoulder.y);
    ctx.lineTo(sprite.leftElbow.x, sprite.leftElbow.y);
    ctx.lineTo(sprite.leftHand.x, sprite.leftHand.y);
    ctx.stroke();

    // Right arm
    ctx.beginPath();
    ctx.moveTo(sprite.rightShoulder.x, sprite.rightShoulder.y);
    ctx.lineTo(sprite.rightElbow.x, sprite.rightElbow.y);
    ctx.lineTo(sprite.rightHand.x, sprite.rightHand.y);
    ctx.stroke();

    // Left leg
    ctx.beginPath();
    ctx.moveTo(sprite.leftHip.x, sprite.leftHip.y);
    ctx.lineTo(sprite.leftKnee.x, sprite.leftKnee.y);
    ctx.lineTo(sprite.leftFoot.x, sprite.leftFoot.y);
    ctx.stroke();

    // Right leg
    ctx.beginPath();
    ctx.moveTo(sprite.rightHip.x, sprite.rightHip.y);
    ctx.lineTo(sprite.rightKnee.x, sprite.rightKnee.y);
    ctx.lineTo(sprite.rightFoot.x, sprite.rightFoot.y);
    ctx.stroke();

    // Draw health bar
    const healthBarWidth = 60;
    const healthBarHeight = 6;
    const healthPercent = state.health / 100;
    const barY = sprite.head.y - 20;

    // Background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(-healthBarWidth / 2, barY, healthBarWidth, healthBarHeight);

    // Health
    ctx.fillStyle = healthPercent > 0.3 ? '#4ade80' : '#ef4444';
    ctx.fillRect(-healthBarWidth / 2, barY, healthBarWidth * healthPercent, healthBarHeight);

    // Meter bar
    const meterY = barY + 8;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(-healthBarWidth / 2, meterY, healthBarWidth, 4);

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-healthBarWidth / 2, meterY, healthBarWidth * (state.meter / 100), 4);

    ctx.restore();
}

// Generate hitboxes for moves
export function generateHitBoxes(
    moveType: MoveType,
    frame: number,
    playerX: number,
    playerY: number,
    facing: 'left' | 'right'
): { hitBoxes: HitBox[], hurtBoxes: HitBox[] } {
    const flip = facing === 'left' ? -1 : 1;
    const hitBoxes: HitBox[] = [];
    const hurtBoxes: HitBox[] = [];

    // Default hurtbox (body)
    hurtBoxes.push({
        x: playerX - 15,
        y: playerY - 70,
        width: 30,
        height: 60,
        type: 'hurt'
    });

    // Add hitboxes based on move
    switch (moveType) {
        case 'jab':
            if (frame >= 10 && frame <= 12) {  // Adjusted to match move's active frames
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 20 : -40),
                    y: playerY - 55,
                    width: 20,
                    height: 15,
                    type: 'hit'
                });
            }
            break;

        case 'straight':
            if (frame >= 12 && frame <= 15) {  // Adjusted to match move's active frames
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 25 : -50),
                    y: playerY - 55,
                    width: 25,
                    height: 15,
                    type: 'hit'
                });
            }
            break;

        case 'hook':
            if (frame >= 14 && frame <= 18) {
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 20 : -45),
                    y: playerY - 60,
                    width: 25,
                    height: 20,
                    type: 'hit'
                });
            }
            break;

        case 'uppercut':
            if (frame >= 16 && frame <= 19) {
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 15 : -35),
                    y: playerY - 70,
                    width: 20,
                    height: 30,
                    type: 'hit'
                });
            }
            break;

        case 'low_kick':
            if (frame >= 12 && frame <= 15) {  // Adjusted to match move's active frames
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 30 : -60),
                    y: playerY - 15,
                    width: 30,
                    height: 20,
                    type: 'hit'
                });
            }
            break;

        case 'mid_kick':
            if (frame >= 14 && frame <= 18) {  // Adjusted to match move's active frames
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 35 : -70),
                    y: playerY - 40,
                    width: 35,
                    height: 20,
                    type: 'hit'
                });
            }
            break;

        case 'high_kick':
            if (frame >= 16 && frame <= 20) {
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 30 : -65),
                    y: playerY - 65,
                    width: 35,
                    height: 25,
                    type: 'hit'
                });
            }
            break;

        case 'sweep':
            if (frame >= 18 && frame <= 23) {
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 20 : -70),
                    y: playerY - 10,
                    width: 50,
                    height: 15,
                    type: 'hit'
                });
            }
            break;

        case 'launcher':
            if (frame >= 15 && frame <= 18) {
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 15 : -40),
                    y: playerY - 80,
                    width: 25,
                    height: 40,
                    type: 'hit'
                });
            }
            break;

        case 'combo1':
            if (frame >= 12 && frame <= 27) {
                // Multiple hits
                if (frame >= 12 && frame <= 15) {
                    hitBoxes.push({
                        x: playerX + (flip > 0 ? 20 : -45),
                        y: playerY - 55,
                        width: 25,
                        height: 20,
                        type: 'hit'
                    });
                } else if (frame >= 18 && frame <= 21) {
                    hitBoxes.push({
                        x: playerX + (flip > 0 ? 25 : -50),
                        y: playerY - 50,
                        width: 25,
                        height: 20,
                        type: 'hit'
                    });
                } else if (frame >= 24 && frame <= 27) {
                    hitBoxes.push({
                        x: playerX + (flip > 0 ? 30 : -55),
                        y: playerY - 45,
                        width: 25,
                        height: 25,
                        type: 'hit'
                    });
                }
            }
            break;

        case 'combo2':
            if (frame >= 14 && frame <= 34) {
                // Lightning combo hits
                const hitFrames = [14, 20, 26, 32];
                hitFrames.forEach((hitFrame, index) => {
                    if (frame >= hitFrame && frame <= hitFrame + 3) {
                        hitBoxes.push({
                            x: playerX + (flip > 0 ? 25 + index * 5 : -(50 + index * 5)),
                            y: playerY - (60 - index * 5),
                            width: 30,
                            height: 25,
                            type: 'hit'
                        });
                    }
                });
            }
            break;

        case 'combo3':
            if (frame >= 16 && frame <= 41) {
                // Demon rush multiple hits
                if (frame % 4 === 0) {
                    hitBoxes.push({
                        x: playerX + (flip > 0 ? 30 : -60),
                        y: playerY - 50,
                        width: 30,
                        height: 30,
                        type: 'hit'
                    });
                }
            }
            break;

        case 'special':
            if (frame >= 20 && frame <= 25) {
                // Dragon fist - large hitbox
                hitBoxes.push({
                    x: playerX + (flip > 0 ? 20 : -70),
                    y: playerY - 70,
                    width: 50,
                    height: 50,
                    type: 'hit'
                });
            }
            break;
    }

    return { hitBoxes, hurtBoxes };
}

// Draw hitboxes for debugging
export function drawHitboxes(
    ctx: CanvasRenderingContext2D,
    hitBoxes: HitBox[],
    hurtBoxes: HitBox[],
    showDebug: boolean = false
): void {
    if (!showDebug) return;

    ctx.save();

    // Draw hurtboxes in blue
    ctx.strokeStyle = 'rgba(0, 100, 255, 0.5)';
    ctx.lineWidth = 2;
    hurtBoxes.forEach(box => {
        ctx.strokeRect(box.x, box.y, box.width, box.height);
    });

    // Draw hitboxes in red
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    hitBoxes.forEach(box => {
        ctx.fillRect(box.x, box.y, box.width, box.height);
        ctx.strokeRect(box.x, box.y, box.width, box.height);
    });

    ctx.restore();
}

// Draw effects
export function drawHitEffect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    frame: number,
    type: 'hit' | 'block' | 'launcher' | 'counter'
): void {
    const alpha = Math.max(0, 1 - frame / 15);

    switch (type) {
        case 'hit':
            // Impact burst
            ctx.strokeStyle = `rgba(255, 255, 100, ${alpha})`;
            ctx.lineWidth = 3;
            const burstSize = frame * 4;
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(
                    x + Math.cos(angle) * burstSize,
                    y + Math.sin(angle) * burstSize
                );
                ctx.stroke();
            }
            break;

        case 'block':
            // Shield ripple
            ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(x, y, 20 + frame * 2, 0, Math.PI * 2);
            ctx.stroke();
            break;

        case 'launcher':
            // Upward lines
            ctx.strokeStyle = `rgba(255, 200, 0, ${alpha})`;
            ctx.lineWidth = 2;
            for (let i = -2; i <= 2; i++) {
                ctx.beginPath();
                ctx.moveTo(x + i * 10, y);
                ctx.lineTo(x + i * 10, y - frame * 5);
                ctx.stroke();
            }
            break;

        case 'counter':
            // Lightning effect
            ctx.strokeStyle = `rgba(255, 100, 255, ${alpha})`;
            ctx.lineWidth = 2;
            const segments = 5;
            ctx.beginPath();
            ctx.moveTo(x, y - 30);
            for (let i = 1; i <= segments; i++) {
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = y - 30 + (i / segments) * 60;
                ctx.lineTo(x + offsetX, offsetY);
            }
            ctx.stroke();
            break;
    }
}

// Smooth position interpolation
export function lerp(current: number, target: number, speed: number = 0.1): number {
    return current + (target - current) * speed;
}
