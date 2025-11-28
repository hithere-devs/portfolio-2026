import caresy from '@/app/caresy.png';
import sad from '@/app/sad.png';
import { Company } from '@/types';

export const companies: Company[] = [
    {
        name: 'Samora AI',
        role: 'Senior Software Engineer',
        logo: 'https://storage.googleapis.com/hithere-devs/SamoraLogo.png',
        slug: 'senior-software-engineer-samora-ai',
        tags: ['Voice AI', 'ECS', 'K8S', 'Python', 'Go', 'Gin'],
        description: 'Leading full stack and AI Infrastructure development. Built the entire voice AI pipeline from the ground up, scaling to 100K+ voice calls/day. Developed a self-learning voice engine that improves call quality. Designed and deployed complete AWS Infra with VPC, Lambdas, ECS, and Kubernetes.',
    },
    {
        name: 'Reach Inbox',
        role: 'Associate Backend Developer',
        logo: 'https://storage.googleapis.com/hithere-devs/ri.png',
        slug: 'associate-backend-developer-reachinbox-ai',
        tags: ['Monitoring', 'Logging', 'API Response Times'],
        description: 'Worked on Zapmail & Reachinbox. Handled analytics databases for more than million mails per user per day. Reduced API response times from 70 - 90 % on average. Setup Logging and Monitoring with Elastic - EFK stack and NewRelic.',
    },
    {
        name: 'Openinapp',
        role: 'Junior Backend Developer',
        logo: 'https://storage.googleapis.com/hithere-devs/oia.png',
        slug: 'junior-backend-developer-openinapp',
        tags: ['Database Optim', 'Heavy Duty APIs', 'Payments System', 'AI Products'],
        description: 'Worked on Smart Links, Business Links. Reduced response time for heavy-duty B2B APIs from 120s to 8s. Integrated payment systems, PAAPI, YouTube, and AI products. Developed microservices, cron jobs, and improved deployment pipeline with ArgoCD, monitoring with Elastic Search, Grafana & DataDog.',
    },
    {
        name: 'JarvIoT',
        role: 'Software Developer Intern (Frontend)',
        logo: 'https://storage.googleapis.com/hithere-devs/jv.png',
        slug: 'software-developer-intern-(frontend)-jarviot',
        tags: ['React', 'UI', 'UX', 'Router', 'Next'],
        description: 'Leveraged React.js, Redux, and Bootstrap for responsive UI. Translated designs into cohesive interfaces. Strategically Refactored Code for 30% faster Component & Data Rendering. Collaborated cross-functionally.',
    },
    {
        name: 'Caresy',
        role: 'Software Developer Intern (Backend)',
        logo: caresy,
        slug: 'software-developer-intern-(backend)-caresy',
        tags: ['AWS', 'Lambdas', 'Node Backend Systems'],
        description: 'Implemented User Model, Authentication, Wallet System with rewards. Fine-tuned APIs for 20% reduction in response times. Managed AWS EC2, CI/CD with GitHub Actions. Implemented AWS SNS for notifications.',
    },
    {
        name: 'Saddweb',
        role: 'Freelancing',
        logo: sad,
        slug: 'freelancing-saddweb',
        tags: ['Client Management', 'Hiring', 'Marketting'],
        description: 'Founded this company to help people push their business or product services online and boost their performance and sales.',
    },
];

export const getCompanyBySlug = (slug: string): Company | undefined => {
    return companies.find(company => company.slug === slug);
};
