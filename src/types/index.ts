import { StaticImageData } from 'next/image';
import { LucideIcon } from 'lucide-react';

// Page Props
export interface PageProps {
    banner: StaticImageData;
    icon: string;
}

export interface BlogHeaderProps {
    banner?: StaticImageData;
    icon: string;
    title: string;
    detailRows: DetailRowProps[];
}

export interface DetailRowProps {
    label: string;
    value: string;
    icon: string;
}

// Company Types
export interface Company {
    name: string;
    role: string;
    logo: string | StaticImageData;
    slug: string;
    tags: string[];
    description: string;
}

// Project Types
export interface Project {
    title: string;
    description: string;
    link: string;
    tag: string;
}

export interface ProjectsData {
    featured: Project[];
    past: Project[];
}

// Skill Types
export interface Skill {
    title: string;
    image: string;
}

export interface SkillsData {
    top: Skill[];
    backend: Skill[];
    frontend: Skill[];
    devops: Skill[];
    misc: Skill[];
    lang: Skill[];
}

// Social Link Types
export interface SocialLink {
    name: string;
    url: string;
    icon: LucideIcon;
}

// Component Props
export interface TabsProps {
    variant: 'skills' | 'projects';
    className?: string;
}

export interface CompanyCardProps {
    company: Company;
}

export interface HeroSectionProps {
    className?: string;
}

export interface FooterProps {
    className?: string;
}

// Navigation Types
export type CompanyPageKey = 'reachinbox' | 'openinapp' | 'jarviot' | 'caresy' | 'saddweb';

export interface CompanyPageMapping {
    [key: string]: CompanyPageKey;
}
