import shoppingCartLogo from '../assets/shopping-website.jpg'
import recipeSearchLogo from '../assets/recipe-search.jpg'
import quizAppLogo from '../assets/quiz-app.jpg'
import axionedLogo from '../assets/axioned-logo.png'
import v2sLogo from '../assets/v2s-icon.jfif'

export const profile = {
  name: 'Saurabh Gaonkar',
  shortName: 'Saurabh',
  title: 'Frontend Developer',
  headline: 'Frontend Developer specializing in React.js',
  location: 'Thane, India',
  experienceYears: '4+',
  email: 'ssgaonkar96@gmail.com',
  phone: '+91 75175 44582',
  linkedin: 'https://www.linkedin.com/in/saurabh-gaonkar-2b12841b7/',
  github: 'https://github.com/saurabh918',
  resumeHref: '/Saurabh_Gaonkar_Resume.docx',
  summary:
    'Frontend Developer with 4+ years of experience building enterprise web applications using React.js, Next.js, TypeScript, Redux, and modern frontend technologies. Experienced in dashboard development, CMS-driven websites, mobile web-view platforms, REST API integrations, performance optimization, and delivering scalable, user-centric solutions across multiple business domains.',
  aboutBrief:
    'Frontend Developer with 4+ years of experience building production web applications with React and Next.js, with hands-on backend exposure through Node.js, Express.js, MySQL, and REST APIs. I work across dashboards, CMS-driven websites, mobile web views, and API-backed workflows, with a focus on reusable UI, performance, and reliable user experiences.',
  aboutPositioning:
    'Production frontend developer building maintainable React and Next.js interfaces for enterprise teams.',
  aboutFacts: [
    { label: 'Experience', value: '4+ years' },
    { label: 'Primary stack', value: 'React / Next.js' },
    { label: 'Work type', value: 'Production applications' },
  ],
  aboutStrengths: [
    {
      title: 'React & Next.js',
      description:
        'Dashboards, CMS sites, reusable components, and consistent UI across production applications.',
    },
    {
      title: 'API-driven applications',
      description:
        'REST integrations for CRUD flows, reporting, claims, and operational workflows with backend teams.',
    },
    {
      title: 'Performance & modernization',
      description:
        'Runtime upgrades, dependency cleanup, and frontend performance work in live delivery environments.',
    },
  ],
  heroIntro:
    'I design and build production React and Next.js interfaces — dashboards, CMS-driven websites, and API-backed web applications — with a focus on maintainable architecture, responsive UI, and reliable delivery.',
  focusAreas: [
    'React.js',
    'Next.js',
    'TypeScript',
    'Dashboards',
    'CMS',
    'API integration',
  ],
}

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

