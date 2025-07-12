
import { Slider } from "@/components/ui/slider";

interface SliderQuestionProps {
  sliderConfig: {
    min: number;
    max: number;
    step: number;
    minLabel: string;
    maxLabel: string;
  };
  selectedOption: string | number | string[] | number[];
  onSliderChange: (value: number[]) => void;
}

export function SliderQuestion({
  sliderConfig,
  selectedOption,
  onSliderChange,
}: SliderQuestionProps) {
  return (
    <div className="space-y-6 py-4">
      <Slider
        defaultValue={[
          typeof selectedOption === "number"
            ? selectedOption
            : Math.round((sliderConfig.min + sliderConfig.max) / 2),
        ]}
        max={sliderConfig.max}
        min={sliderConfig.min}
        step={sliderConfig.step}
        onValueChange={onSliderChange}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground pt-2">
        <span>{sliderConfig.minLabel}</span>
        <span>{sliderConfig.maxLabel}</span>
      </div>
    </div>
  );
}
