// Assets
import { XTwitter } from "@/assets/svg/XTwitter";
import { Google } from "@/assets/svg/Google";
// Interfaces
import { OAuthProvider } from "./types";
// Providers
import { BASE_URL } from "@/providers";

export const OAuthProviders: OAuthProvider[] = [
  {
    id: "0",
    title: "Google",
    href: `${BASE_URL}/auth/google`,
    icon: Google,
  },
  {
    id: "1",
    title: "X",
    href: `${BASE_URL}/auth/twitter`,
    icon: XTwitter,
  },
];