export const experience = [
  {
    id: 't7e',
    company: 'T7E Aftermarket Connect Pvt. Ltd.',
    role: 'Frontend Developer',
    location: 'Thane',
    start: 'Sep 2024',
    end: 'Present',
    current: true,
    logo: null,
    logoAlt: '',
    mark: 'T7E',
    technologies: [
      'React.js',
      'Next.js',
      'TypeScript',
      'REST APIs',
      'Strapi',
      'Docker',
      'AWS',
      'Jenkins',
    ],
    projects: [
      {
        name: 'Loyalty Workforce Management Platform',
        points: [
          'Led frontend development across business-critical dashboards for loyalty programs, rewards tracking, workforce management, KYC verification, location monitoring, and operational reporting.',
          'Built reporting interfaces with tables, charts, filters, maps, and analytics views, integrated with REST APIs for mechanics, retailers, dealers, distributors, painters, field teams, and business stakeholders.',
          'Developed reusable React and Next.js components to keep UI consistent across projects, working with backend teams on data flow across web and mobile.',
        ],
      },
      {
        name: 'Mobile Web-View Platform',
        points: [
          'Developed dynamic web-view applications inside mobile apps so campaign pages, forms, reward journeys, lucky draw modules, and leaderboards could ship without frequent app releases.',
        ],
      },
      {
        name: 'Corporate Website Revamp',
        points: [
          'Designed and developed the company website in Next.js with Strapi CMS, replacing the previous WordPress implementation.',
          'Implemented reusable page templates, responsive layouts, SEO-friendly architecture, and CMS-driven content workflows.',
        ],
      },
      {
        name: 'Platform Modernization',
        points: [
          'Migrated multiple applications from Node.js 14 to Node.js 22, resolved dependency and compatibility issues, and optimized frontend performance.',
          'Supported Jenkins pipelines, Docker-based deployment, and AWS-hosted environments.',
        ],
      },
    ],
  },
  {
    id: 'v2s',
    company: 'V2STech Solutions Pvt. Ltd.',
    role: 'Software Engineer',
    location: 'Thane',
    start: 'May 2024',
    end: 'Aug 2024',
    current: false,
    logo: v2sLogo,
    logoAlt: 'V2STech Solutions logo',
    mark: 'V2S',
    technologies: [
      'React.js',
      'TypeScript',
      'Material UI',
      'Styled Components',
      'Formik',
      'Yup',
      'REST APIs',
    ],
    projects: [
      {
        name: 'Healthcare Benefits Portal',
        points: [
          'Developed frontend modules for a healthcare benefits platform supporting cashless treatment workflows under government health insurance schemes.',
          'Built React and TypeScript modules from scratch with reusable UI using Material UI and Styled Components.',
          'Implemented complex forms with Formik and Yup validation, and integrated REST APIs for beneficiary management and claims workflows.',
          'Participated in testing, debugging, and code quality improvements.',
        ],
      },
    ],
  },
  {
    id: 'axioned',
    company: 'Axioned',
    role: 'Software Engineer',
    location: 'Thane',
    start: 'Jan 2022',
    end: 'Mar 2024',
    current: false,
    logo: axionedLogo,
    logoAlt: 'Axioned logo',
    mark: 'AX',
    technologies: [
      'React.js',
      'Redux',
      'JAMstack',
      'Eleventy',
      'Nunjucks',
      'Netlify',
      'Shopify',
      'SonarQube',
    ],
    projects: [
      {
        name: 'Product Information Management Dashboard',
        points: [
          'Developed React dashboards and reusable Redux components for product and ingredient information workflows.',
          'Integrated backend APIs and collaborated with cross-functional teams on features, enhancements, and maintenance.',
        ],
      },
      {
        name: 'Shopify Integration Plugin',
        points: [
          'Created customer-facing Shopify integration modules and frontend functionality, following SonarQube standards for code quality.',
        ],
      },
      {
        name: 'Home Warranty Platform',
        points: [
          'Developed JAMstack websites with Eleventy and Nunjucks, adding filtering, pagination, geolocation, and responsive layouts, with Netlify deployments.',
          'Conducted code reviews, managed Git workflows, and resolved production issues.',
        ],
      },
    ],
  },
]

