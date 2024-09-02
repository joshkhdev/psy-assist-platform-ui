import { SOURCE_PATH } from './TempConfig';

// Page refs
export const HOME_REF = '/';
export const CREATE_QUESTIONNAIRE_REF = 'questionnaire/create';
export const CREATE_QUE_SUCCESS_REF = 'questionnaire/create/success';
export const PSYCHOLOGIST_CATALOG_REF = 'psychologists';
export const QUESTIONNAIRE_LIST_REF = 'questionnairelist';
export const QUESTIONNAIRE_VIEW_REF = 'questionnairelist/:id';
export const SIGN_IN_REF = 'signin';
export const SIGN_UP_REF = "signup";
export const FEEDBACK_LIST_REF = "feedbacklist";

// Request refs
export const POST_QUESTIONNAIRE_REF = `${SOURCE_PATH}/questionnaires`;
export const GET_PSYCHOLOGISTS_REF = `${SOURCE_PATH}/psychologistprofiles`;
export const GET_QUESTIONNAIRES_REF = `${SOURCE_PATH}/questionnaires`;
export const GET_QUESTIONNAIRESID_REF = `${SOURCE_PATH}/questionnaires/:id`;
export const GET_FEEDBACKS_REF = `${SOURCE_PATH}/feedbacks`;