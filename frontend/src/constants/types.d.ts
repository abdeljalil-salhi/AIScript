// Dependencies
import { FC } from "react";

export interface Navigation {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean;
}

export interface OAuthProvider {
  id: string;
  title: string;
  href: string;
  icon: FC<{ className?: string }>;
}
