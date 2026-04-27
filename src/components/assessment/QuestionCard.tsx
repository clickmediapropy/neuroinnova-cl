import { Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuestionOption {
  label: string;
  value: string;
  points: number;
}

interface QuestionCardProps {
  question: string;
  description?: string;
  examples?: string[];
  options: QuestionOption[];
  value: string;
  onValueChange: (value: string) => void;
}

const QuestionCard = ({
  question,
  description,
  examples,
  options,
  value,
  onValueChange
}: QuestionCardProps) => {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in-up hover-lift transition-all duration-300">
      <div className="space-y-4">
        {/* Pregunta principal */}
        <h2 className="text-lg sm:text-xl font-semibold flex items-start gap-2 leading-snug">
          <span className="flex-1 min-w-0">{question}</span>
          {(description || examples) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-muted-foreground mt-1 cursor-help flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent className="max-w-md p-4">
                  {description && (
                    <p className="font-medium mb-2">{description}</p>
                  )}
                  {examples && examples.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Ejemplos:</p>
                      <ul className="text-sm space-y-1">
                        {examples.map((example, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h2>

        {/* Descripción visible (opcional) */}
        {description && (
          <p className="text-muted-foreground text-sm italic">
            {description}
          </p>
        )}

        {/* Opciones de respuesta */}
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          className="space-y-3 mt-6"
        >
          {options.map((option) => (
            <Label
              key={option.value}
              htmlFor={`option-${option.value}`}
              className="flex items-center gap-3 p-3 sm:p-3.5 rounded-md border border-transparent hover:border-primary/30 hover:bg-muted/50 active:bg-muted transition-colors cursor-pointer min-h-[48px] font-normal"
            >
              <RadioGroupItem value={option.value} id={`option-${option.value}`} />
              <span className="flex-grow text-sm sm:text-base leading-snug">
                {option.label}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default QuestionCard;