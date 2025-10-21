import classNames from 'classnames';

export type OptionSelectorVisual =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'swatch'; color: string; label?: string };

export interface OptionSelectorOption {
  id: string;
  label: string;
  visual: OptionSelectorVisual;
  description?: string;
}

export interface OptionSelectorGroup {
  id: string;
  title?: string;
  options: OptionSelectorOption[];
}

interface OptionSelectorProps {
  label: string;
  value: string;
  groups: OptionSelectorGroup[];
  onSelect: (value: string) => void;
}

export const OptionSelector = ({ label, value, groups, onSelect }: OptionSelectorProps) => {
  return (
    <fieldset className="field">
      <legend className="field-label">{label}</legend>
      <div className="option-grid">
        {groups.map((group) => (
          <div key={group.id} className="option-group">
            {group.title && <span className="option-group-title">{group.title}</span>}
            <div className="option-group-grid">
              {group.options.map((option) => {
                const isActive = option.id === value;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={classNames('option-card', { 'option-card--active': isActive })}
                    onClick={() => onSelect(option.id)}
                    onKeyDown={(event) => {
                      if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
                        event.preventDefault();
                        onSelect(option.id);
                      }
                    }}
                    aria-pressed={isActive}
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
                    {option.description && <span className="option-card-description">{option.description}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
