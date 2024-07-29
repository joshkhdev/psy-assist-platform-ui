import { PsychologistProfile } from './PsychologistProfile';

export class PsychologistProfileCard extends PsychologistProfile {
    image: string;

    constructor(psychologist?: PsychologistProfile, image?: string) {
        super(psychologist);
        
        this.image = image ?? ''; 
    }
}