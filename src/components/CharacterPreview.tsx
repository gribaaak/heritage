import type {
  AppearanceOptionKey,
  AppearanceOptionSet,
  AppearanceVisualOption,
  CharacterState,
  Faction
} from '../data/types';

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

  return (
    <div className="preview-card">
      <h3>Предпросмотр</h3>
      <div className="preview-figure" style={{ borderColor: accent }}>
        <div className="preview-head" style={{ backgroundColor: accent }}>
          {(() => {
            const hair = resolvedAppearance.find((item) => item.key === 'hairStyle')?.option;
            if (!hair) {
              return <span className="preview-hair">—</span>;
            }
            return (
              <>
                <img className="preview-layer" src={hair.layerSrc ?? hair.thumbnailSrc} alt={hair.label} />
                <span className="preview-hair">{hair.label}</span>
              </>
            );
          })()}
        </div>
        <div className="preview-face">
          {resolvedAppearance
            .filter((item) => item.key !== 'hairStyle' && item.key !== 'accessory')
            .map((item) => (
              <span key={item.key}>{item.option?.label ?? '—'}</span>
            ))}
        </div>
        <div className="preview-body">
          {selectedClothing ? (
            <>
              <img className="preview-layer" src={selectedClothing.layerSrc ?? selectedClothing.thumbnailSrc} alt={selectedClothing.label} />
              <span>{selectedClothing.label}</span>
            </>
          ) : (
            <span>—</span>
          )}
        </div>
        <div className="preview-accessory">
          {(() => {
            const accessory = resolvedAppearance.find((item) => item.key === 'accessory')?.option;
            return accessory ? accessory.label : '—';
          })()}
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
