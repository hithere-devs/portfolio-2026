// Contact Information
export const CONTACT_INFO = {
    calendly: 'https://calendly.com/mywritingfrenzy/30min',
    resume: 'https://drive.google.com/file/d/1nC7uTzEePZscwHJTn72hXHeiiwUemNhD/view',
} as const;

// Navigation
export const NAVIGATION = {
    home: '/',
} as const;

// Company Page Mappings
export const COMPANY_PAGE_MAPPINGS = {
    'senior-software-engineer-samora-ai': 'samora-ai',
    'associate-backend-developer-reachinbox-ai': 'reachinbox',
    'junior-backend-developer-openinapp': 'openinapp',
    'software-developer-intern-(frontend)-jarviot': 'jarviot',
    'software-developer-intern-(backend)-caresy': 'caresy',
    'freelancing-saddweb': 'saddweb',
} as const;

// Skill Section Configuration
export const SKILL_SECTIONS = [
    { title: 'Top Skills', key: 'top', icon: 'RocketIcon' },
    { title: 'Backend', key: 'backend', icon: 'Laptop2' },
    { title: 'Frontend', key: 'frontend', icon: 'Paintbrush' },
    { title: 'DevOps', key: 'devops', icon: 'Wrench' },
    { title: 'Languages', key: 'lang', icon: 'Code' },
    { title: 'Misc', key: 'misc', icon: 'EyeOff' },
] as const;

// Project Categories
export const PROJECT_CATEGORIES = {
    featured: 'Featured',
    past: 'Past Projects',
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
    fast: 300,
    normal: 500,
    slow: 700,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;
