import { useMemo, useState } from 'react';
import { factions, getAppearanceOptions, getInitialAppearance } from './data/factions';
import { CharacterCreator } from './components/CharacterCreator';
import { FactionSelection } from './components/FactionSelection';
import type { CharacterState, Faction } from './data/types';

const createDefaultCharacter = (faction: Faction): CharacterState => ({
  name: '',
  gender: 'male',
  appearance: getInitialAppearance(faction.id),
  clothing: faction.baseClothing[0] ?? 'Базовая одежда'
});

function App() {
  const [selectedFactionId, setSelectedFactionId] = useState<string | null>(null);
  const [character, setCharacter] = useState<CharacterState | null>(null);

  const selectedFaction = useMemo(
    () => factions.find((faction) => faction.id === selectedFactionId) ?? null,
    [selectedFactionId]
  );

  const appearanceOptions = useMemo(() => {
    if (!selectedFaction) {
      return null;
    }
    return getAppearanceOptions(selectedFaction.id);
  }, [selectedFaction]);

  const handleSelectFaction = (factionId: string) => {
    setSelectedFactionId(factionId);
    const faction = factions.find((item) => item.id === factionId);
    if (faction) {
      setCharacter(createDefaultCharacter(faction));
    }
  };

  const handleReset = () => {
    setSelectedFactionId(null);
    setCharacter(null);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Heritage: Создание героя</h1>
        <p className="app-subtitle">
          Выберите свою нацию, создайте уникального героя и приготовьтесь к первой битве.
        </p>
      </header>

      {!selectedFaction && (
        <FactionSelection factions={factions} onSelectFaction={handleSelectFaction} />
      )}

      {selectedFaction && character && appearanceOptions && (
        <CharacterCreator
          key={selectedFaction.id}
          faction={selectedFaction}
          character={character}
          onChange={setCharacter}
          onBack={handleReset}
          appearanceOptions={appearanceOptions}
        />
      )}
    </div>
  );
}

export default App;
