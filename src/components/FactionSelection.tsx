import type { Faction } from '../data/types';

interface FactionSelectionProps {
  factions: Faction[];
  onSelectFaction: (factionId: string) => void;
}

export const FactionSelection = ({ factions, onSelectFaction }: FactionSelectionProps) => {
  return (
    <section className="faction-selection">
      <h2>Выбор нации</h2>
      <p className="section-description">
        Каждая нация имеет своё наследие, список имён и внешний облик. Выберите тех, чья история
        ближе вашему сердцу.
      </p>
      <div className="faction-grid">
        {factions.map((faction) => (
          <article key={faction.id} className="faction-card">
            <span className="faction-card-avatar" aria-hidden>
              {faction.avatarEmoji}
            </span>
            <h3>{faction.name}</h3>
            <p className="faction-card-description">{faction.description}</p>
            <p className="faction-card-modern">Современность: {faction.modernEquivalent}</p>
            <button type="button" className="button button-primary" onClick={() => onSelectFaction(faction.id)}>
              Выбрать
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};
