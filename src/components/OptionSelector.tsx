import type { AppearanceVisualOption } from '../data/types';

interface OptionSelectorProps {
  label: string;
  value: string;
  options: AppearanceVisualOption[];
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
            className={option.id === value ? 'option-card active' : 'option-card'}
            onClick={() => onSelect(option.id)}
          >
            <img className="option-card-image" src={option.thumbnailSrc} alt={option.label} />
            <span className="option-card-label">{option.label}</span>
          </button>
        ))}
      </div>
    </label>
  );
};
