export interface Questionnaire {
    telegram: string;
    email: string;
    phone: string;

    name: string;
    pronouns: string;
    age?: number;
    timeZone: string;
    neuroDifferences: string;
    mentalSpecifics: string;
    psyWishes: string;
    psyRequest: string;
    therapyExperience: string;
    isForPay: boolean;
}