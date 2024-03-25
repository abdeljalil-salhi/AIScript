// Assets
import { Apple } from "@/assets/svg/Apple";
import { Google } from "@/assets/svg/Google";

// Interfaces
import { OAuthProvider } from "./types";

export const OAuthProviders: OAuthProvider[] = [
  {
    id: "0",
    title: "Google",
    href: "#",
    icon: Google,
  },
  {
    id: "1",
    title: "Apple",
    href: "#",
    icon: Apple,
  },
];
