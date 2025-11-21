import { InputType } from './types';

export class InputHandler {
    private keyState: Map<string, boolean> = new Map();
    private lastDirection: 'forward' | 'back' | 'neutral' = 'neutral';

    // Map keyboard keys to input types
    private keyMap: Record<string, InputType> = {
        'a': 'back',
        'd': 'forward',
        'w': 'up',
        's': 'down',
        'j': 'punch1',
        'k': 'punch2',
        'l': 'kick1',
        ';': 'kick2',
        'u': 'block'
    };

    constructor() {
        this.setupListeners();
    }

    private setupListeners() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private handleKeyDown(e: KeyboardEvent) {
        const key = e.key.toLowerCase();
        if (!this.keyState.get(key)) {
            this.keyState.set(key, true);
        }
    }

    private handleKeyUp(e: KeyboardEvent) {
        const key = e.key.toLowerCase();
        this.keyState.set(key, false);
    }

    // Get current movement direction
    getMovementDirection(): 'forward' | 'back' | 'up' | 'down' | null {
        const left = this.keyState.get('a');
        const right = this.keyState.get('d');
        const up = this.keyState.get('w');
        const down = this.keyState.get('s');

        if (up && !down) return 'up';
        if (down && !up) return 'down';
        if (left && !right) return 'back';
        if (right && !left) return 'forward';

        return null;
    }

    // Check if blocking
    isBlocking(): boolean {
        return this.keyState.get('u') || false;
    }

    // Get pressed attack buttons
    getPressedAttacks(): InputType[] {
        const attacks: InputType[] = [];

        if (this.keyState.get('j')) attacks.push('punch1');
        if (this.keyState.get('k')) attacks.push('punch2');
        if (this.keyState.get('l')) attacks.push('kick1');
        if (this.keyState.get(';')) attacks.push('kick2');

        return attacks;
    }

    // Get all currently held inputs
    getHeldInputs(): InputType[] {
        const inputs: InputType[] = [];

        Array.from(this.keyState.entries()).forEach(([key, value]) => {
            if (value && this.keyMap[key]) {
                inputs.push(this.keyMap[key]);
            }
        });

        return inputs;
    }

    // Check if a specific key is pressed
    isKeyPressed(key: string): boolean {
        return this.keyState.get(key.toLowerCase()) || false;
    }

    // Clear all key states
    clear() {
        this.keyState.clear();
    }

    // Cleanup
    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
        window.removeEventListener('keyup', this.handleKeyUp.bind(this));
        this.clear();
    }
}
