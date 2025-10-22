import { useMemo, useState } from 'react';
import { factions, getAppearanceOptions, getClothingOptions, getInitialAppearance } from './data/factions';
import { CharacterCreator } from './components/CharacterCreator';
import { FactionSelection } from './components/FactionSelection';
import type { CharacterState, Faction } from './data/types';

const createDefaultCharacter = (faction: Faction): CharacterState => {
  const clothingOptions = getClothingOptions(faction.id);
  const firstClothing = clothingOptions[0] ?? null;

  return {
    name: '',
    gender: 'male',
    appearance: getInitialAppearance(faction.id),
    clothing: firstClothing?.id ?? '',
    clothingTransform: firstClothing ? { ...firstClothing.defaultTransform } : undefined
  };
};

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
        <img
          src="/images/design/Heritage-title.png"
          alt="Heritage"
          className="app-header-logo"
        />
        <h1>Создайте легенду своего народа</h1>
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
