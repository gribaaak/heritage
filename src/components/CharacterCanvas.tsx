import { useCallback, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { LayerTransform } from '../data/types';

export interface CharacterCanvasLayer {
  id: string;
  label: string;
  assetSrc: string;
  zIndex: number;
  transform: LayerTransform;
  isLocked?: boolean;
}

interface CharacterCanvasProps {
  layers: CharacterCanvasLayer[];
  activeLayerId: string | null;
  onSelectLayer?: (layerId: string) => void;
  onChangeLayerTransform?: (layerId: string, transform: LayerTransform) => void;
}

type InteractionMode = 'move' | 'scale' | 'rotate';

interface InteractionState {
  layerId: string;
  mode: InteractionMode;
  pointerStart: { x: number; y: number };
  originTransform: LayerTransform;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const CharacterCanvas = ({
  layers,
  activeLayerId,
  onSelectLayer,
  onChangeLayerTransform
}: CharacterCanvasProps) => {
  const layersRef = useRef(layers);
  const interactionRef = useRef<InteractionState | null>(null);
  const transformCallbackRef = useRef(onChangeLayerTransform);

  layersRef.current = layers;
  transformCallbackRef.current = onChangeLayerTransform;

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const interaction = interactionRef.current;
    const transformCallback = transformCallbackRef.current;
    if (!interaction || !transformCallback) {
      return;
    }
    event.preventDefault();

    const layer = layersRef.current.find((item) => item.id === interaction.layerId);
    if (!layer) {
      return;
    }

    const deltaX = event.clientX - interaction.pointerStart.x;
    const deltaY = event.clientY - interaction.pointerStart.y;
    const origin = interaction.originTransform;

    let nextTransform: LayerTransform = { ...origin };

    switch (interaction.mode) {
      case 'move': {
        nextTransform = {
          ...origin,
          x: origin.x + deltaX,
          y: origin.y + deltaY
        };
        break;
      }
      case 'scale': {
        const scaleDelta = -deltaY * 0.01;
        nextTransform = {
          ...origin,
          scale: clamp(origin.scale + scaleDelta, 0.2, 3)
        };
        break;
      }
      case 'rotate': {
        const rotationDelta = deltaX * 0.6;
        nextTransform = {
          ...origin,
          rotation: origin.rotation + rotationDelta
        };
        break;
      }
    }

    transformCallback(interaction.layerId, nextTransform);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!interactionRef.current) {
      return;
    }
    interactionRef.current = null;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerMove]);

  const startInteraction = useCallback(
    (layerId: string, mode: InteractionMode, event: ReactPointerEvent<Element>) => {
      const transformCallback = transformCallbackRef.current;
      if (!transformCallback) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const layer = layersRef.current.find((item) => item.id === layerId);
      if (!layer) {
        return;
      }

      interactionRef.current = {
        layerId,
        mode,
        pointerStart: { x: event.clientX, y: event.clientY },
        originTransform: { ...layer.transform }
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [handlePointerMove, handlePointerUp]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const handleLayerPointerDown = useCallback(
    (layer: CharacterCanvasLayer, event: ReactPointerEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('.character-canvas__handle')) {
        return;
      }

      onSelectLayer?.(layer.id);

      if (layer.isLocked) {
        return;
      }

      if (!transformCallbackRef.current) {
        return;
      }

      if (event.button !== 0 && event.pointerType !== 'touch') {
        return;
      }

      startInteraction(layer.id, 'move', event);
    },
    [onSelectLayer, startInteraction]
  );

  const handleHandlePointerDown = useCallback(
    (layerId: string, mode: InteractionMode) => (event: ReactPointerEvent<HTMLDivElement>) => {
      onSelectLayer?.(layerId);
      if (!transformCallbackRef.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      startInteraction(layerId, mode, event);
    },
    [onSelectLayer, startInteraction]
  );

  const sortedLayers = useMemo(() => {
    return [...layers].sort((a, b) => a.zIndex - b.zIndex);
  }, [layers]);

  return (
    <div className="character-canvas">
      {sortedLayers.map((layer) => {
        const isActive = layer.id === activeLayerId;
        return (
          <div
            key={layer.id}
            className={classNames('character-canvas__layer', {
              'is-active': isActive,
              'is-locked': layer.isLocked
            })}
            style={{
              zIndex: layer.zIndex,
              transform: `translate(${layer.transform.x}px, ${layer.transform.y}px) scale(${layer.transform.scale}) rotate(${layer.transform.rotation}deg)`
            }}
            onPointerDown={(event) => handleLayerPointerDown(layer, event)}
          >
            <img
              src={layer.assetSrc}
              alt={layer.label}
              className="character-canvas__image"
              draggable={false}
            />
            {isActive && !layer.isLocked && (
              <>
                <div className="character-canvas__outline" aria-hidden />
                <div
                  className="character-canvas__handle character-canvas__handle--rotate"
                  onPointerDown={handleHandlePointerDown(layer.id, 'rotate')}
                  aria-hidden
                />
                <div
                  className="character-canvas__handle character-canvas__handle--scale"
                  onPointerDown={handleHandlePointerDown(layer.id, 'scale')}
                  aria-hidden
                />
                <div
                  className="character-canvas__handle character-canvas__handle--move"
                  onPointerDown={handleHandlePointerDown(layer.id, 'move')}
                  aria-hidden
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
