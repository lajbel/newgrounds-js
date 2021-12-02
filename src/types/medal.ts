export interface Medal {
    description: string;
    value: number;
    difficulty: MedalDifficulty;
    icon: string;
    id: number;
    unlocked: boolean;
    secret: boolean;
    image: HTMLImageElement;
}

enum MedalDifficulty {
    Easy = 0,
    Moderate = 1,
    Challenging = 2,
    Difficult = 3,
    Brutal = 4,
}