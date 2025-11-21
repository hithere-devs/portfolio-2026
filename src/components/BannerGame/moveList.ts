import { Move, InputType } from './types';

export const MOVE_LIST: Record<string, Move> = {
    // Basic Punches
    jab: {
        id: 'jab',
        name: 'Jab',
        type: 'jab',
        damage: 8,
        startupFrames: 10,
        activeFrames: 2,
        recoveryFrames: 8,
        blockStun: 3,
        hitStun: 12,
        pushback: 20,
        hitLevel: 'high',
        properties: [],
        cancelInto: ['straight', 'hook', 'low_kick']
    },

    straight: {
        id: 'straight',
        name: 'Straight Punch',
        type: 'straight',
        damage: 12,
        startupFrames: 12,
        activeFrames: 3,
        recoveryFrames: 12,
        blockStun: 5,
        hitStun: 15,
        pushback: 30,
        hitLevel: 'mid',
        properties: [],
        cancelInto: ['uppercut', 'mid_kick']
    },

    hook: {
        id: 'hook',
        name: 'Hook',
        type: 'hook',
        damage: 15,
        startupFrames: 14,
        activeFrames: 4,
        recoveryFrames: 16,
        blockStun: 6,
        hitStun: 18,
        pushback: 25,
        hitLevel: 'high',
        properties: [],
        cancelInto: ['high_kick']
    },

    uppercut: {
        id: 'uppercut',
        name: 'Uppercut',
        type: 'uppercut',
        damage: 20,
        startupFrames: 16,
        activeFrames: 3,
        recoveryFrames: 20,
        blockStun: 8,
        hitStun: 25,
        pushback: 40,
        hitLevel: 'mid',
        properties: ['launcher'],
        cancelInto: []
    },

    // Basic Kicks
    low_kick: {
        id: 'low_kick',
        name: 'Low Kick',
        type: 'low_kick',
        damage: 10,
        startupFrames: 12,
        activeFrames: 3,
        recoveryFrames: 10,
        blockStun: 4,
        hitStun: 14,
        pushback: 25,
        hitLevel: 'low',
        properties: [],
        cancelInto: ['mid_kick']
    },

    mid_kick: {
        id: 'mid_kick',
        name: 'Mid Kick',
        type: 'mid_kick',
        damage: 14,
        startupFrames: 14,
        activeFrames: 4,
        recoveryFrames: 14,
        blockStun: 6,
        hitStun: 16,
        pushback: 35,
        hitLevel: 'mid',
        properties: [],
        cancelInto: ['high_kick']
    },

    high_kick: {
        id: 'high_kick',
        name: 'High Kick',
        type: 'high_kick',
        damage: 18,
        startupFrames: 16,
        activeFrames: 4,
        recoveryFrames: 18,
        blockStun: 8,
        hitStun: 20,
        pushback: 40,
        hitLevel: 'high',
        properties: [],
        cancelInto: []
    },

    sweep: {
        id: 'sweep',
        name: 'Sweep',
        type: 'sweep',
        damage: 15,
        startupFrames: 18,
        activeFrames: 5,
        recoveryFrames: 22,
        blockStun: 6,
        hitStun: 30,
        pushback: 50,
        hitLevel: 'low',
        properties: ['knockdown'],
        cancelInto: []
    },

    // Launcher
    launcher: {
        id: 'launcher',
        name: 'Launcher',
        type: 'launcher',
        damage: 22,
        startupFrames: 15,
        activeFrames: 3,
        recoveryFrames: 25,
        blockStun: 10,
        hitStun: 35,
        pushback: 20,
        hitLevel: 'mid',
        properties: ['launcher'],
        cancelInto: []
    },

    // Combos
    combo1: {
        id: 'combo1',
        name: 'Triple Strike',
        type: 'combo1',
        damage: 25,
        startupFrames: 12,
        activeFrames: 15,
        recoveryFrames: 20,
        blockStun: 8,
        hitStun: 25,
        pushback: 45,
        hitLevel: 'mid',
        properties: [],
        cancelInto: ['special']
    },

    combo2: {
        id: 'combo2',
        name: 'Lightning Combo',
        type: 'combo2',
        damage: 30,
        startupFrames: 14,
        activeFrames: 20,
        recoveryFrames: 25,
        blockStun: 10,
        hitStun: 30,
        pushback: 50,
        hitLevel: 'mid',
        properties: ['counter_hit'],
        cancelInto: ['special']
    },

    combo3: {
        id: 'combo3',
        name: 'Demon Rush',
        type: 'combo3',
        damage: 35,
        startupFrames: 16,
        activeFrames: 25,
        recoveryFrames: 30,
        blockStun: 12,
        hitStun: 35,
        pushback: 60,
        hitLevel: 'mid',
        properties: ['armor'],
        cancelInto: []
    },

    // Special Move
    special: {
        id: 'special',
        name: 'Dragon Fist',
        type: 'special',
        damage: 45,
        startupFrames: 20,
        activeFrames: 5,
        recoveryFrames: 35,
        blockStun: 15,
        hitStun: 45,
        pushback: 80,
        hitLevel: 'mid',
        properties: ['invincible', 'knockdown'],
        cancelInto: []
    }
};

// Input commands for special moves (like Tekken notation)
export const MOVE_COMMANDS: Record<string, InputType[]> = {
    // Forward, Forward + Punch = Straight
    'straight': ['forward', 'forward', 'punch1'],

    // Down, Forward + Punch = Uppercut
    'uppercut': ['down', 'forward', 'punch2'],

    // Back, Forward + Kick = Mid Kick
    'mid_kick': ['back', 'forward', 'kick1'],

    // Down, Back + Kick = Sweep
    'sweep': ['down', 'back', 'kick2'],

    // Down, Forward, Down, Forward + Punch = Launcher
    'launcher': ['down', 'forward', 'down', 'forward', 'punch2'],

    // Quarter Circle Forward + Punch = Combo1
    'combo1': ['down', 'forward', 'punch1'],

    // Quarter Circle Back + Kick = Combo2
    'combo2': ['down', 'back', 'kick2'],

    // Forward, Back, Forward + Punch = Combo3
    'combo3': ['forward', 'back', 'forward', 'punch2'],

    // Half Circle Forward + Both Punches = Special
    'special': ['back', 'down', 'forward', 'punch1', 'punch2']
};

// Basic attack mapping
export const BASIC_ATTACKS: Record<string, string> = {
    'punch1': 'jab',
    'punch2': 'hook',
    'kick1': 'low_kick',
    'kick2': 'high_kick',
    'down+punch1': 'straight',
    'down+punch2': 'uppercut',
    'down+kick1': 'sweep',
    'down+kick2': 'mid_kick'
};
