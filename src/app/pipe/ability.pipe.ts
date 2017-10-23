import { Pipe, PipeTransform } from '@angular/core';
import { AbilityScores } from '../model/abilityScore';

@Pipe({ name: 'ability' })
export class AbilityPipe implements PipeTransform {
    transform(value, args: string[]): any {
        switch (value) {
            case AbilityScores.str: return 'Strength';
            case AbilityScores.dex: return 'Dexterity';
            case AbilityScores.con: return 'Constitution';
            case AbilityScores.int: return 'Intelligence';
            case AbilityScores.wis: return 'Wisdom';
            case AbilityScores.cha: return 'Charisma';
        }
    }
}
