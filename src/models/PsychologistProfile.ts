export class PsychologistProfile {
    id?: number;
    name: string;
    description: string;
    timeZone?: string;
    includingQueries: string;
    excludingQueries: string;
    userId?: number;
    isActive?: string;

    constructor(psychologist?: PsychologistProfile) {
        if (psychologist) {
            this.name = psychologist.name;
            this.description = psychologist.description;
            this.includingQueries = psychologist.includingQueries;
            this.excludingQueries = psychologist.excludingQueries;
        }
        else {
            this.name = '';
            this.description = '';
            this.includingQueries = '';
            this.excludingQueries = '';
        }
    }
}