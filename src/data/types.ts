export type Gender = 'male' | 'female';

export interface LayerTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface AppearanceLayer {
  optionId: string;
  assetSrc: string;
  zIndex: number;
  transform: LayerTransform;
}

export interface AppearanceVisualOption {
  id: string;
  label: string;
  thumbnailSrc: string;
  assetSrc: string;
  zIndex: number;
  defaultTransform: LayerTransform;
}

export type AppearanceOptionKey =
  | 'hairStyle'
  | 'hairColor'
  | 'faceShape'
  | 'eyeShape'
  | 'eyeColor'
  | 'nose'
  | 'lips'
  | 'accessory';

export type AppearanceOptionSet = Record<AppearanceOptionKey, AppearanceVisualOption[]>;

export type CharacterAppearance = Record<AppearanceOptionKey, AppearanceLayer | null>;

export interface CharacterState {
  name: string;
  gender: Gender;
  appearance: CharacterAppearance;
  clothing: string;
}

export interface FactionOptionsExtension {
  appearance?: Partial<Record<AppearanceOptionKey, AppearanceVisualOption[]>>;
  clothing?: AppearanceVisualOption[];
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
  baseClothing: AppearanceVisualOption[];
  optionsExtension?: FactionOptionsExtension;
}
