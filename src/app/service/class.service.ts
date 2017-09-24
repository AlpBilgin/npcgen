import { Injectable } from '@angular/core';
import { AbilityScoreBonus, AbilityScores } from '../model/abilityScore';
import { CharClass } from '../model/class';
import { ActionType, Action } from '../model/action';
import { Dice } from '../model/dice';

@Injectable()
export class ClassService {

    // Bütün sınıf tanımlarını saklayacak vektörü tanımla
    classes: CharClass[] = Array<CharClass>();

    constructor() {
        // Elle sınıf tanımla
        const sınıf: CharClass = {
            classHitDie: {
                count: 1,
                face: 8,
            } as Dice,
            className: 'sınıf!',
            classActions: [
                {
                    actionType: ActionType.utility,
                    actionText: 'AKSİYON!',
                } as Action,
                {
                    actionType: ActionType.utility,
                    actionText: 'AKSİYON2!',
                } as Action
            ],
            classStatPriorities: [
                AbilityScores.cha,
                AbilityScores.dex,
                AbilityScores.con,
                AbilityScores.int,
                AbilityScores.wis,
                AbilityScores.str,
            ],

        };
        // Irkı vektöre itele
        this.classes.push(sınıf);
    }

    public getClasses(): CharClass[] {
        return this.classes;
    }
}
