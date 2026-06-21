import type { IconType } from "react-icons";
import {
  FaBootstrap,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import {
  SiExpress,
  SiJest,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiPinia,
  SiReactquery,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
  SiVitest,
} from "react-icons/si";

export type SkillItem = {
  id: number;
  name: string;
  category: string;
  color: string;
  lightColor: string;
  glow: string;
  lightGlow: string;
  description: string;
  Icon: IconType;
};

export type HeroStat = {
  title: string;
  description: string;
};

export type HeroSceneCard = {
  label: string;
  value: string;
  color: string;
};

export type HeroChip = {
  label: string;
  color: string;
};

export const heroContent = {
  eyebrow: "Software Engineer",
  title: "Building modern web solutions with React.js and Node.js.",
  description:
    "Dedicated Software Engineer specializing in user-centric web applications. I build dynamic front-end interfaces with React.js, Next.js and TypeScript, and robust back-end APIs with Node.js, Express.js and Nest.js. My goal is to deliver high-quality, scalable and business-focused digital products.",
  primaryAction: {
    label: "View Projects",
    href: "#projects",
  },
  secondaryAction: {
    label: "Download CV",
    href: "/cv.pdf",
  },
  stats: [
    {
      title: "React.js",
      description: "Dynamic Interfaces",
    },
    {
      title: "Node.js",
      description: "Robust APIs",
    },
    {
      title: "TypeScript",
      description: "Scalable Code",
    },
  ] satisfies HeroStat[],
  scene: {
    browserTitle: "ulvi.dev / portfolio",
    titleTop: "Software",
    titleBottom: "Engineer",
    subtitle: "React.js · Node.js · TypeScript · Next.js",
    performanceScore: "95",
    performanceLabel: "Performance",
    cards: [
      {
        label: "Frontend",
        value: "React.js",
        color: "#7c3aed",
      },
      {
        label: "Backend",
        value: "Node.js",
        color: "#06b6d4",
      },
      {
        label: "Code",
        value: "TypeScript",
        color: "#22c55e",
      },
    ] satisfies HeroSceneCard[],
    chips: [
      {
        label: "React.js",
        color: "#61DAFB",
      },
      {
        label: "Node.js",
        color: "#339933",
      },
      {
        label: "Next.js",
        color: "#E5E7EB",
      },
      {
        label: "TypeScript",
        color: "#3178C6",
      },
      {
        label: "Express.js",
        color: "#F8FAFC",
      },
      {
        label: "Nest.js",
        color: "#E0234E",
      },
      {
        label: "Redux Toolkit",
        color: "#764ABC",
      },
      {
        label: "React Query",
        color: "#FF4154",
      },
      {
        label: "MongoDB",
        color: "#47A248",
      },
      {
        label: "SCSS",
        color: "#CC6699",
      },
    ] satisfies HeroChip[],
  },
};

export const aboutMe = {
  title: "About Me",
  description:
    "Dedicated Software Engineer specializing in user-centric web applications. Experienced in HTML, CSS, SASS/SCSS and JavaScript for creating intuitive digital experiences. Proficient with modern frameworks and libraries like React.js, Next.js and Vue.js for dynamic interfaces, and skilled in Node.js, Express.js and Nest.js for robust back-end APIs. Passionate about delivering high-quality web solutions that meet user and business goals.",
};

export const skills: SkillItem[] = [
  {
    id: 1,
    name: "HTML5",
    category: "Frontend",
    color: "#E34F26",
    lightColor: "#C2410C",
    glow: "rgba(227, 79, 38, 0.55)",
    lightGlow: "rgba(194, 65, 12, 0.28)",
    description:
      "Semantic structure, accessible markup and SEO-friendly page layouts.",
    Icon: FaHtml5,
  },
  {
    id: 2,
    name: "CSS3",
    category: "Frontend",
    color: "#1572B6",
    lightColor: "#075985",
    glow: "rgba(21, 114, 182, 0.55)",
    lightGlow: "rgba(7, 89, 133, 0.28)",
    description:
      "Responsive layouts, animations, modern UI and reusable style systems.",
    Icon: FaCss3Alt,
  },
  {
    id: 3,
    name: "SASS / SCSS",
    category: "Styling",
    color: "#CC6699",
    lightColor: "#BE185D",
    glow: "rgba(204, 102, 153, 0.55)",
    lightGlow: "rgba(190, 24, 93, 0.3)",
    description:
      "Nested styles, variables, mixins and maintainable SCSS architecture.",
    Icon: SiSass,
  },
  {
    id: 4,
    name: "Bootstrap",
    category: "Styling",
    color: "#7952B3",
    lightColor: "#5B21B6",
    glow: "rgba(121, 82, 179, 0.55)",
    lightGlow: "rgba(91, 33, 182, 0.3)",
    description:
      "Grid systems, responsive components and fast UI prototyping.",
    Icon: FaBootstrap,
  },
  {
    id: 5,
    name: "Tailwind CSS",
    category: "Styling",
    color: "#38BDF8",
    lightColor: "#0284C7",
    glow: "rgba(56, 189, 248, 0.55)",
    lightGlow: "rgba(2, 132, 199, 0.3)",
    description:
      "Utility-first styling, responsive design and clean component UI.",
    Icon: SiTailwindcss,
  },
  {
    id: 6,
    name: "JavaScript",
    category: "Frontend",
    color: "#F7DF1E",
    lightColor: "#B45309",
    glow: "rgba(247, 223, 30, 0.55)",
    lightGlow: "rgba(180, 83, 9, 0.28)",
    description:
      "DOM logic, async flow, API integration and interactive web features.",
    Icon: FaJs,
  },
  {
    id: 7,
    name: "TypeScript",
    category: "Frontend",
    color: "#3178C6",
    lightColor: "#1D4ED8",
    glow: "rgba(49, 120, 198, 0.6)",
    lightGlow: "rgba(29, 78, 216, 0.3)",
    description:
      "Strong typing, scalable architecture and safer frontend development.",
    Icon: SiTypescript,
  },
  {
    id: 8,
    name: "React.js",
    category: "Frontend",
    color: "#61DAFB",
    lightColor: "#087EA4",
    glow: "rgba(97, 218, 251, 0.65)",
    lightGlow: "rgba(8, 126, 164, 0.3)",
    description:
      "Reusable components, hooks, SPA development and complex UI flows.",
    Icon: FaReact,
  },
  {
    id: 9,
    name: "Next.js",
    category: "Frontend",
    color: "#E5E7EB",
    lightColor: "#111827",
    glow: "rgba(229, 231, 235, 0.45)",
    lightGlow: "rgba(17, 24, 39, 0.3)",
    description:
      "SSR, routing, TypeScript integration and production-ready React apps.",
    Icon: SiNextdotjs,
  },
  {
    id: 10,
    name: "Vue.js",
    category: "Frontend",
    color: "#42B883",
    lightColor: "#047857",
    glow: "rgba(66, 184, 131, 0.55)",
    lightGlow: "rgba(4, 120, 87, 0.3)",
    description:
      "Reactive UI development, component structure and modern frontend flows.",
    Icon: FaVuejs,
  },
  {
    id: 11,
    name: "Context API",
    category: "State",
    color: "#61DAFB",
    lightColor: "#0369A1",
    glow: "rgba(97, 218, 251, 0.55)",
    lightGlow: "rgba(3, 105, 161, 0.3)",
    description:
      "Global state sharing, theme state and lightweight app-level data flow.",
    Icon: FaReact,
  },
  {
    id: 12,
    name: "Redux Toolkit",
    category: "State",
    color: "#764ABC",
    lightColor: "#5B21B6",
    glow: "rgba(118, 74, 188, 0.6)",
    lightGlow: "rgba(91, 33, 182, 0.3)",
    description:
      "Predictable state, slices, async thunks and large-scale app data flow.",
    Icon: SiRedux,
  },
  {
    id: 13,
    name: "RTK Query",
    category: "State",
    color: "#764ABC",
    lightColor: "#581C87",
    glow: "rgba(118, 74, 188, 0.6)",
    lightGlow: "rgba(88, 28, 135, 0.3)",
    description:
      "API data fetching, caching, invalidation and server-state management.",
    Icon: SiRedux,
  },
  {
    id: 14,
    name: "React Query",
    category: "State",
    color: "#FF4154",
    lightColor: "#BE123C",
    glow: "rgba(255, 65, 84, 0.55)",
    lightGlow: "rgba(190, 18, 60, 0.3)",
    description:
      "Efficient data fetching, caching and backend synchronization.",
    Icon: SiReactquery,
  },
  {
    id: 15,
    name: "Pinia",
    category: "State",
    color: "#FFD859",
    lightColor: "#B45309",
    glow: "rgba(255, 216, 89, 0.55)",
    lightGlow: "rgba(180, 83, 9, 0.3)",
    description:
      "Simple, scalable and typed state management for the Vue ecosystem.",
    Icon: SiPinia,
  },
  {
    id: 16,
    name: "React Testing Library",
    category: "Testing",
    color: "#E33332",
    lightColor: "#B91C1C",
    glow: "rgba(227, 51, 50, 0.55)",
    lightGlow: "rgba(185, 28, 28, 0.3)",
    description:
      "User-focused component testing and accessible UI behavior validation.",
    Icon: SiTestinglibrary,
  },
  {
    id: 17,
    name: "Vitest",
    category: "Testing",
    color: "#6E9F18",
    lightColor: "#3F6212",
    glow: "rgba(110, 159, 24, 0.55)",
    lightGlow: "rgba(63, 98, 18, 0.3)",
    description:
      "Fast unit testing, Vite-based setup and modern frontend test flow.",
    Icon: SiVitest,
  },
  {
    id: 18,
    name: "Jest",
    category: "Testing",
    color: "#C21325",
    lightColor: "#9F1239",
    glow: "rgba(194, 19, 37, 0.55)",
    lightGlow: "rgba(159, 18, 57, 0.3)",
    description:
      "Unit tests, mocks, assertions and JavaScript testing workflows.",
    Icon: SiJest,
  },
  {
    id: 19,
    name: "Node.js",
    category: "Backend",
    color: "#339933",
    lightColor: "#166534",
    glow: "rgba(51, 153, 51, 0.55)",
    lightGlow: "rgba(22, 101, 52, 0.3)",
    description:
      "REST APIs, server-side logic, authentication and backend services.",
    Icon: FaNodeJs,
  },
  {
    id: 20,
    name: "Express.js",
    category: "Backend",
    color: "#E5E7EB",
    lightColor: "#111827",
    glow: "rgba(229, 231, 235, 0.45)",
    lightGlow: "rgba(17, 24, 39, 0.3)",
    description:
      "Middleware, routes, controllers and lightweight API architecture.",
    Icon: SiExpress,
  },
  {
    id: 21,
    name: "Nest.js",
    category: "Backend",
    color: "#E0234E",
    lightColor: "#BE123C",
    glow: "rgba(224, 35, 78, 0.55)",
    lightGlow: "rgba(190, 18, 60, 0.3)",
    description:
      "Structured backend architecture, modules, controllers and services.",
    Icon: SiNestjs,
  },
  {
    id: 22,
    name: "MongoDB",
    category: "Database",
    color: "#47A248",
    lightColor: "#15803D",
    glow: "rgba(71, 162, 72, 0.55)",
    lightGlow: "rgba(21, 128, 61, 0.3)",
    description:
      "Document-based data modeling, collections and flexible database schemas.",
    Icon: SiMongodb,
  },
  {
    id: 23,
    name: "Vite",
    category: "Build Tool",
    color: "#646CFF",
    lightColor: "#4F46E5",
    glow: "rgba(100, 108, 255, 0.6)",
    lightGlow: "rgba(79, 70, 229, 0.3)",
    description:
      "Fast dev server, optimized build and modern frontend tooling.",
    Icon: SiVite,
  },
  {
    id: 24,
    name: "Git",
    category: "Tools",
    color: "#F05032",
    lightColor: "#C2410C",
    glow: "rgba(240, 80, 50, 0.55)",
    lightGlow: "rgba(194, 65, 12, 0.3)",
    description:
      "Version control, branching, commits and collaborative workflows.",
    Icon: FaGitAlt,
  },
  {
    id: 25,
    name: "GitHub",
    category: "Tools",
    color: "#E5E7EB",
    lightColor: "#181717",
    glow: "rgba(229, 231, 235, 0.45)",
    lightGlow: "rgba(24, 23, 23, 0.3)",
    description:
      "Repositories, pull requests, issues and team-based code collaboration.",
    Icon: FaGithub,
  },
  {
    id: 26,
    name: "GitLab",
    category: "Tools",
    color: "#FC6D26",
    lightColor: "#C2410C",
    glow: "rgba(252, 109, 38, 0.55)",
    lightGlow: "rgba(194, 65, 12, 0.3)",
    description:
      "Version control, code reviews, CI/CD pipelines and project workflow.",
    Icon: FaGitlab,
  },
];

export const education = [
  {
    id: 1,
    school: "Baku State University",
    period: "September 2020 – July 2024",
    degree: "Bachelor Degree in Computer Science",
    description:
      "Completed a comprehensive education in Computer Science, gaining a solid foundation in both theoretical knowledge and practical experience.",
  },
  {
    id: 2,
    school: "Azerbaijan Technical University",
    period: "September 2024 – July 2026",
    degree:
      "Master Degree in Mathematical and Economic Methods of Optimal Management",
    description:
      "Focused on efficiently programming mathematical problems by applying algorithms that minimize computational complexity while ensuring accurate solutions.",
  },
];

export const experience = [
  {
    id: 1,
    company: "VABISS",
    role: "Front-End Developer Intern",
    period: "July 2024 – August 2024",
    description:
      "Collaborated with Node.js Back-end Developers, Machine Learning Developers and Data Analysts. Primarily used React, Tailwind CSS, Redux Toolkit and Axios for front-end development. Supported back-end development in Node.js and gained team experience with GitHub.",
  },
  {
    id: 2,
    company: "VABISS",
    role: "Front-End Developer",
    period: "August 2024 – February 2025",
    description:
      "Developed and maintained front-end applications using Next.js with TypeScript. Used Material UI, Minimals.cc, Redux Toolkit and React Query to create modern, responsive and scalable interfaces. Collaborated with back-end and machine learning teams to integrate APIs and models.",
  },
  {
    id: 3,
    company: "Azerbaijan Railways",
    role: "Front-End Developer",
    period: "June 2025 – Present",
    description:
      "Developing scalable front-end applications using React, TypeScript and SCSS. Working with an in-house component library, Redux Toolkit, GitLab, Jira, Agile methodologies, code reviews and CI/CD pipelines.",
  },
];

export const timeline = [

  {
    id: 1,
    year: "July 2024 – August 2024",
    title: "VABISS — Frontend Developer Intern",
    description:
      "Worked with React, Tailwind CSS, Redux Toolkit and Axios. Collaborated with back-end, machine learning and data teams, and gained GitHub team workflow experience.",
  },
  {
    id: 2,
    year: "August 2024 – February 2025",
    title: "VABISS — Frontend Developer",
    description:
      "Developed Next.js and TypeScript applications with Material UI, Minimals.cc, Redux Toolkit and React Query. Integrated APIs and machine learning models into front-end interfaces.",
  },
  {
    id: 3,
    year: "June 2025 – Present",
    title: "Azerbaijan Railways — Frontend Developer",
    description:
      "Developing scalable React, TypeScript and SCSS applications. Using Redux Toolkit, an in-house component library, GitLab, Jira, Agile workflow and CI/CD pipelines.",
  },
];


export const SELECTED_REPOS = [
  "mern-ecommerce",
  "nextjs-mongo-hotel-booking",
  "reservation-api-modular-monolith",
  "fakestore-react-native-app",
  "nest-restaurant-api",
  "telegram-ai-bot",
  "nextjs-mongo-hotel-booking",
  "valorant-wiki",
  "ecommerce-shop-bazaar"
];

export const blogPosts = [
  {
    id: 1,
    title: "How to Build a Professional React Portfolio",
    slug: "react-portfolio-professional",
    description:
      "A practical guide to creating a modern developer portfolio with React, TypeScript, Three.js and clean UI architecture.",
    date: "12 January 2026",
    content:
      "A professional portfolio is more than a simple personal website. It should clearly communicate your skills, projects, experience and personality. In this article, I explain how to structure a React portfolio using reusable components, clean folder architecture, TypeScript types, responsive layouts, smooth animations and interactive 3D elements. The goal is to create a portfolio that feels modern, performs well and helps recruiters or clients quickly understand your technical value.",
  },
  {
    id: 2,
    title: "Why TypeScript Makes Front-End Applications More Scalable",
    slug: "typescript-scalable-frontend",
    description:
      "An informative overview of how TypeScript improves code quality, maintainability and long-term scalability in front-end projects.",
    date: "4 February 2026",
    content:
      "TypeScript helps developers build safer and more predictable applications by adding static typing to JavaScript. In front-end development, this becomes especially valuable when working with complex components, API responses, reusable hooks and shared utility functions. TypeScript reduces runtime errors, improves autocomplete, makes refactoring easier and helps teams understand data structures more clearly. For scalable applications, TypeScript is not just a tool; it is a foundation for better engineering discipline.",
  },
  {
    id: 3,
    title: "React Component Architecture for Real-World Projects",
    slug: "react-component-architecture",
    description:
      "A practical explanation of how to organize React components, hooks, services and feature-based folders in professional applications.",
    date: "18 March 2026",
    content:
      "A clean React architecture makes a project easier to maintain, test and scale. Instead of placing every component in one global folder, real-world applications benefit from feature-based organization. Each feature can contain its own components, hooks, services and styles. Shared UI components should be reusable and independent from business logic. This approach keeps the codebase understandable, reduces duplication and allows teams to work on different parts of the application without creating unnecessary conflicts.",
  },
  {
    id: 4,
    title: "Understanding State Management in Modern React",
    slug: "modern-react-state-management",
    description:
      "A simple breakdown of local state, global state, server state and when to use tools like Redux Toolkit or React Query.",
    date: "9 April 2026",
    content:
      "State management is one of the most important topics in React development. Local state is useful for UI interactions such as modals, tabs or form fields. Global state is better for shared application data like authentication, theme or user preferences. Server state requires a different approach because it depends on API data, caching, loading states and synchronization. Tools like Redux Toolkit and React Query solve different problems, and choosing the right one depends on the needs of the application.",
  },
  {
    id: 5,
    title: "Building Better User Interfaces with SCSS",
    slug: "better-ui-with-scss",
    description:
      "How SCSS helps create reusable, maintainable and visually consistent styles for modern web applications.",
    date: "27 May 2026",
    content:
      "SCSS gives developers more control and structure when writing styles for large interfaces. Features like nesting, variables, mixins and partial files make styles easier to organize and reuse. In component-based projects, SCSS can help keep design systems consistent while still allowing flexible customization. A well-structured SCSS architecture improves readability, reduces repeated code and makes it easier to maintain responsive layouts, themes and complex UI states.",
  },
  {
    id: 6,
    title: "How Node.js Complements a React Front-End",
    slug: "nodejs-react-fullstack-development",
    description:
      "An overview of how Node.js, Express.js and Nest.js can power robust APIs for modern React applications.",
    date: "16 June 2026",
    content:
      "React is responsible for building interactive user interfaces, while Node.js can handle the server-side logic behind those interfaces. With Node.js, developers can create REST APIs, authentication systems, database connections and file upload flows. Express.js is lightweight and flexible, while Nest.js provides a more structured architecture for larger applications. Together, React and Node.js form a powerful full-stack ecosystem for building scalable and maintainable web products.",
  },
  {
    id: 7,
    title: "Improving Web Performance in React Applications",
    slug: "react-web-performance",
    description:
      "Key techniques for making React applications faster, smoother and more efficient for real users.",
    date: "3 July 2026",
    content:
      "Performance is a critical part of user experience. In React applications, performance can be improved by reducing unnecessary re-renders, splitting large components, lazy loading routes, optimizing images and keeping bundle size under control. Developers should also avoid heavy animations on low-end devices and use memoization only when it provides real value. A fast application feels more professional, keeps users engaged and improves the overall quality of the product.",
  },
  {
    id: 8,
    title: "Using Three.js to Create Interactive Portfolio Experiences",
    slug: "threejs-interactive-portfolio",
    description:
      "How 3D elements can make a developer portfolio more memorable without sacrificing performance.",
    date: "21 August 2026",
    content:
      "Three.js allows developers to create interactive 3D experiences directly in the browser. In a portfolio, 3D elements can make sections like skills, projects, education and timeline more engaging. However, performance should always come first. It is important to limit geometry complexity, reduce unnecessary particles, avoid heavy DOM elements inside Canvas and use optimized camera settings. A good 3D portfolio should feel smooth, creative and professional at the same time.",
  },
  {
    id: 9,
    title: "Why Clean Code Matters in Front-End Development",
    slug: "clean-code-frontend-development",
    description:
      "A developer-focused article about readability, maintainability and writing front-end code that teams can trust.",
    date: "14 September 2026",
    content:
      "Clean code is not only about making code look nice. It is about making the project easier to understand, debug and extend. In front-end development, clean code includes meaningful component names, clear props, reusable hooks, consistent file structure and simple business logic. When code is readable, teams can move faster and make fewer mistakes. A clean codebase also makes onboarding easier for new developers and improves long-term project quality.",
  },
  {
    id: 10,
    title: "From Junior Developer to Software Engineer Mindset",
    slug: "software-engineer-mindset",
    description:
      "An article about growing from simply writing code to thinking about architecture, performance, users and business value.",
    date: "6 November 2026",
    content:
      "Becoming a better developer is not only about learning more libraries or frameworks. A software engineer thinks about the bigger picture: how the application is structured, how users interact with it, how reliable it is and how easily it can grow in the future. This mindset includes writing maintainable code, understanding business requirements, communicating clearly with teammates and constantly improving technical decisions. The transition from junior developer to software engineer begins when you start solving problems, not just tasks.",
  },
];