export const selectedWork = [
  {
    id: 'order-management-system',
    variant: 'fullstack',
    name: 'Order Management System',
    company: 'Production · Full-Stack Contribution',
    period: '',
    badge: 'Full-stack',
    useCase:
      'Order and product management workflows with role-based access, API integrations, and operational data screens.',
    description:
      'Developed the frontend end-to-end and contributed to backend development for an Order Management System using React.js, Node.js, Express.js, Sequelize, and MySQL.',
    contribution:
      'Developed the frontend end-to-end and contributed to backend development for an Order Management System using React.js, Node.js, Express.js, Sequelize, and MySQL. Worked on REST APIs, authentication, role-based authorization, CRUD workflows, relational data, validation, and database operations.',
    frontendContribution:
      'Order and product management UI, authentication flows, role-based screens, forms and validation, search, filtering, pagination, API integration, and responsive data-driven interfaces.',
    frontendStack: ['React.js', 'UI', 'API Integration', 'Forms', 'Dashboard'],
    backendExposureLabel: 'Backend exposure',
    backendStack: ['Node.js', 'Express.js', 'Sequelize', 'MySQL', 'REST APIs', 'Auth'],
    backendExposure: [
      'CRUD APIs',
      'Authentication & role-based authorization',
      'Orders and relational database workflows',
      'Validation & centralized error handling',
      'Pagination, search & filtering',
      'Transactions and stored procedures',
      'Migrations, seed data and indexes',
      'CSV batch processing and cron jobs',
      'Logging',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Sequelize'],
  },
  {
    id: 'loyalty-platform',
    name: 'Loyalty Workforce Management Platform',
    company: 'T7E Aftermarket Connect',
    period: '2024 — Present',
    useCase:
      'Business teams needed a reliable frontend for loyalty programs, workforce operations, and reporting across multiple stakeholder groups.',
    contribution:
      'Led frontend development for dashboards covering rewards, KYC, location monitoring, and operational reporting. Built reusable React and Next.js components and reporting views with tables, charts, filters, maps, and REST API integrations.',
    stack: ['React.js', 'Next.js', 'REST APIs', 'Dashboards'],
    features: [
      'Multi-role operational dashboards',
      'Reporting with tables, charts, filters, and maps',
      'Reusable component architecture',
    ],
  },
  {
    id: 'webview-platform',
    name: 'Mobile Web-View Platform',
    company: 'T7E Aftermarket Connect',
    period: '2024 — Present',
    useCase:
      'Campaign and engagement experiences needed to reach users inside mobile apps without waiting on app-store releases.',
    contribution:
      'Developed dynamic web-view applications for campaign pages, forms, reward journeys, lucky draw modules, and leaderboards.',
    stack: ['React.js', 'Mobile web-views', 'REST APIs'],
    features: [
      'In-app web-view experiences',
      'Campaign and reward journeys',
      'Forms, lucky draws, and leaderboards',
    ],
  },
  {
    id: 'corporate-site',
    name: 'Corporate Website Revamp',
    company: 'T7E Aftermarket Connect',
    period: '2024 — Present',
    useCase:
      'The existing WordPress site needed a more maintainable, SEO-friendly frontend with structured CMS workflows.',
    contribution:
      'Designed and developed the company website with Next.js and Strapi CMS, including reusable page templates, responsive layouts, and CMS-driven content.',
    stack: ['Next.js', 'Strapi', 'SEO', 'CMS'],
    features: [
      'Reusable page templates',
      'CMS-driven content workflows',
      'Responsive, SEO-friendly architecture',
    ],
  },
  {
    id: 'healthcare-portal',
    name: 'Healthcare Benefits Portal',
    company: 'V2STech Solutions',
    period: '2024',
    useCase:
      'A government health insurance workflow required a frontend for cashless treatment, beneficiary management, and claims.',
    contribution:
      'Built React/TypeScript modules from scratch with Material UI, Styled Components, Formik/Yup forms, and REST API integrations for beneficiary and claims workflows.',
    stack: ['React.js', 'TypeScript', 'Material UI', 'Formik', 'Yup'],
    features: [
      'Modules built from scratch',
      'Complex validated forms',
      'Beneficiary and claims API flows',
    ],
  },
  {
    id: 'pim-dashboard',
    name: 'Product Information Management Dashboard',
    company: 'Axioned',
    period: '2022 — 2024',
    useCase:
      'Product and ingredient information needed a maintainable dashboard with shared state and API-backed workflows.',
    contribution:
      'Developed React dashboards and reusable Redux components, integrated backend APIs, and contributed to ongoing feature work and maintenance.',
    stack: ['React.js', 'Redux', 'REST APIs'],
    features: [
      'Reusable Redux-backed components',
      'Product and ingredient workflows',
      'Cross-functional feature delivery',
    ],
  },
  {
    id: 'warranty-jamstack',
    name: 'Home Warranty Platform',
    company: 'Axioned',
    period: '2022 — 2024',
    useCase:
      'Marketing and service pages needed fast static delivery with interactive filtering, pagination, and location-aware behavior.',
    contribution:
      'Built JAMstack sites with Eleventy and Nunjucks, implemented JavaScript-driven filtering, pagination, and geolocation features, and handled Netlify configuration and GitHub pull request reviews.',
    stack: ['JAMstack', 'Eleventy', 'Nunjucks', 'Netlify'],
    features: [
      'Filtering and pagination',
      'Geolocation-based functionality',
      'Netlify deployment and PR reviews',
    ],
  },
]

export const personalProjects = [
  {
    id: 'quiz-app',
    name: 'Quiz App',
    logo: quizAppLogo,
    alt: 'Screenshot of a quiz interface with multiple-choice answers and a prize ladder',
    description:
      'Timed general-knowledge quiz with scoring and round progression.',
    contribution:
      'Handled game state, scoring flow, and interactive audio cues in React.',
    stack: ['React', 'State management'],
    demoLink: 'https://my-quiz-app-sg.netlify.app/',
    codeLink: 'https://github.com/saurabh918/quiz-app/tree/master',
  },
  {
    id: 'shopping-cart',
    name: 'Shopping Cart',
    logo: shoppingCartLogo,
    alt: 'Screenshot of a React shopping cart with product filters and cart totals',
    description:
      'Product browsing with filters, search, cart quantities, and live totals.',
    contribution:
      'Implemented cart and catalog state with React Context and useReducer, including filter and search behavior.',
    stack: ['React', 'Context API', 'useReducer'],
    demoLink: 'https://react-shopping-cart1996.netlify.app/',
    codeLink: 'https://github.com/saurabh918/shopping_cart',
  },
  {
    id: 'recipe-search',
    name: 'Recipe Search',
    logo: recipeSearchLogo,
    alt: 'Screenshot of a recipe search app with saved recipes and recipe cards',
    description:
      'Recipe discovery with search and bookmarking for later reference.',
    contribution:
      'Built the UI and client state with Redux Toolkit and Styled Components.',
    stack: ['React', 'Redux Toolkit', 'Styled Components'],
    demoLink: 'https://recipe-task.netlify.app/',
    codeLink: 'https://github.com/saurabh918/React-test2/tree/dev',
  },
  // {
  //   id: 'bookkeeper',
  //   name: 'BookKeeper',
  //   logo: booksLogo,
  //   alt: 'Screenshot of a book management table with search, sorting, and a create form',
  //   description:
  //     'Book inventory table with search, column sorting, and full CRUD.',
  //   contribution:
  //     'Implemented list management, form flows, and Redux Toolkit state for create, update, and delete operations.',
  //   stack: ['React', 'Redux Toolkit', 'Styled Components'],
  //   demoLink: 'https://book-management-system-react-redux.netlify.app/',
  //   codeLink: 'https://github.com/saurabh918/React-test',
  // },
  // {
  //   id: 'optic-store',
  //   name: 'Optic Store',
  //   logo: opticStoreLogo,
  //   alt: 'Screenshot of an optics store catalog with add-to-cart actions',
  //   description:
  //     'Catalog and cart experience for optical products, including quantity and spend totals.',
  //   contribution:
  //     'Built the storefront UI with Tailwind CSS and cart state using Context and useReducer.',
  //   stack: ['React', 'Tailwind CSS', 'Context API'],
  //   demoLink: 'https://react-with-tailwind1996.netlify.app/',
  //   codeLink: 'https://github.com/saurabh918/react-with-tailwind',
  // },
]

export const skillGroups = [
  {
    name: 'Frontend',
    items: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'State management',
    items: ['Redux', 'React Context API', 'TanStack Query'],
  },
  {
    name: 'Styling / UI',
    items: ['SCSS', 'Tailwind CSS', 'Material UI', 'Styled Components'],
  },
  {
    name: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'],
  },
  {
    name: 'Database',
    items: ['MySQL', 'Sequelize'],
  },
  {
    name: 'CMS',
    items: ['Strapi', 'JAMstack', 'Eleventy', 'Nunjucks', 'Shopify'],
  },
  {
    name: 'Tools / DevOps',
    items: ['Git', 'GitHub', 'Docker', 'AWS', 'Jenkins', 'Netlify', 'Webpack'],
  },
  {
    name: 'Quality & collaboration',
    items: ['Jira', 'SonarQube', 'Figma', 'VS Code', 'Agile'],
  },
]

export const capabilities = [
  {
    title: 'Dashboard development',
    description:
      'Production reporting interfaces with tables, charts, filters, maps, and role-specific operational views.',
    icon: '◫',
  },
  {
    title: 'CMS-driven websites',
    description:
      'Next.js sites with Strapi, reusable templates, and content workflows that replace hard-coded page updates.',
    icon: '◇',
  },
  {
    title: 'API-backed applications',
    description:
      'REST integrations for CRUD flows, claims, beneficiary data, product information, and dashboard reporting.',
    icon: '⇄',
  },
  {
    title: 'Responsive UI',
    description:
      'Interfaces that hold up across desktop, tablet, mobile, and in-app web-views.',
    icon: '▭',
  },
  {
    title: 'Performance & modernization',
    description:
      'Runtime upgrades, dependency cleanup, and frontend performance work, including Node.js 14 to 22 migrations.',
    icon: '↗',
  },
  {
    title: 'Independent frontend ownership',
    description:
      'End-to-end UI delivery: reusable components, Git reviews, production fixes, and collaboration with backend teams.',
    icon: '◎',
  },
]

export const education = {
  degree: 'Bachelor of Engineering, Computer Engineering',
  school: 'Mumbai University',
  year: 'May 2019',
}

export const currentFocus = {
  title: 'Currently focused on',
  body: 'I keep my work centered on modern frontend architecture: React, Next.js, TypeScript, maintainable component systems, and production quality. I am also exploring how AI tooling can support frontend workflows — research, documentation, and faster iteration — as a complement to core engineering, not a replacement for it.',
  items: [
    'React and Next.js application architecture',
    'CMS and dashboard delivery',
    'Performance and maintainable UI systems',
    'Practical use of AI as a supporting workflow tool',
  ],
}
