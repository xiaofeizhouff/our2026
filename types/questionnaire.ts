export type RelationshipMode = "couple" | "self" | "friend" | "family";
export type QuestionType = "city_map" | "drink_builder" | "three_words" | "perspective_choice" | "text" | "single_choice" | "multiple_choice";
export type ParticipantRole = "creator" | "partner";
export interface Participant { id: ParticipantRole; name: string; role: ParticipantRole; }
export interface BasicInfo { creatorName: string; metDate: string; relationshipDate?: string; }
export interface Question { id: string; type: QuestionType; creatorPrompt: string; partnerPrompt: string; helper?: string; options?: string[]; config?: Record<string, unknown>; }
export type AnswerValue = string | string[] | { drink: string; temperature: "iced" | "hot" };
export interface Answers { creator: Record<string, AnswerValue>; partner: Record<string, AnswerValue>; }
export type AppStep = "home" | "info" | "questions";
export interface Questionnaire { id: string; mode: RelationshipMode; title: string; creator: Participant; partner: Participant; questions: Question[]; createdAt: string; }
export interface AppData { step: AppStep; activeRole: ParticipantRole; basicInfo: BasicInfo; answers: Answers; }
export interface SharedQuestionnaire { id: string; mode: RelationshipMode; relationshipDate: string; creatorName: string; partnerName: string | null; creatorCompleted: boolean; partnerCompleted: boolean; createdAt: string; updatedAt: string; inviteToken?: string; }
export interface AccessTokens { questionnaireId: string; creatorToken?: string; inviteToken?: string; }
export interface ReportData { questionnaire: SharedQuestionnaire; answers: Answers; }
