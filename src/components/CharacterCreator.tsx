import { useMemo, useState } from 'react';
import { CharacterPreview } from './CharacterPreview';
import { StepControls } from './StepControls';
import { OptionSelector } from './OptionSelector';
import type { OptionSelectorGroup, OptionSelectorOption } from './OptionSelector';
import type {
  AppearanceLayer,
  AppearanceOptionKey,
  AppearanceOptionSet,
  CharacterState,
  Faction,
  LayerTransform
} from '../data/types';
import { createAppearanceLayer, getAppearanceOptions, getClothingOptions, getRandomFromArray, getRandomName } from '../data/factions';

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

const swatchColorsByAppearanceKey: Partial<Record<AppearanceOptionKey, Record<string, string>>> = {
  hairColor: {
    Светлые: '#f3e9c6',
    Русые: '#d7b98a',
    Темные: '#5c4431',
    Медные: '#c46b3a',
    Чёрные: '#1f1c1a',
    Пшеничные: '#f2dd93',
    Пепельные: '#c8c5b9',
    Рыжие: '#d1532f'
  },
  eyeColor: {
    Серые: '#b7c0c8',
    Карие: '#5c3b1d',
    Синие: '#3d6bb0',
    Зелёные: '#2f8a62',
    Ореховые: '#6f4f28'
  }
};

const createSelectorOptions = (
  key: AppearanceOptionKey,
  options: AppearanceOptionSet[AppearanceOptionKey]
): OptionSelectorOption[] => {
  return options.map((option) => {
    const swatchColor = swatchColorsByAppearanceKey[key]?.[option.label];
    const visual: OptionSelectorOption['visual'] = swatchColor
      ? { type: 'swatch', color: swatchColor, label: option.label }
      : { type: 'image', src: option.thumbnailSrc, alt: option.label };

    return {
      id: option.id,
      label: option.label,
      visual
    };
  });
};

const createOptionGroups = (
  key: AppearanceOptionKey,
  options: AppearanceOptionSet[AppearanceOptionKey]
): OptionSelectorGroup[] => {
  return [
    {
      id: key,
      options: createSelectorOptions(key, options)
    }
  ];
};

