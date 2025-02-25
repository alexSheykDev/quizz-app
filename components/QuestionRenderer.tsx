import React from "react";
import { Button } from "@/components/ui/Button";
import { Option, Question } from "@/types/Question";
import DynamicClientComponent from "@/components/DynamicClientComponent";

interface QuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

/* IF THERE A */
export default function QuestionRenderer({
  question,
  onAnswer,
}: QuestionProps) {
  return (
    <div className="px-4 max-w-[330px] mx-auto">
      {/* To Prevent hydration errors */}
      {question.needContentReplacement ? (
        <DynamicClientComponent>
          <h1 className="text-2xl text-[#333333] font-bold mb-6">
            {question.question}
          </h1>
        </DynamicClientComponent>
      ) : (
        <h1 className="text-2xl text-[#333333] font-bold mb-6">
          {question.question}
        </h1>
      )}

      {question?.description && (
        <p className="text-xl text-[#333333] font-bold mb-6">
          {question.description}
        </p>
      )}

      {question.type === "single-choice" &&
        question?.options?.map((option: Option) => (
          <Button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full mb-4"
          >
            {option.label}
          </Button>
        ))}

      {question.type === "info" && (
        <Button onClick={() => onAnswer("continue")} className="w-full">
          {question.nextButton || "Next"}
        </Button>
      )}
    </div>
  );
}
