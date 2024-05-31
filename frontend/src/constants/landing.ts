// Assets
import { PeopleOne } from "@/assets/landing";
// Interfaces
import { Navigation } from "./types";
import { notification1, notification2, notification3 } from "@/assets";

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
 * Notification images for the notification component
 * @type {string[]}
 */
export const notificationImages: string[] = [PeopleOne, notification3, notification2];
