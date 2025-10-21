interface Step<T extends string = string> {
  id: T;
  title: string;
}

interface StepControlsProps<T extends string> {
  steps: readonly Step<T>[];
  currentStep: T;
  onChangeStep: (stepId: T) => void;
  onBack: () => void;
  onRandomizeStep: () => void;
  onRandomizeAll: () => void;
}

export const StepControls = <T extends string>({
  steps,
  currentStep,
  onChangeStep,
  onBack,
  onRandomizeAll,
  onRandomizeStep
}: StepControlsProps<T>) => {
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
