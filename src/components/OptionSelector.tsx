export type OptionSelectorVisual =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'swatch'; color: string; label?: string };

export interface OptionSelectorOption {
  id: string;
  label: string;
  visual: OptionSelectorVisual;
}

interface OptionSelectorProps {
  label: string;
  value: string;
  options: OptionSelectorOption[];
  onSelect: (value: string) => void;
}

export const OptionSelector = ({ label, value, options, onSelect }: OptionSelectorProps) => {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <div className="option-grid">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={option.id === value ? 'option-card option-card--active' : 'option-card'}
            onClick={() => onSelect(option.id)}
            onKeyDown={(event) => {
              if (event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault();
                onSelect(option.id);
              }
            }}
            aria-pressed={option.id === value}
          >
            <span className="option-card-media">
              {option.visual.type === 'image' ? (
                <img src={option.visual.src} alt={option.visual.alt ?? option.label} />
              ) : (
                <span
                  className="option-card-swatch"
                  role="img"
                  style={{ backgroundColor: option.visual.color }}
                  aria-label={option.visual.label ?? option.label}
                />
              )}
            </span>
            <span className="option-card-label">{option.label}</span>
          </button>
        ))}
      </div>
    </label>
  );
};
