import { stat, StatBonus } from './stat';

export enum RaceEnum { dwarf, elf, öcü, böcü }

export class CharRace {
    bonusStat: StatBonus[];
    trait: string[];
}
