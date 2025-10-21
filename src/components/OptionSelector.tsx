interface OptionSelectorProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

export const OptionSelector = ({ label, value, options, onSelect }: OptionSelectorProps) => {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <div className="option-grid">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={option === value ? 'option-card active' : 'option-card'}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </label>
  );
};
