export const replacePlaceholders = (
  questionText: string,
  answers: Record<string, string>,
) => {
  return questionText
    .replace("{gender}", answers.gender === "male" ? "Male" : "Female")
    .replace(
      "{who have children (if have children)}",
      answers.isSingleParent === "yes" ? "who have children" : "",
    );
};
