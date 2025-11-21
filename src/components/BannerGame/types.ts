export type MoveType = 'idle' | 'walk_forward' | 'walk_backward' | 'crouch' | 'jump' | 'block_stand' | 'block_crouch' |
    'jab' | 'straight' | 'hook' | 'uppercut' | 'low_kick' | 'mid_kick' | 'high_kick' | 'sweep' |
    'launcher' | 'combo1' | 'combo2' | 'combo3' | 'special' | 'hit_stun' | 'block_stun' | 'knockdown' | 'air_juggle';

export type InputType = 'forward' | 'back' | 'up' | 'down' | 'punch1' | 'punch2' | 'kick1' | 'kick2' | 'block';

export interface InputCommand {
    inputs: InputType[];
    timestamp: number;
    duration: number;
}

export interface Move {
    id: string;
    name: string;
    type: MoveType;
    damage: number;
    startupFrames: number;
    activeFrames: number;
    recoveryFrames: number;
    blockStun: number;
    hitStun: number;
    pushback: number;
    hitLevel: 'high' | 'mid' | 'low';
    properties: MoveProperty[];
    cancelInto?: string[]; // Move IDs that this can cancel into
}

export type MoveProperty = 'launcher' | 'knockdown' | 'counter_hit' | 'unblockable' | 'armor' | 'invincible';

export interface ComboMove {
    moveId: string;
    delay: number; // Frames to wait before executing
}

export interface Player {
    username: string;
    inputs: InputCommand[];
    score: number;
    timestamp: number;
    wins: number;
    losses: number;
}

export interface GameState {
    player1: PlayerState;
    player2: PlayerState;
    round: number;
    roundTimer: number;
    gameOver: boolean;
    winner?: 'player1' | 'player2' | 'draw';
    frameCount: number;
    hitStop: number; // Freeze frames on hit
}

export interface PlayerState {
    // Position
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;

    // Combat state
    health: number;
    meter: number; // Super meter
    currentMove: MoveType;
    currentMoveId: string;
    moveFrame: number; // Current frame of the move

    // Status
    facing: 'left' | 'right';
    grounded: boolean;
    crouching: boolean;
    blocking: boolean;
    stunFrames: number;
    invincibleFrames: number;

    // Combo tracking
    comboCount: number;
    comboDamage: number;
    comboTimer: number;
    inputBuffer: InputType[];
    lastMoveId: string;

    // Animation
    animationState: AnimationState;
    sprite: SpriteFrame;
}

export interface AnimationState {
    name: string;
    frame: number;
    totalFrames: number;
    loop: boolean;
}

export interface SpriteFrame {
    // Stickman body parts positions relative to center
    head: { x: number; y: number; radius: number };
    neck: { x: number; y: number };
    spine: { x: number; y: number };
    hips: { x: number; y: number };

    leftShoulder: { x: number; y: number };
    leftElbow: { x: number; y: number };
    leftHand: { x: number; y: number };

    rightShoulder: { x: number; y: number };
    rightElbow: { x: number; y: number };
    rightHand: { x: number; y: number };

    leftHip: { x: number; y: number };
    leftKnee: { x: number; y: number };
    leftFoot: { x: number; y: number };

    rightHip: { x: number; y: number };
    rightKnee: { x: number; y: number };
    rightFoot: { x: number; y: number };
}

export interface HitBox {
    x: number;
    y: number;
    width: number;
    height: number;
    type: 'hurt' | 'hit';
}

export interface FrameData {
    sprite: SpriteFrame;
    hitBoxes: HitBox[];
    hurtBoxes: HitBox[];
}
