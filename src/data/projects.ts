import { ProjectsData } from '@/types';

export const projectsData: ProjectsData = {
    featured: [
        {
            title: 'Hithere Mail',
            description:
                'A Superhuman-style email client to read, reply, manage, summarize and send mail, with AI features that can run against local LLMs.',
            link: 'https://mail.hitheredevs.com',
            tag: 'AI / Product',
        },
        {
            title: 'Doc Assist',
            description:
                'Turn any document into an interactive chat. Upload, ask questions, and get grounded answers with retrieval-augmented AI.',
            link: 'https://doc-assist.hitheredevs.com',
            tag: 'AI / RAG',
        },
        {
            title: 'Autoflow',
            description:
                'A workflow automation platform to build AI pipelines with a drag-and-drop canvas, no glue code required.',
            link: 'https://github.com/hithere-devs/autoflow',
            tag: 'AI / Platform',
        },
    ],
    past: [
        {
            title: 'Warmup Tool',
            description:
                'A tool to parse and categorize emails from Gmail and Outlook accounts, then respond to them automatically using AI.',
            link: 'https://github.com/hithere-devs/warmup-tool',
            tag: 'Automation',
        },
        {
            title: 'You Reply',
            description:
                'AI-powered YouTube comment assistant that drafts compelling, on-brand replies to boost engagement.',
            link: 'https://github.com/hithere-devs/youreply',
            tag: 'AI',
        },
        {
            title: 'Movie App',
            description:
                'A react native app to search for movies and tv shows, and get details using IMDB APIs.',
            link: 'https://github.com/hithere-devs/movieapp',
            tag: 'Development',
        },
        {
            title: 'Tweet Bot',
            description:
                'A tool to automate tweets about your progress on github, leetcode & other platforms.',
            link: 'https://tweet-bot.ayanmn18.live',
            tag: 'Design',
        },
    ],
};
