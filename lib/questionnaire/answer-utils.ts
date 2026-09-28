import { AnswerValue, PhotoAnswer, Question } from "@/types/questionnaire";

export function isPhotoAnswer(value: AnswerValue | undefined): value is PhotoAnswer {
  return !!value && typeof value === "object" && !Array.isArray(value) && "kind" in value && value.kind === "photo" && "url" in value;
}

export function isAnswerComplete(question: Question, value: AnswerValue | undefined) {
  if (question.type === "three_words") return Array.isArray(value) && value.length === 3;
  if (question.type === "city_map" || question.type === "multiple_choice") return Array.isArray(value) && value.length > 0;
  if (question.type === "drink_builder") return !!value && typeof value === "object" && !Array.isArray(value) && "drink" in value && !!value.drink;
  if (question.type === "photo") return isPhotoAnswer(value);
  return typeof value === "string" && value.trim().length > 0;
}

export function answersMatch(left: AnswerValue | undefined, right: AnswerValue | undefined) {
  if (Array.isArray(left) && Array.isArray(right)) return left.length === right.length && left.every(value => right.includes(value));
  if (typeof left === "string" && typeof right === "string") return left.trim().toLocaleLowerCase() === right.trim().toLocaleLowerCase();
  return JSON.stringify(left) === JSON.stringify(right);
}