export const CharacterCreator = ({
  faction,
  character,
  onChange,
  onBack,
  appearanceOptions
}: CharacterCreatorProps) => {
  const [currentStep, setCurrentStep] = useState<StepId>('identity');

  const clothingOptions = useMemo(() => getClothingOptions(faction.id), [faction.id]);

  const appearanceSelectorOptions = useMemo(() => {
    const mapped = {} as Record<AppearanceOptionKey, OptionSelectorGroup[]>;
    (Object.keys(appearanceOptions) as AppearanceOptionKey[]).forEach((key) => {
      mapped[key] = createOptionGroups(key, appearanceOptions[key]);
    });
    return mapped;
  }, [appearanceOptions]);

  const clothingSelectorGroups = useMemo<OptionSelectorGroup[]>(() => {
    return [
      {
        id: 'clothing',
        options: clothingOptions.map((option) => ({
          id: option.id,
          label: option.label,
          visual: { type: 'image', src: option.thumbnailSrc, alt: option.label }
        }))
      }
    ];
  }, [clothingOptions]);

  const resolveAppearanceLabel = (key: AppearanceOptionKey, layer: CharacterState['appearance'][AppearanceOptionKey]) => {
    const options = appearanceOptions[key];
    const optionId = layer?.optionId;
    if (!optionId) {
      return 'Не выбрано';
    }
    return options.find((option) => option.id === optionId)?.label ?? 'Не выбрано';
  };

  const resolveClothingLabel = (id: string) => {
    return clothingOptions.find((option) => option.id === id)?.label ?? 'Не выбрано';
  };

  const setCharacter = (partial: Partial<CharacterState>) => {
    onChange({ ...character, ...partial });
  };

  const setAppearanceField = (key: AppearanceOptionKey, value: string) => {
    const option = appearanceOptions[key].find((item) => item.id === value) ?? null;
    onChange({
      ...character,
      appearance: {
        ...character.appearance,
        [key]: option ? createAppearanceLayer(option) : null
      }
    });
  };

  const findAppearanceEntryByLayerId = (
    layerId: string
  ): [AppearanceOptionKey, AppearanceLayer] | null => {
    const entries = Object.entries(character.appearance) as [
      AppearanceOptionKey,
      AppearanceLayer | null
    ][];
    for (const [appearanceKey, layer] of entries) {
      if (layer && layer.optionId === layerId) {
        return [appearanceKey, layer];
      }
    }
    return null;
  };

  const handleUpdateLayerTransform = (layerId: string, transform: LayerTransform) => {
    const appearanceEntry = findAppearanceEntryByLayerId(layerId);
    if (appearanceEntry) {
      const [appearanceKey, layer] = appearanceEntry;
      onChange({
        ...character,
        appearance: {
          ...character.appearance,
          [appearanceKey]: {
            ...layer,
            transform: { ...transform }
          }
        }
      });
      return;
    }

    if (character.clothing === layerId) {
      onChange({
        ...character,
        clothingTransform: { ...transform }
      });
    }
  };

  const handleResetLayerTransform = (layerId: string) => {
    const appearanceEntry = findAppearanceEntryByLayerId(layerId);
    if (appearanceEntry) {
      const [appearanceKey, layer] = appearanceEntry;
      const option = appearanceOptions[appearanceKey].find((item) => item.id === layerId);
      if (!option) {
        return;
      }
      onChange({
        ...character,
        appearance: {
          ...character.appearance,
          [appearanceKey]: {
            ...layer,
            transform: { ...option.defaultTransform }
          }
        }
      });
      return;
    }

    if (character.clothing === layerId) {
      const option = clothingOptions.find((item) => item.id === layerId);
      if (!option) {
        return;
      }
      onChange({
        ...character,
        clothingTransform: { ...option.defaultTransform }
      });
    }
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
          const pool = options[key];
          if (pool.length === 0) {
            updated[key] = null;
            return;
          }
          const option = getRandomFromArray(pool);
          updated[key] = createAppearanceLayer(option);
        });
        onChange({ ...character, appearance: updated });
        break;
      }
      case 'outfit': {
        if (clothingOptions.length === 0) {
          break;
        }
        const randomClothing = getRandomFromArray(clothingOptions);
        setCharacter({
          clothing: randomClothing.id,
          clothingTransform: { ...randomClothing.defaultTransform }
        });
        break;
      }
    }
  };

  const handleRandomizeAll = () => {
    const options = getAppearanceOptions(faction.id);
    const gender = character.gender;
    const randomizedAppearance = { ...character.appearance };
    appearanceFields.forEach(({ key }) => {
      const pool = options[key];
      randomizedAppearance[key] = pool.length > 0 ? createAppearanceLayer(getRandomFromArray(pool)) : null;
    });

    const randomClothingOption = clothingOptions.length > 0 ? getRandomFromArray(clothingOptions) : null;

    onChange({
      ...character,
      name: getRandomName(faction, gender),
      appearance: randomizedAppearance,
      clothing: randomClothingOption?.id ?? character.clothing,
      clothingTransform: randomClothingOption
        ? { ...randomClothingOption.defaultTransform }
        : character.clothingTransform
    });
  };

  const handleSelectClothing = (value: string) => {
    const option = clothingOptions.find((item) => item.id === value) ?? null;
    setCharacter({
      clothing: value,
      clothingTransform: option ? { ...option.defaultTransform } : undefined
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
                  value={character.appearance[key]?.optionId ?? ''}
                  groups={appearanceSelectorOptions[key]}
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
                groups={clothingSelectorGroups}
                onSelect={handleSelectClothing}
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
          onChangeLayerTransform={handleUpdateLayerTransform}
          onResetLayerTransform={handleResetLayerTransform}
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
