// Assets
import {
  IconHome,
  IconFile,
  IconSearch,
  IconPlus,
  PeopleOne,
  LogoWattpad,
  LogoKindle,
  LogoGoodreads,
  LogoDeviantArt,
  BenefitCardOne,
  BenefitCardTwo,
  BenefitCardThree,
  BenefitIconBook,
  BenefitIconConvert,
  BenefitIconImage,
  BenefitBackground,
  WordLogo,
  NotionLogo,
  GoogleDocsLogo,
  OpenAILogo,
  PhotoshopLogo,
  PdfLogo,
  GoogleAuthenticatorLogo,
  AsposeLogo,
  ServiceIconOne,
  ServiceIconTwo,
  ServiceIconThree,
  ServiceIconFour,
  ServiceIconFive,
  StorytellingSupport,
  EnhancedCoverGeneration,
  InstantBookGeneration,
  EnhancedSecurity,
  Telegram,
} from "@/assets/landing";
// Interfaces
import {
  Benefit,
  CollaborationApp,
  CollaborationContent,
  Navigation,
  Pricing,
  Roadmap,
  ServiceIcon,
  Social,
} from "./types";

/**
 * Navigation links for the landing page header
 * @type {Navigation[]}
 */
export const navigations: Navigation[] = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Services",
    url: "#services",
  },
  {
    id: "2",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "Sign up",
    url: "/register",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Log in",
    url: "/login",
    onlyMobile: true,
  },
];

/**
 * Hero icons for the hero component
 * @type {string[]}
 */
export const heroIcons: string[] = [IconHome, IconFile, IconSearch, IconPlus];

/**
 * Notification images for the notification component
 * @type {string[]}
 */
export const notificationImages: string[] = [PeopleOne, PeopleOne, PeopleOne];

/**
 * Company logos for the landing page, used in the hero component
 * @type {string[]}
 */
export const companyLogos: string[] = [
  LogoWattpad,
  LogoKindle,
  LogoGoodreads,
  LogoDeviantArt,
];

/**
 * Benefits for the landing page, used in the benefits component
 * @type {Benefit[]}
 */
export const benefits: Benefit[] = [
  {
    id: "0",
    title: "Instant Book Creation",
    text: "Generate complete books on any topic in seconds, eliminating the need for prolonged writing sessions.",
    backgroundUrl: BenefitCardOne,
    iconUrl: BenefitIconBook,
    imageUrl: BenefitBackground,
  },
  {
    id: "1",
    title: "AI-Powered Formatting",
    text: "Leverage AI to automatically format your books into professional DOCX and PDF documents.",
    backgroundUrl: BenefitCardTwo,
    iconUrl: BenefitIconConvert,
    imageUrl: BenefitBackground,
    light: true,
  },
  {
    id: "2",
    title: "Custom AI-Generated Covers",
    text: "Create stunning book covers that match your topic, designed by our advanced AI to captivate readers.",
    backgroundUrl: BenefitCardThree,
    iconUrl: BenefitIconImage,
    imageUrl: BenefitBackground,
  },
];

/**
 * Collaboration text for the landing page, used in the collaboration component
 * @type {string}
 */
export const collaborationText: string =
  "Streamline your writing process with AI-driven automation, making book creation quick and easy.";

/**
 * Collaboration content for the landing page, used in the collaboration component
 * @type {CollaborationContent[]}
 */
export const collaborationContent: CollaborationContent[] = [
  {
    id: "0",
    title: "Smart Automation",
    text: "Automate the entire book creation process, from writing to formatting, to maximize efficiency and productivity.",
  },
  {
    id: "1",
    title: "Effortless Writing",
  },
  {
    id: "2",
    title: "Enhanced Security",
  },
];

/**
 * Collaboration apps for the landing page, used in the collaboration circle component
 * @type {CollaborationApp[]}
 */
