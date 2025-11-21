import { PlayerState, Move, InputType, HitBox, MoveType } from './types';
import { MOVE_LIST, MOVE_COMMANDS, BASIC_ATTACKS } from './moveList';
import { generateHitBoxes } from './animations';

const INPUT_BUFFER_TIME = 300; // ms
const COMBO_WINDOW = 500; // ms

export class CombatEngine {
    private inputBuffer: Map<'player1' | 'player2', { input: InputType, timestamp: number }[]> = new Map([
        ['player1', []],
        ['player2', []]
    ]);

    // Check if two hitboxes collide
    private checkCollision(box1: HitBox, box2: HitBox): boolean {
        return box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.y + box1.height > box2.y;
    }

    // Process input and add to buffer
    public addInput(player: 'player1' | 'player2', input: InputType): void {
        const buffer = this.inputBuffer.get(player) || [];
        const timestamp = Date.now();

        // Remove old inputs
        const validBuffer = buffer.filter(i => timestamp - i.timestamp < INPUT_BUFFER_TIME);
        validBuffer.push({ input, timestamp });

        this.inputBuffer.set(player, validBuffer);
    }

    // Check if a move command matches the input buffer
    private checkMoveCommand(buffer: { input: InputType, timestamp: number }[], command: InputType[]): boolean {
        if (buffer.length < command.length) return false;

        // Check if the last N inputs match the command
        const recentInputs = buffer.slice(-command.length);
        return command.every((cmd, i) => recentInputs[i].input === cmd);
    }

    // Get the move to execute based on input buffer
    public getNextMove(player: PlayerState, playerKey: 'player1' | 'player2'): string | null {
        const buffer = this.inputBuffer.get(playerKey) || [];
        if (buffer.length === 0) return null;

        // Check if player can act
        if (player.stunFrames > 0 || player.currentMove !== 'idle') return null;

        // Check for special move commands first
        for (const [moveId, command] of Object.entries(MOVE_COMMANDS)) {
            if (this.checkMoveCommand(buffer, command)) {
                // Clear buffer after successful special move
                this.inputBuffer.set(playerKey, []);
                return moveId;
            }
        }

        // Check for basic attacks
        const lastInput = buffer[buffer.length - 1];
        const isHoldingDown = buffer.some(i => i.input === 'down' && Date.now() - i.timestamp < 100);

        if (lastInput) {
            const key = isHoldingDown ? `down+${lastInput.input}` : lastInput.input;
            const moveId = BASIC_ATTACKS[key];
            if (moveId) {
                // Remove the used input
                buffer.pop();
                this.inputBuffer.set(playerKey, buffer);
                return moveId;
            }
        }

        return null;
    }

    // Execute a move on a player
    public executeMove(player: PlayerState, moveId: string): void {
        const move = MOVE_LIST[moveId];
        if (!move) return;

        player.currentMove = move.type;
        player.currentMoveId = moveId;
        player.moveFrame = 0;
        player.lastMoveId = moveId;

        // Reset combo timer if starting a new combo
        if (player.comboTimer <= 0) {
            player.comboCount = 0;
            player.comboDamage = 0;
        }
        player.comboTimer = COMBO_WINDOW;
    }

    // Check if a move can be canceled into another
    public canCancel(currentMoveId: string, nextMoveId: string): boolean {
        const currentMove = MOVE_LIST[currentMoveId];
        if (!currentMove || !currentMove.cancelInto) return false;
        return currentMove.cancelInto.includes(nextMoveId);
    }

    // Process frame update for a player
    public updatePlayerFrame(player: PlayerState): void {
        // Update move frame
        if (player.currentMove !== 'idle') {
            player.moveFrame++;

            const move = MOVE_LIST[player.currentMoveId];
            if (move) {
                const totalFrames = move.startupFrames + move.activeFrames + move.recoveryFrames;
                if (player.moveFrame >= totalFrames) {
                    player.currentMove = 'idle';
                    player.currentMoveId = '';
                    player.moveFrame = 0;
                }
            }
        }

        // Update stun
        if (player.stunFrames > 0) {
            player.stunFrames--;
            if (player.stunFrames === 0) {
                player.currentMove = 'idle';
            }
        }

        // Update combo timer
        if (player.comboTimer > 0) {
            player.comboTimer -= 16; // Assuming 60 FPS
            if (player.comboTimer <= 0) {
                player.comboCount = 0;
                player.comboDamage = 0;
            }
        }

        // Update invincibility
        if (player.invincibleFrames > 0) {
            player.invincibleFrames--;
        }

        // Physics
        player.x += player.velocityX;
        player.y += player.velocityY;

        // Boundary checking - keep players within canvas bounds
        const leftBound = 50;
        const rightBound = 550;
        const groundY = 300;

        // Horizontal boundaries
        if (player.x < leftBound) {
            player.x = leftBound;
            player.velocityX = 0;
        } else if (player.x > rightBound) {
            player.x = rightBound;
            player.velocityX = 0;
        }

        // Gravity
        if (!player.grounded) {
            player.velocityY += 0.8;
        }

        // Ground collision
        if (player.y >= groundY) {
            player.y = groundY;
            player.grounded = true;
            player.velocityY = 0;

            // Reset from knockdown
            if (player.currentMove === 'knockdown') {
                player.currentMove = 'idle';
                player.invincibleFrames = 30; // Wake-up invincibility
            }
        }

        // Ceiling boundary
        if (player.y < 50) {
            player.y = 50;
            player.velocityY = 0;
        }

        // Friction
        player.velocityX *= 0.85;
    }

