import { useMemo, useState } from 'react';
import { CharacterPreview } from './CharacterPreview';
import { StepControls } from './StepControls';
import { OptionSelector } from './OptionSelector';
import type { AppearanceOptionKey, AppearanceOptionSet, CharacterState, Faction } from '../data/types';
import { getAppearanceOptions, getClothingOptions, getRandomFromArray, getRandomName } from '../data/factions';

interface CharacterCreatorProps {
  faction: Faction;
  character: CharacterState;
  onChange: (character: CharacterState) => void;
  onBack: () => void;
  appearanceOptions: AppearanceOptionSet;
}

const steps = [
  { id: 'identity', title: 'Имя и происхождение' },
  { id: 'appearance', title: 'Внешность' },
  { id: 'outfit', title: 'Одежда' }
] as const;

type StepId = (typeof steps)[number]['id'];

const appearanceFields: { key: AppearanceOptionKey; label: string }[] = [
  { key: 'hairStyle', label: 'Прическа' },
  { key: 'hairColor', label: 'Цвет волос' },
  { key: 'faceShape', label: 'Форма лица' },
  { key: 'eyeShape', label: 'Форма глаз' },
  { key: 'eyeColor', label: 'Цвет глаз' },
  { key: 'nose', label: 'Нос' },
  { key: 'lips', label: 'Губы' },
  { key: 'accessory', label: 'Особенность' }
];

export const CharacterCreator = ({
  faction,
  character,
  onChange,
  onBack,
  appearanceOptions
}: CharacterCreatorProps) => {
  const [currentStep, setCurrentStep] = useState<StepId>('identity');

  const clothingOptions = useMemo(() => getClothingOptions(faction.id), [faction.id]);

  const resolveAppearanceLabel = (key: AppearanceOptionKey, id: string) => {
    const options = appearanceOptions[key];
    return options.find((option) => option.id === id)?.label ?? 'Не выбрано';
  };

  const resolveClothingLabel = (id: string) => {
    return clothingOptions.find((option) => option.id === id)?.label ?? 'Не выбрано';
  };

  const setCharacter = (partial: Partial<CharacterState>) => {
    onChange({ ...character, ...partial });
  };

  const setAppearanceField = (key: AppearanceOptionKey, value: string) => {
    onChange({
      ...character,
      appearance: {
        ...character.appearance,
        [key]: value
      }
    });
  };

  const handleRandomizeStep = () => {
    switch (currentStep) {
      case 'identity': {
        const gender = character.gender;
        setCharacter({
          name: getRandomName(faction, gender)
        });
        break;
      }
      case 'appearance': {
        const options = getAppearanceOptions(faction.id);
        const updated = { ...character.appearance };
        appearanceFields.forEach(({ key }) => {
          const option = getRandomFromArray(options[key]);
          updated[key] = option.id;
        });
        onChange({ ...character, appearance: updated });
        break;
      }
      case 'outfit': {
        setCharacter({ clothing: getRandomFromArray(clothingOptions).id });
        break;
      }
    }
  };

  const handleRandomizeAll = () => {
    const options = getAppearanceOptions(faction.id);
    const gender = character.gender;
    const randomizedAppearance = { ...character.appearance };
    appearanceFields.forEach(({ key }) => {
      randomizedAppearance[key] = getRandomFromArray(options[key]).id;
    });

    onChange({
      ...character,
      name: getRandomName(faction, gender),
      appearance: randomizedAppearance,
      clothing: getRandomFromArray(clothingOptions).id
    });
  };

  return (
    <div className="creator-layout">
      <div className="creator-column creator-column--form">
        <div className="faction-summary">
          <span className="faction-avatar" aria-hidden>
            {faction.avatarEmoji}
          </span>
          <div>
            <h2>{faction.name}</h2>
            <p className="faction-description">{faction.description}</p>
            <p className="faction-modern">Современные наследники: {faction.modernEquivalent}</p>
          </div>
        </div>

        <StepControls
          steps={steps}
          currentStep={currentStep}
          onChangeStep={(stepId) => setCurrentStep(stepId)}
          onBack={onBack}
          onRandomizeStep={handleRandomizeStep}
          onRandomizeAll={handleRandomizeAll}
        />

        <div className="step-content">
          {currentStep === 'identity' && (
            <section className="form-section">
              <label className="field">
                <span className="field-label">Имя героя</span>
                <div className="field-inline">
                  <input
                    type="text"
                    value={character.name}
                    onChange={(event) => setCharacter({ name: event.target.value })}
                    placeholder="Введите имя"
                  />
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => setCharacter({ name: getRandomName(faction, character.gender) })}
                  >
                    Сгенерировать
                  </button>
                </div>
              </label>

              <div className="field">
                <span className="field-label">Пол</span>
                <div className="toggle-group">
                  <button
                    type="button"
                    className={character.gender === 'male' ? 'toggle active' : 'toggle'}
                    onClick={() => setCharacter({ gender: 'male', name: character.name })}
                  >
                    Мужской
                  </button>
                  <button
                    type="button"
                    className={character.gender === 'female' ? 'toggle active' : 'toggle'}
                    onClick={() => setCharacter({ gender: 'female', name: character.name })}
                  >
                    Женский
                  </button>
                </div>
              </div>
            </section>
          )}

          {currentStep === 'appearance' && (
            <section className="form-section">
              {appearanceFields.map(({ key, label }) => (
                <OptionSelector
                  key={key}
                  label={label}
                  value={character.appearance[key]}
                  options={appearanceOptions[key]}
                  onSelect={(value) => setAppearanceField(key, value)}
                />
              ))}
            </section>
          )}

          {currentStep === 'outfit' && (
            <section className="form-section">
              <OptionSelector
                label="Комплект одежды"
                value={character.clothing}
                options={clothingOptions}
                onSelect={(value) => setCharacter({ clothing: value })}
              />
            </section>
          )}
        </div>
      </div>

      <div className="creator-column creator-column--preview">
        <CharacterPreview
          faction={faction}
          character={character}
          appearanceOptions={appearanceOptions}
          clothingOptions={clothingOptions}
        />
        <div className="summary-card">
          <h3>Хроника героя</h3>
          <ul>
            <li>
              <strong>Имя:</strong> {character.name || 'Не выбрано'}
            </li>
            <li>
              <strong>Пол:</strong> {character.gender === 'male' ? 'Мужской' : 'Женский'}
            </li>
            <li>
              <strong>Одежда:</strong> {resolveClothingLabel(character.clothing)}
            </li>
            {appearanceFields.map(({ key, label }) => (
              <li key={key}>
                <strong>{label}:</strong> {resolveAppearanceLabel(key, character.appearance[key])}
              </li>
            ))}
          </ul>
          <button type="button" className="button button-primary">
            Подтвердить героя
          </button>
        </div>
      </div>
    </div>
  );
};
