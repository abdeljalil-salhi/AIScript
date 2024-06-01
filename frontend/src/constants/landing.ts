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
} from "@/assets/landing";
import { notification2, notification3 } from "@/assets";
// Interfaces
import { Benefit, Navigation } from "./types";

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
    title: "How to use",
    url: "#how-to-use",
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
export const notificationImages: string[] = [
  PeopleOne,
  notification3,
  notification2,
];

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
