import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export function capitalizeFirstLetter(sentence: string) {
  const firstLetterCap = sentence.charAt(0).toUpperCase();
  const remainingLetters = sentence.slice(1);

  return firstLetterCap + remainingLetters;
}

export function removeHttpAndWww(str: string): string {
  return str.replace(/^https?:\/\/(www\.)?/, "");
}
