import type { CharacterState, Faction } from '../data/types';

interface CharacterPreviewProps {
  faction: Faction;
  character: CharacterState;
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
    default:
      return '#3f3f3f';
  }
};

export const CharacterPreview = ({ faction, character }: CharacterPreviewProps) => {
  const accent = getPreviewAccent(faction.id);

  return (
    <div className="preview-card">
      <h3>Предпросмотр</h3>
      <div className="preview-figure" style={{ borderColor: accent }}>
        <div className="preview-head" style={{ backgroundColor: accent }}>
          <span className="preview-hair">{character.appearance.hairStyle}</span>
        </div>
        <div className="preview-face">
          <span>{character.appearance.faceShape}</span>
          <span>{character.appearance.eyeShape}</span>
          <span>{character.appearance.eyeColor}</span>
          <span>{character.appearance.nose}</span>
          <span>{character.appearance.lips}</span>
        </div>
        <div className="preview-body">
          <span>{character.clothing}</span>
        </div>
        <div className="preview-accessory">{character.appearance.accessory}</div>
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