    // Check for hits between players
    public checkHits(attacker: PlayerState, defender: PlayerState): { hit: boolean, damage: number, hitType: string } {
        // Can't hit during hitstop or if defender is invincible
        if (defender.invincibleFrames > 0) {
            return { hit: false, damage: 0, hitType: '' };
        }

        const move = MOVE_LIST[attacker.currentMoveId];
        if (!move || attacker.moveFrame < move.startupFrames ||
            attacker.moveFrame >= move.startupFrames + move.activeFrames) {
            return { hit: false, damage: 0, hitType: '' };
        }

        // Get hitboxes
        const { hitBoxes } = generateHitBoxes(attacker.currentMove, attacker.moveFrame, attacker.x, attacker.y, attacker.facing);
        const { hurtBoxes } = generateHitBoxes(defender.currentMove, defender.moveFrame, defender.x, defender.y, defender.facing);

        // Check collision
        for (const hitBox of hitBoxes) {
            for (const hurtBox of hurtBoxes) {
                if (this.checkCollision(hitBox, hurtBox)) {
                    // Check blocking
                    const isBlocking = (defender.currentMove === 'block_stand' || defender.currentMove === 'block_crouch') &&
                        this.checkBlockLevel(move.hitLevel, defender.crouching);

                    const damage = isBlocking ? Math.floor(move.damage * 0.1) : move.damage;
                    const hitType = isBlocking ? 'block' : (move.properties.includes('launcher') ? 'launcher' : 'hit');

                    return { hit: true, damage, hitType };
                }
            }
        }

        return { hit: false, damage: 0, hitType: '' };
    }

    // Apply hit effects
    public applyHit(
        attacker: PlayerState,
        defender: PlayerState,
        damage: number,
        hitType: string
    ): void {
        const move = MOVE_LIST[attacker.currentMoveId];
        if (!move) return;

        // Apply damage
        defender.health = Math.max(0, defender.health - damage);

        // Update combo
        attacker.comboCount++;
        attacker.comboDamage += damage;
        attacker.comboTimer = COMBO_WINDOW;

        // Build meter
        attacker.meter = Math.min(100, attacker.meter + damage * 0.5);
        defender.meter = Math.min(100, defender.meter + damage * 0.3);

        // Apply hit effects based on type
        if (hitType === 'block') {
            defender.stunFrames = move.blockStun;
            defender.currentMove = 'block_stun';
            defender.velocityX = -move.pushback * 0.3 * (attacker.facing === 'right' ? 1 : -1);
        } else {
            defender.stunFrames = move.hitStun;
            defender.currentMove = 'hit_stun';
            defender.velocityX = -move.pushback * (attacker.facing === 'right' ? 1 : -1);

            // Special properties
            if (move.properties.includes('launcher')) {
                defender.grounded = false;
                defender.velocityY = -15;
                defender.currentMove = 'air_juggle';
            } else if (move.properties.includes('knockdown')) {
                defender.currentMove = 'knockdown';
                defender.velocityX *= 2;
                defender.grounded = false;
                defender.velocityY = -8;
            }
        }
    }

    // Check if block level matches hit level
    private checkBlockLevel(hitLevel: 'high' | 'mid' | 'low', isCrouching: boolean): boolean {
        if (hitLevel === 'mid') return true; // Mid attacks can be blocked standing or crouching
        if (hitLevel === 'high' && !isCrouching) return true; // High attacks blocked standing
        if (hitLevel === 'low' && isCrouching) return true; // Low attacks blocked crouching
        return false;
    }

    // Handle movement
    public handleMovement(player: PlayerState, direction: 'forward' | 'back' | 'up' | 'down' | null): void {
        if (player.stunFrames > 0) return;

        const speed = 3;
        const isMovementState = player.currentMove === 'walk_forward' ||
            player.currentMove === 'walk_backward' ||
            player.currentMove === 'crouch' ||
            player.currentMove === 'idle' ||
            player.currentMove === 'block_stand' ||
            player.currentMove === 'block_crouch';

        if (!isMovementState) return;

        switch (direction) {
            case 'forward':
                player.velocityX = player.facing === 'right' ? speed : -speed;
                player.currentMove = 'walk_forward';
                player.blocking = false;
                break;
            case 'back':
                player.velocityX = player.facing === 'right' ? -speed : speed;
                player.currentMove = 'walk_backward';
                player.blocking = false;
                break;
            case 'up':
                if (player.grounded) {
                    player.velocityY = -12;
                    player.grounded = false;
                    player.currentMove = 'jump';
                    player.blocking = false;
                    player.crouching = false;
                }
                break;
            case 'down':
                player.crouching = true;
                player.currentMove = 'crouch';
                player.velocityX = 0;
                break;
            default:
                if (player.currentMove !== 'block_stand' && player.currentMove !== 'block_crouch') {
                    player.currentMove = 'idle';
                }
                player.crouching = false;
                break;
        }
    }

    // Update facing direction
    public updateFacing(player1: PlayerState, player2: PlayerState): void {
        if (player1.x < player2.x) {
            player1.facing = 'right';
            player2.facing = 'left';
        } else {
            player1.facing = 'left';
            player2.facing = 'right';
        }
    }
}