export const collaborationApps: CollaborationApp[] = [
  {
    id: "0",
    title: "Word",
    icon: WordLogo,
    width: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: NotionLogo,
    width: 36,
  },
  {
    id: "2",
    title: "Google Docs",
    icon: GoogleDocsLogo,
    width: 26,
  },
  {
    id: "3",
    title: "OpenAI",
    icon: OpenAILogo,
    width: 38,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: PhotoshopLogo,
    width: 34,
  },
  {
    id: "5",
    title: "PDF",
    icon: PdfLogo,
    width: 36,
  },
  {
    id: "6",
    title: "Google Authenticator",
    icon: GoogleAuthenticatorLogo,
    width: 38,
  },
  {
    id: "7",
    title: "Aspose",
    icon: AsposeLogo,
    width: 38,
  },
];

/**
 * Services for the landing page, used in the first service card
 * @type {string[]}
 */
export const services: string[] = [
  "AI-Powered Book Generation",
  "Automated Cover Design",
  "Instant Results",
];

/**
 * Service icons for the landing page, used in the third service card
 * @type {ServiceIcon[]}
 */
export const serviceIcons: ServiceIcon[] = [
  {
    id: "0",
    icon: ServiceIconOne,
    width: 24,
  },
  {
    id: "1",
    icon: ServiceIconTwo,
    width: 32,
  },
  {
    id: "2",
    icon: ServiceIconThree,
    width: 36,
  },
  {
    id: "3",
    icon: ServiceIconFour,
    width: 33,
  },
  {
    id: "4",
    icon: ServiceIconFive,
    width: 24,
  },
];

/**
 * Pricing plans for the landing page, used in the pricing component
 * @type {Pricing[]}
 */
export const pricing: Pricing[] = [
  {
    id: "0",
    title: "Basic Plan",
    description: "For testing purposes and exploring the app",
    price: "0",
    features: [
      "Free 50 credits",
      "Non-commercial terms",
      "No credit top ups",
      "Free shared generation queue",
    ],
  },
  {
    id: "1",
    title: "Pro Plan",
    description: "For small projects and commercial use",
    price: import.meta.env.VITE_API_PROPLAN_MONTHLY,
    features: [
      "500 credits renewable monthly",
      "General commercial terms",
      "Optional credit top ups",
      "Priority generation queue",
    ],
  },
  {
    id: "2",
    title: "Premier Plan",
    description: "For large projects and commercial use",
    price: import.meta.env.VITE_API_PREMIERPLAN_MONTHLY,
    features: [
      "1000 credits renewable monthly",
      "General commercial terms",
      "Optional credit top ups",
      "Priority generation queue",
    ],
  },
];

/**
 * Roadmap items for the landing page, used in the roadmap component
 */
export const roadmap: Roadmap[] = [
  {
    id: "0",
    title: "Storytelling Support",
    text: "Enhance the AI to write stories with consistent characters and settings, providing richer and more engaging narratives.",
    date: "June 2024",
    status: "progress",
    imageUrl: StorytellingSupport,
    colorful: true,
  },
  {
    id: "1",
    title: "Enhanced Cover Generation",
    text: "Improve the AI model to generate book covers that perfectly match the topic and aesthetic of the book.",
    date: "May 2024",
    status: "done",
    imageUrl: EnhancedCoverGeneration,
  },
  {
    id: "2",
    title: "Instant Book Generation",
    text: "Develop an AI model that generates high-quality books within seconds, ensuring a high level of proficiency.",
    date: "April 2024",
    status: "done",
    imageUrl: InstantBookGeneration,
  },
  {
    id: "3",
    title: "Enhanced Security",
    text: "Implement secure payment providers and authentication modules, including two-factor authentication (2FA), to ensure the security of accounts and transactions.",
    date: "March 2024",
    status: "done",
    imageUrl: EnhancedSecurity,
  },
];

/**
 * Social media links for the footer component
 * @type {Social[]}
 */
export const socials: Social[] = [
  {
    id: "0",
    title: "Telegram",
    iconUrl: Telegram,
    url: "https://t.me/aiscript_bot",
  },
];
