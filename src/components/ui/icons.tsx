import { Command, Moon, SunMedium, Github } from "lucide-react";

export type IconKeys = keyof typeof icons;

type IconsType = {
  [key in IconKeys]: React.ElementType;
};

const icons = {
  logo: Command,
  sun: SunMedium,
  moon: Moon,
  github: Github,
};

export const Icons: IconsType = icons;
