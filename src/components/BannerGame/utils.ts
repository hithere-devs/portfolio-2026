import { Player, InputCommand } from './types';

// Fighter name prefixes and suffixes
const prefixes = [
    'Dark', 'Shadow', 'Thunder', 'Lightning', 'Fire', 'Ice', 'Storm',
    'Kick', 'Punch', 'Strike', 'Dragon', 'Tiger', 'Phoenix', 'Blade',
    'Iron', 'Steel', 'Golden', 'Silver', 'Cosmic', 'Ninja', 'Samurai'
];

const suffixes = [
    'Master', 'Warrior', 'Fighter', 'Champion', 'Destroyer', 'Slayer',
    'Breaker', 'Crusher', 'Knight', 'Lord', 'King', 'Queen', 'Sage',
    'Falcon', 'Eagle', 'Wolf', 'Bear', 'Lion', 'Hawk', 'Viper'
];

export function generateRandomUsername(): string {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const number = Math.floor(Math.random() * 99) + 1;
    return `${prefix}${suffix}${number}`;
}

// Store and retrieve player data from localStorage
export function savePlayerData(player: Player): void {
    const players = getStoredPlayers();
    players.push(player);
    // Keep only the last 50 players
    if (players.length > 50) {
        players.shift();
    }
    localStorage.setItem('stickfight_players', JSON.stringify(players));
}

export function getStoredPlayers(): Player[] {
    try {
        const stored = localStorage.getItem('stickfight_players');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function getRandomOpponent(): Player | null {
    const players = getStoredPlayers();
    if (players.length === 0) return null;
    return players[Math.floor(Math.random() * players.length)];
}

// Leaderboard functions
export function updateLeaderboard(username: string, wins: number): void {
    const leaderboard = getLeaderboard();
    const existingIndex = leaderboard.findIndex(entry => entry.username === username);

    if (existingIndex >= 0) {
        leaderboard[existingIndex].wins += wins;
    } else {
        leaderboard.push({ username, wins });
    }

    // Sort by wins and keep top 10
    leaderboard.sort((a, b) => b.wins - a.wins);
    const topLeaderboard = leaderboard.slice(0, 10);

    localStorage.setItem('stickfight_leaderboard', JSON.stringify(topLeaderboard));
}

export function getLeaderboard(): { username: string; wins: number }[] {
    try {
        const stored = localStorage.getItem('stickfight_leaderboard');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}
