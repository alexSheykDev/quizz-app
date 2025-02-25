import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { resetAnswers } from "@/store/surveySlice";
import { Button } from "@/components/ui/Button";
import surveyConfig from "@/data/surveyConfig.json";
import { replacePlaceholders } from "@/lib/replacePlaceholders";

export default function ResultsPage() {
  const answers = useSelector((state: RootState) => state.survey.answers);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRestart = () => {
    router.push("/questionnaire/select-gender");
    dispatch(resetAnswers());
  };

  return (
    <div className="bg-[#FFF0F0] min-h-screen">
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Your Answers:</h1>
        <ul className="space-y-4">
          {Object.entries(answers).map(([answerId, selectedValue]) => {
            const question = surveyConfig.questions.find(
              (q) => q.answerId === answerId,
            );
            if (!question) return null;

            const modifiedQuestionText = replacePlaceholders(
              question.question,
              answers,
            );

            const selectedOption = question.options?.find(
              (opt) => opt.value === selectedValue,
            );

            return (
              <li key={answerId} className="p-3 bg-white rounded-lg shadow">
                <p className="font-semibold">{modifiedQuestionText}</p>
                <p className="text-blue-600">
                  <strong>Answer:</strong>{" "}
                  {selectedOption?.label || selectedValue}
                </p>
              </li>
            );
          })}
        </ul>
        <Button className="w-full mt-6" onClick={handleRestart}>
          Restart
        </Button>
      </div>
    </div>
  );
}
