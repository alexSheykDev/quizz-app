import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadAnswersFromStorage = (): Record<string, string> => {
  if (typeof window !== "undefined") {
    const savedAnswers = localStorage.getItem("surveyAnswers");
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  }
  return {};
};

interface SurveyState {
  answers: Record<string, string>;
}

const initialState: SurveyState = {
  answers: loadAnswersFromStorage(),
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    saveAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>,
    ) => {
      state.answers[action.payload.questionId] = action.payload.answer;
      localStorage.setItem("surveyAnswers", JSON.stringify(state.answers));
    },
    resetAnswers: (state) => {
      state.answers = {};
      localStorage.removeItem("surveyAnswers");
    },
  },
});

export const { saveAnswer, resetAnswers } = surveySlice.actions;
export default surveySlice.reducer;
