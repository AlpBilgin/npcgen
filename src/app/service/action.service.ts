import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActionType, Action } from '../model/action';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActionService {
    baseURL = 'http://smubcizgiroman.com/api.php/ACTIONS';

    constructor(
        private http: Http
    ) { }

    public getAction(actionID: number): Promise<Action> {
        // get only name column
        return this.http.get(this.baseURL + '?filter=ID,eq,' + actionID).toPromise().then(
            (next: Response) => {
                console.log(next);
                return new Action(next.json().ACTIONS.records[0]);
            },
            (err) => {
                console.log(err);
                return err;
            }
        );
    }
}
