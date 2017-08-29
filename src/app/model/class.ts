import { stat } from './stat';

export enum CharClassEnum { kaslı, fırlama, şerefsiz }

export class CharClass {
    className: string;
    abilitiyPriorities: stat[];
}
