export interface Option {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  answerId?: string;
  question: string;
  description?: string;
  type: "single-choice" | "info";
  options?: Option[];
  next?: string | Record<string, string>;
  nextDependencyId?: string;
  nextButton?: string;
  needContentReplacement: boolean;
}
