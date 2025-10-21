import type { Dispatch, SetStateAction } from 'react';

interface Step {
  id: string;
  title: string;
}

interface StepControlsProps {
  steps: readonly Step[];
  currentStep: string;
  onChangeStep: Dispatch<SetStateAction<string>>;
  onBack: () => void;
  onRandomizeStep: () => void;
  onRandomizeAll: () => void;
}

export const StepControls = ({
  steps,
  currentStep,
  onChangeStep,
  onBack,
  onRandomizeAll,
  onRandomizeStep
}: StepControlsProps) => {
  return (
    <div className="step-controls">
      <div className="step-tabs">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            className={currentStep === step.id ? 'step-tab active' : 'step-tab'}
            onClick={() => onChangeStep(step.id)}
          >
            {step.title}
          </button>
        ))}
      </div>
      <div className="step-actions">
        <button type="button" className="button button-ghost" onClick={onBack}>
          ← Выбрать другую нацию
        </button>
        <div className="randomize-group">
          <button type="button" className="button button-secondary" onClick={onRandomizeStep}>
            Случайный шаг
          </button>
          <button type="button" className="button button-secondary" onClick={onRandomizeAll}>
            Случайный герой
          </button>
        </div>
      </div>
    </div>
  );
};
