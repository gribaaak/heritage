import type {
  AppearanceOptionKey,
  AppearanceOptionSet,
  AppearanceVisualOption,
  CharacterState,
  Faction
} from '../data/types';
import type { CSSProperties } from 'react';

interface CharacterPreviewProps {
  faction: Faction;
  character: CharacterState;
  appearanceOptions: AppearanceOptionSet;
  clothingOptions: AppearanceVisualOption[];
}

const getPreviewAccent = (factionId: string) => {
  switch (factionId) {
    case 'varyagi':
      return '#274060';
    case 'prusy':
      return '#704214';
    case 'zemaites':
      return '#3a6b35';
    case 'kurshi':
      return '#1f5f8b';
    case 'latgaly':
      return '#9c661f';
    case 'yotvingi':
      return '#5b2c6f';
    case 'polyane':
      return '#7c4d1f';
    case 'lyakhi':
      return '#b22222';
    case 'greki':
      return '#2f4f90';
    case 'danube_bulgars':
      return '#556b2f';
    case 'khazary':
      return '#c49b3a';
    case 'volga_bulgars':
      return '#8b4513';
    case 'pechenegi':
      return '#a0522d';
    case 'torki':
      return '#8b0000';
    case 'kumany':
      return '#daa520';
    case 'chud':
      return '#2e8b57';
    case 'merya':
      return '#4682b4';
    case 'ves':
      return '#87ceeb';
    case 'muroma':
      return '#6b8e23';
    case 'perm':
      return '#556270';
    case 'komi':
      return '#1c7c7d';
    case 'karely':
      return '#2a4d69';
    case 'iudei':
      return '#4b0082';
    case 'siveriane':
      return '#8f6f2f';
    case 'radimichi':
      return '#c65d7b';
    default:
      return '#3f3f3f';
  }
};

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  const isShort = normalized.length === 3;
  const expanded = isShort
    ? normalized
        .split('')
        .map((char) => char + char)
        .join('')
    : normalized;
  const numeric = parseInt(expanded, 16);
  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const appearancePreviewFields: { key: AppearanceOptionKey; label: string }[] = [
  { key: 'hairStyle', label: 'Прическа' },
  { key: 'hairColor', label: 'Цвет волос' },
  { key: 'faceShape', label: 'Форма лица' },
  { key: 'eyeShape', label: 'Форма глаз' },
  { key: 'eyeColor', label: 'Цвет глаз' },
  { key: 'nose', label: 'Нос' },
  { key: 'lips', label: 'Губы' },
  { key: 'accessory', label: 'Особенность' }
];

export const CharacterPreview = ({
  faction,
  character,
  appearanceOptions,
  clothingOptions
}: CharacterPreviewProps) => {
  const accent = getPreviewAccent(faction.id);
  const accentSoft = hexToRgba(accent, 0.18);

  const findAppearanceOption = (key: AppearanceOptionKey, id: string) => {
    return appearanceOptions[key].find((option) => option.id === id) ?? null;
  };

  const selectedClothing = clothingOptions.find((option) => option.id === character.clothing) ?? null;

  const resolvedAppearance = appearancePreviewFields.map(({ key, label }) => {
    const option = findAppearanceOption(key, character.appearance[key]);
    return {
      key,
      label,
      option
    };
  });

  const hairOption =
    resolvedAppearance.find((item) => item.key === 'hairStyle')?.option ??
    resolvedAppearance.find((item) => item.key === 'hairColor')?.option ??
    null;

  const eyesOption =
    resolvedAppearance.find((item) => item.key === 'eyeShape')?.option ??
    resolvedAppearance.find((item) => item.key === 'eyeColor')?.option ??
    null;

  const accessoryOption = resolvedAppearance.find((item) => item.key === 'accessory')?.option ?? null;

  const getLayerSrc = (option: AppearanceVisualOption | null) => option?.layerSrc ?? option?.thumbnailSrc ?? null;

  const previewLayers = [
    {
      id: 'base',
      label: 'Силуэт',
      src: '/images/appearance/base-silhouette.svg'
    },
    hairOption && {
      id: 'hair',
      label: hairOption.label,
      src: getLayerSrc(hairOption)
    },
    eyesOption && {
      id: 'eyes',
      label: eyesOption.label,
      src: getLayerSrc(eyesOption)
    },
    accessoryOption && {
      id: 'accessory',
      label: accessoryOption.label,
      src: getLayerSrc(accessoryOption)
    },
    selectedClothing && {
      id: 'clothing',
      label: selectedClothing.label,
      src: getLayerSrc(selectedClothing)
    }
  ].filter(Boolean) as { id: string; label: string; src: string | null }[];

  const hasVisualLayers = previewLayers.some((layer) => Boolean(layer.src));

  return (
    <div className="preview-card">
      <h3>Предпросмотр</h3>
      <div
        className="preview-figure"
        style={{ '--preview-accent': accent, '--preview-accent-soft': accentSoft } as CSSProperties}
      >
        <div className="preview-canvas" aria-label="Визуальный образ персонажа">
          {previewLayers.map((layer, index) =>
            layer.src ? (
              <img
                key={layer.id}
                className="preview-layer"
                data-layer={layer.id}
                src={layer.src}
                alt={layer.label}
                style={{ zIndex: index + 1 }}
              />
            ) : null
          )}
          {!hasVisualLayers && (
            <div className="preview-placeholder" role="presentation">
              <span>Нет выбранных элементов</span>
            </div>
          )}
        </div>
        <div className="preview-details">
          <dl className="preview-details-list">
            {resolvedAppearance.map(({ key, label, option }) => (
              <div key={key} className="preview-detail">
                <dt>{label}</dt>
                <dd>{option?.label ?? '—'}</dd>
              </div>
            ))}
            <div className="preview-detail">
              <dt>Одежда</dt>
              <dd>{selectedClothing?.label ?? '—'}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="preview-meta">
        <p>
          <strong>Нация:</strong> {faction.name}
        </p>
        <p>
          <strong>Имя:</strong> {character.name || '—'}
        </p>
      </div>
    </div>
  );
};
