// Dependencies
import { FC } from "react";

/**
 * Landing Interfaces
 */
export interface Navigation {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean;
}
export interface Benefit {
  id: string;
  title: string;
  text: string;
  backgroundUrl: string;
  iconUrl: string;
  imageUrl?: string;
  light?: boolean;
}
export interface CollaborationContent {
  id: string;
  title: string;
  text?: string;
}
export interface CollaborationApp {
  id: string;
  title: string;
  icon: string;
  width: number;
}
export interface ServiceIcon {
  id: string;
  icon: string;
  width: number;
}
export interface Pricing {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
}
export interface Roadmap {
  id: string;
  title: string;
  text: string;
  date: string;
  status: "done" | "progress";
  imageUrl: string;
  colorful?: boolean;
}
export interface Social {
  id: string;
  title: string;
  iconUrl: string;
  url: string;
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

/**
 * Pricing Interfaces
 */
export interface PricingPlan {
  id: string;
  title: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  priceYearlyPerMonth: number;
  features: string[];
  planIdMonthly: string;
  planIdYearly: string;
}

/**
 * Checkout Interfaces
 */

export interface CheckoutPlan {
  id: string;
  name: string;
  planId: string;
  pricingPlanId: string;
  period: 0 | 1;
}
export interface PaypalOrderResponse {
  orderID: string;
  subscriptionID: string;
  facilitatorAccessToken: string;
  paymentSource: string;
  plan: CheckoutPlan;
}
