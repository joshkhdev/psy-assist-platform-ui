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
    psyQuery: string;
    therapyExperience: string;
    isForPay: boolean;
}