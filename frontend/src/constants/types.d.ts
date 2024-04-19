// Dependencies
import { FC } from "react";

/**
 * General Interfaces
 */
export interface Navigation {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean;
}

/**
 * Authentication Interfaces
 */
export interface OAuthProvider {
  id: string;
  title: string;
  href: string;
  icon: FC<{ className?: string }>;
}

/**
 * Sidebar Interfaces
 */
export interface NavigationLink {
  id: string;
  title: string;
  href: string;
}

/**
 * Home Interfaces
 */
export interface Suggestion {
  id: string;
  content: string;
}
export interface ShowcaseItem {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
}
