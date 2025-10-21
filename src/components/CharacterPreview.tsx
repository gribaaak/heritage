import { useCallback, useEffect, useMemo, useState } from 'react';
import { CharacterCanvas, type CharacterCanvasLayer } from './CharacterCanvas';
import type {
  AppearanceLayer,
  AppearanceOptionKey,
  AppearanceOptionSet,
  AppearanceVisualOption,
  CharacterState,
  Faction,
  LayerTransform
} from '../data/types';
import type { ChangeEvent, CSSProperties } from 'react';

interface CharacterPreviewProps {
  faction: Faction;
  character: CharacterState;
  appearanceOptions: AppearanceOptionSet;
  clothingOptions: AppearanceVisualOption[];
  onChangeLayerTransform: (layerId: string, transform: LayerTransform) => void;
  onResetLayerTransform: (layerId: string) => void;
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

const baseSilhouetteLayer: AppearanceLayer = {
  optionId: 'base-silhouette',
  assetSrc: '/images/appearance/base-silhouette.svg',
  zIndex: 0,
  transform: { x: 0, y: 0, scale: 1, rotation: 0 }
};

export const CharacterPreview = ({
  faction,
  character,
  appearanceOptions,
  clothingOptions,
  onChangeLayerTransform,
  onResetLayerTransform
}: CharacterPreviewProps) => {
  const accent = getPreviewAccent(faction.id);
  const accentSoft = hexToRgba(accent, 0.18);

  const selectedClothing = clothingOptions.find((option) => option.id === character.clothing) ?? null;
  const clothingLayer: AppearanceLayer | null = selectedClothing
    ? {
        optionId: selectedClothing.id,
        assetSrc: selectedClothing.assetSrc,
        zIndex: selectedClothing.zIndex,
        transform: {
          ...(character.clothingTransform ?? selectedClothing.defaultTransform)
        }
      }
    : null;

  const appearanceLayers = useMemo(() => {
    return (Object.values(character.appearance).filter(Boolean) as AppearanceLayer[]).map((layer) => ({
      ...layer,
      transform: { ...layer.transform }
    }));
  }, [character.appearance]);

  const layerLabels = useMemo(() => {
    const labels = new Map<string, string>();
    (Object.keys(appearanceOptions) as AppearanceOptionKey[]).forEach((key) => {
      appearanceOptions[key].forEach((option) => {
        labels.set(option.id, option.label);
      });
    });
    clothingOptions.forEach((option) => {
      labels.set(option.id, option.label);
    });
    labels.set(baseSilhouetteLayer.optionId, 'Силуэт героя');
    return labels;
  }, [appearanceOptions, clothingOptions]);

  const canvasLayers = useMemo<CharacterCanvasLayer[]>(() => {
    const baseLayer: CharacterCanvasLayer = {
      id: baseSilhouetteLayer.optionId,
      label: layerLabels.get(baseSilhouetteLayer.optionId) ?? 'Силуэт героя',
      assetSrc: baseSilhouetteLayer.assetSrc,
      zIndex: baseSilhouetteLayer.zIndex,
      transform: { ...baseSilhouetteLayer.transform },
      isLocked: true
    };

    const appearanceCanvasLayers: CharacterCanvasLayer[] = appearanceLayers.map((layer) => ({
      id: layer.optionId,
      label: layerLabels.get(layer.optionId) ?? 'Слой персонажа',
      assetSrc: layer.assetSrc,
      zIndex: layer.zIndex,
      transform: { ...layer.transform }
    }));

    const clothingCanvasLayers: CharacterCanvasLayer[] = clothingLayer
      ? [
          {
            id: clothingLayer.optionId,
            label: layerLabels.get(clothingLayer.optionId) ?? 'Комплект одежды',
            assetSrc: clothingLayer.assetSrc,
            zIndex: clothingLayer.zIndex,
            transform: { ...clothingLayer.transform }
          }
        ]
      : [];

    return [baseLayer, ...appearanceCanvasLayers, ...clothingCanvasLayers].sort((a, b) => a.zIndex - b.zIndex);
  }, [appearanceLayers, clothingLayer, layerLabels]);

  const editableLayers = useMemo(() => canvasLayers.filter((layer) => !layer.isLocked), [canvasLayers]);

  const [activeLayerId, setActiveLayerId] = useState<string | null>(() => editableLayers[0]?.id ?? null);

  useEffect(() => {
    if (editableLayers.length === 0) {
      if (activeLayerId !== null) {
        setActiveLayerId(null);
      }
      return;
    }
    if (!activeLayerId || !editableLayers.some((layer) => layer.id === activeLayerId)) {
      setActiveLayerId(editableLayers[0].id);
    }
  }, [activeLayerId, editableLayers]);

  const activeLayer = useMemo(
    () => editableLayers.find((layer) => layer.id === activeLayerId) ?? null,
    [editableLayers, activeLayerId]
  );

  const hasVisualLayers = useMemo(() => canvasLayers.some((layer) => !layer.isLocked), [canvasLayers]);

  const handleSelectLayer = useCallback(
    (layerId: string) => {
      if (editableLayers.some((layer) => layer.id === layerId)) {
        setActiveLayerId(layerId);
      }
    },
    [editableLayers]
  );

  const updateActiveTransform = useCallback(
    (partial: Partial<LayerTransform>) => {
      if (!activeLayer) {
        return;
      }
      const next: LayerTransform = { ...activeLayer.transform, ...partial } as LayerTransform;
      onChangeLayerTransform(activeLayer.id, next);
    },
    [activeLayer, onChangeLayerTransform]
  );

  const handleNumberChange = useCallback(
    (key: keyof LayerTransform) => (event: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(event.target.value);
      if (Number.isNaN(raw)) {
        return;
      }
      const value = key === 'scale' ? Math.min(Math.max(raw, 0.2), 3) : raw;
      updateActiveTransform({ [key]: value } as Partial<LayerTransform>);
    },
    [updateActiveTransform]
  );

  const handleSliderChange = useCallback(
    (key: keyof LayerTransform) => (event: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(event.target.value);
      const value = key === 'scale' ? Math.min(Math.max(raw, 0.2), 3) : raw;
      updateActiveTransform({ [key]: value } as Partial<LayerTransform>);
    },
    [updateActiveTransform]
  );

  const handleResetTransform = useCallback(() => {
    if (activeLayer) {
      onResetLayerTransform(activeLayer.id);
    }
  }, [activeLayer, onResetLayerTransform]);

  const resolvedAppearance = useMemo(() => {
    return appearancePreviewFields.map(({ key, label }) => {
      const layer = character.appearance[key];
      const optionId = layer?.optionId ?? null;
      const option = optionId
        ? appearanceOptions[key].find((candidate) => candidate.id === optionId) ?? null
        : null;
      return {
        key,
        label,
        option
      };
    });
  }, [appearanceOptions, character.appearance]);

  return (
    <div className="preview-card">
      <h3>Предпросмотр</h3>
      <div
        className="preview-figure"
        style={{ '--preview-accent': accent, '--preview-accent-soft': accentSoft } as CSSProperties}
      >
        <div className="preview-canvas" aria-label="Визуальный образ персонажа">
          <CharacterCanvas
            layers={canvasLayers}
            activeLayerId={activeLayerId}
            onSelectLayer={handleSelectLayer}
            onChangeLayerTransform={onChangeLayerTransform}
          />
          {!hasVisualLayers && (
            <div className="preview-placeholder" role="presentation">
              <span>Нет выбранных элементов</span>
            </div>
          )}
        </div>

        <div className="transform-panel">
          <div className="transform-panel__header">
            <span className="transform-panel__title">Настройка слоя</span>
            <span className="transform-panel__subtitle">
              {activeLayer ? activeLayer.label : 'Выберите слой на холсте'}
            </span>
          </div>
          {activeLayer ? (
            <div className="transform-panel__controls">
              <div className="transform-control">
                <label htmlFor={`transform-${activeLayer.id}-x`}>Горизонталь</label>
                <div className="transform-control__inputs">
                  <input
                    id={`transform-${activeLayer.id}-x`}
                    type="range"
                    min={-160}
                    max={160}
                    step={1}
                    value={activeLayer.transform.x}
                    onChange={handleSliderChange('x')}
                  />
                  <input
                    type="number"
                    value={Number(activeLayer.transform.x.toFixed(0))}
                    step={1}
                    onChange={handleNumberChange('x')}
                  />
                </div>
              </div>
              <div className="transform-control">
                <label htmlFor={`transform-${activeLayer.id}-y`}>Вертикаль</label>
                <div className="transform-control__inputs">
                  <input
                    id={`transform-${activeLayer.id}-y`}
                    type="range"
                    min={-160}
                    max={160}
                    step={1}
                    value={activeLayer.transform.y}
                    onChange={handleSliderChange('y')}
                  />
                  <input
                    type="number"
                    value={Number(activeLayer.transform.y.toFixed(0))}
                    step={1}
                    onChange={handleNumberChange('y')}
                  />
                </div>
              </div>
              <div className="transform-control">
                <label htmlFor={`transform-${activeLayer.id}-scale`}>Масштаб</label>
                <div className="transform-control__inputs">
                  <input
                    id={`transform-${activeLayer.id}-scale`}
                    type="range"
                    min={0.4}
                    max={2.5}
                    step={0.01}
                    value={activeLayer.transform.scale}
                    onChange={handleSliderChange('scale')}
                  />
                  <input
                    type="number"
                    value={Number(activeLayer.transform.scale.toFixed(2))}
                    step={0.05}
                    onChange={handleNumberChange('scale')}
                  />
                </div>
              </div>
              <div className="transform-control">
                <label htmlFor={`transform-${activeLayer.id}-rotation`}>Поворот</label>
                <div className="transform-control__inputs">
                  <input
                    id={`transform-${activeLayer.id}-rotation`}
                    type="range"
                    min={-180}
                    max={180}
                    step={1}
                    value={activeLayer.transform.rotation}
                    onChange={handleSliderChange('rotation')}
                  />
                  <div className="transform-control__number">
                    <input
                      type="number"
                      value={Number(activeLayer.transform.rotation.toFixed(0))}
                      step={1}
                      onChange={handleNumberChange('rotation')}
                    />
                    <span className="transform-control__unit">°</span>
                  </div>
                </div>
              </div>
              <div className="transform-panel__actions">
                <button type="button" className="button button-secondary" onClick={handleResetTransform}>
                  Сбросить трансформацию
                </button>
              </div>
            </div>
          ) : (
            <p className="transform-panel__empty">
              Выберите слой на холсте, чтобы изменить позицию, масштаб или поворот.
            </p>
          )}
        </div>
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
