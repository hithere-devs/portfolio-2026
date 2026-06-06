import caresy from '@/app/caresy.png';
import sad from '@/app/sad.png';
import { Company } from '@/types';

export const companies: Company[] = [
    {
        name: 'Samora AI',
        role: 'Team Lead, Founding Engineer',
        period: '2024 — Present',
        logo: 'https://hithere-devs-public-86edc30b.s3.ap-south-2.amazonaws.com/SamoraLogo.png',
        slug: 'senior-software-engineer-samora-ai',
        tags: ['Voice AI', 'ECS', 'K8S', 'Python', 'Go', 'Gin'],
        description: 'First founding engineer, now leading the team. Built Samora from the ground up: the entire voice AI pipeline scaling to 100K+ voice calls/day, a self-learning voice engine that improves call quality, and the complete AWS infrastructure with VPC, Lambdas, ECS, and Kubernetes.',
    },
    {
        name: 'Reach Inbox',
        role: 'Associate Backend Developer',
        period: '2024',
        logo: 'https://hithere-devs-public-86edc30b.s3.ap-south-2.amazonaws.com/ri.png',
        slug: 'associate-backend-developer-reachinbox-ai',
        tags: ['Monitoring', 'Logging', 'API Response Times'],
        description: 'Worked on Zapmail & Reachinbox. Handled analytics databases for more than a million mails per user per day. Reduced API response times by 70-90% on average. Set up logging and monitoring with the Elastic EFK stack and NewRelic.',
    },
    {
        name: 'Openinapp',
        role: 'Junior Backend Developer',
        period: '2023 — 2024',
        logo: 'https://hithere-devs-public-86edc30b.s3.ap-south-2.amazonaws.com/oia.png',
        slug: 'junior-backend-developer-openinapp',
        tags: ['Database Optim', 'Heavy Duty APIs', 'Payments System', 'AI Products'],
        description: 'Worked on Smart Links and Business Links. Reduced response time for heavy-duty B2B APIs from 120s to 8s. Integrated payment systems, PAAPI, YouTube, and AI products. Built microservices and cron jobs, and improved the deployment pipeline with ArgoCD, monitoring with Elastic Search, Grafana & DataDog.',
    },
    {
        name: 'JarvIoT',
        role: 'Software Developer Intern (Frontend)',
        period: '2022 — 2023',
        logo: 'https://hithere-devs-public-86edc30b.s3.ap-south-2.amazonaws.com/jv.png',
        slug: 'software-developer-intern-(frontend)-jarviot',
        tags: ['React', 'UI', 'UX', 'Router', 'Next'],
        description: 'Leveraged React.js, Redux, and Bootstrap for responsive UI. Translated designs into cohesive interfaces. Strategically refactored code for 30% faster component and data rendering. Collaborated cross-functionally.',
    },
    {
        name: 'Caresy',
        role: 'Software Developer Intern (Backend)',
        period: '2022',
        logo: caresy,
        slug: 'software-developer-intern-(backend)-caresy',
        tags: ['AWS', 'Lambdas', 'Node Backend Systems'],
        description: 'Implemented the user model, authentication, and a wallet system with rewards. Fine-tuned APIs for a 20% reduction in response times. Managed AWS EC2, CI/CD with GitHub Actions, and AWS SNS for notifications.',
    },
    {
        name: 'Saddweb',
        role: 'Founder, Freelancing',
        period: '2020 — 2022',
        logo: sad,
        slug: 'freelancing-saddweb',
        tags: ['Client Management', 'Hiring', 'Marketing'],
        description: 'Founded this studio to help businesses take their products and services online and grow their performance and sales.',
    },
];

export const getCompanyBySlug = (slug: string): Company | undefined => {
    return companies.find(company => company.slug === slug);
};
