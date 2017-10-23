import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AbilityScoreBonus, AbilityScores } from '../model/abilityScore';
import { CharClass, CharClassSummary } from '../model/class';
import { ActionType, Action } from '../model/action';
import { Dice } from '../model/dice';
import { ActionService } from './action.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Sdaf {

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
                    actionContent: 'öküzlük',
                    actionName: 'AKSİYON!',
                } as Action,
                {
                    actionType: ActionType.utility,
                    actionContent: 'sığırlık',
                    actionName: 'AKSİYON2!',
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

@Injectable()
export class ClassService {
    baseURL = 'http://smubcizgiroman.com/api.php/CLASSES';

    // Bütün ırk tanımlarını saklayacak vektörü tanımla
    class: CharClass;
    classes: CharClassSummary[] = Array<CharClassSummary>();
    classCache: CharClass[] = Array<CharClass>();

    constructor(
        private http: Http,
        private actionService: ActionService
    ) { }

    // HTTP call returns names and primary keys.
    // Response JSON is not an array because first row deletion will cause non-continuous primary keys.
    // Here anon objects are unpacked from response JSON object and pushed into a returned array.
    // For trivial case returned array index and race id will be duplicate, but do not be fooled!
    public getClasses(): CharClassSummary[] {
        // get only name and id columns
        this.http.get(this.baseURL).subscribe(
            (next: Response) => {
                console.log(next.json());
                for (const key in next.json()) {
                    // Iterate list and collect names from object and push into array
                    this.classes.push(next.json()[key]);
                }
                console.log(this.classes);
            },
            err => console.log(err),
            () => console.log('bitti')
        );
        return this.classes;
    }

    // Function caches each fetched race
    public getClass(id: number): Promise<CharClass> {
        // Search for race id in cache array, return if found
        if (this.classCache[id]) {
            return new Promise(
                (resolve, reject) => { resolve(this.classCache[id]); }
            );
        }
        // If race can't be found in cache; download, cache and return
        return this.http.get(this.baseURL + '?' + id).toPromise().then(
            (resp) => {
                console.log(resp.json());
                const raceDB = resp.json();
                const newRace = new CharClass(raceDB);
                this.classCache[id] = newRace;
                return newRace;
            }
        );
    }
}
