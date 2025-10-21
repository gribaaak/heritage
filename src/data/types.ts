export type Gender = 'male' | 'female';

export interface CharacterAppearance {
  hairStyle: string;
  hairColor: string;
  faceShape: string;
  eyeShape: string;
  eyeColor: string;
  nose: string;
  lips: string;
  accessory: string;
}

export interface CharacterState {
  name: string;
  gender: Gender;
  appearance: CharacterAppearance;
  clothing: string;
}

export type AppearanceOptionKey = keyof CharacterAppearance;

export type AppearanceOptionSet = Record<AppearanceOptionKey, string[]>;

export interface FactionOptionsExtension {
  appearance?: Partial<Record<AppearanceOptionKey, string[]>>;
  clothing?: string[];
}

export interface Faction {
  id: string;
  name: string;
  description: string;
  modernEquivalent: string;
  avatarEmoji: string;
  portraitSrc: string;
  traits: string[];
  maleNames: string[];
  femaleNames: string[];
  baseClothing: string[];
  optionsExtension?: FactionOptionsExtension;
}
