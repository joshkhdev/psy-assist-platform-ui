interface Contact {
    id: number;
    telegram: string;
    email: string;
    phone: string;
}

export interface QuestionnaireResponse {
    id: number;
    name: string;
    pronouns: string;
    age: number;
    timeZone: string;
    neuroDifferences: string;
    mentalSpecifics: string;
    psyWishes: string;
    psyQuery: string;
    therapyExperience: string;
    isForPay: boolean;
    contact: Contact;
}