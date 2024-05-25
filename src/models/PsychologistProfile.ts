export class PsychologistProfile {
    id: number | undefined;
    name: string;
    description: string;
    timeZone: string | undefined;
    requestsInclude: string;
    requestsExclude: string;
    userId: number | undefined;
    isActive: string | undefined;

    constructor(psychologist?: PsychologistProfile) {
        if (psychologist) {
            this.name = psychologist.name;
            this.description = psychologist.description;
            this.requestsInclude = psychologist.requestsInclude;
            this.requestsExclude = psychologist.requestsExclude;
        }
        else {
            this.name = "";
            this.description = "";
            this.requestsInclude = "";
            this.requestsExclude = "";
        }
    }
}