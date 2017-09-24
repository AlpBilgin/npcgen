import { CR } from './crs';
export enum Size { Tiny, Small, Medium, Large, Huge, Gargantuan, }

export enum Alignment {
    lawfulGood, neutralGood, chaoticGood, lawfulNeutral, neutral,
    chaoticNeutral, lawfulEvil, neutralEvil, chaoticEvil,
}

// Compiled JSON
export class Character {
    name: string;
    size: Size;
    type: string;
    alignment: Alignment;
    // AC
    // HP
    // Speed[]
    //
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    strengthBonus: number;
    dexterityBonus: number;
    constitutionBonus: number;
    intelligenceBonus: number;
    wisdomBonus: number;
    charismaBonus: number;
    proficiencyBonus: number;
    // saveProficiencies: any[]; // abilities that get prof bonus on save rolls
    // skillProficiencies: any[]; // skills that get prof bonus on rolls
    // athletics: number;
    // acrobatics: number;
    // sleighOfHand: number;
    // stealth: number;
    // arcana: number;
    // history: number;
    // investigation: number;
    // nature: number;
    // religion: number;
    // animalHandling: number;
    // insight: number;
    // medicine: number;
    // perception: number;
    // survival: number;
    // deception: number;
    // intimidation: number;
    // performance: number;
    // persuasion: number;
    // senses: string[]; //passive perception?
    // Languages: string[];
    CR: number; // xp?
    traits: any[];
    actions: any[];
    legendaryActions: any[]; // Must be set, can be empty array
}
