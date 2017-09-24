import { Injectable } from '@angular/core';
import { AbilityScoreBonus, AbilityScores } from '../model/abilityScore';
import { CharRace } from '../model/race';
import { ActionType } from '../model/action';
import { Dice } from '../model/dice';

@Injectable()
export class RaceService {

    // Bütün ırk tanımlarını saklayacak vektörü tanımla
    races: CharRace[] = Array<CharRace>();

    constructor() {
        // Elle ırk tanımla
        const ırk: CharRace = {
            raceName: 'asd',
            traits: ['547637', '3736'],
            action: {
                actionType: ActionType.rolled,
                actionStat: AbilityScores.str,
                actionDice: { count: 1, face: 10 } as Dice,
                actionText: 'vücut vuruşu'
            },
            abilityScoreBonuses: [{ abilityScore: AbilityScores.dex, abilityScoreBonus: 2 } as AbilityScoreBonus],
        };
        // Irkı vektöre itele
        this.races.push(ırk);
    }
    public getRaces(): CharRace[] {
        return this.races;
    }
}
