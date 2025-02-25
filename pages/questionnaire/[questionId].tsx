import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "@/store/surveySlice";
import { RootState } from "@/store";
import QuestionRenderer from "@/components/QuestionRenderer";
import surveyConfig from "@/data/surveyConfig.json";
import { replacePlaceholders } from "@/lib/replacePlaceholders";
import QuestionLayout from "@/components/layout/QuestionLayout";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: surveyConfig.questions.map(({ id }) => ({
      params: { questionId: id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const question =
    surveyConfig.questions.find(({ id }) => id === params?.questionId) || null;
  return { props: { question } };
};

export default function QuestionnairePage({
  question,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.survey.answers);

  if (!question) {
    return <p className="text-center text-red-500">Question not found</p>;
  }

  // Dynamically modify question text based on previous answers
  if (question.needContentReplacement) {
    const modifiedQuestionText = replacePlaceholders(
      question.question,
      answers,
    );
    question = { ...question, question: modifiedQuestionText };
  }

  const handleAnswer = (answer: string) => {
    if (question.answerId) {
      dispatch(saveAnswer({ questionId: question.answerId, answer }));
    }

    // Determine next question dynamically
    const nextQuestionId =
      question.nextDependencyId &&
      question.next &&
      typeof question.next === "object"
        ? question.next[
            question.nextDependencyId === question.answerId
              ? answer
              : answers[question.nextDependencyId]
          ]
        : question.next;

    router.push(
      nextQuestionId ? `/questionnaire/${nextQuestionId}` : "/results",
    );
  };

  return (
    <QuestionLayout>
      <QuestionRenderer question={question} onAnswer={handleAnswer} />
    </QuestionLayout>
  );
}
