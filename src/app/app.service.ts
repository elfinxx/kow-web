import {Injectable} from '@angular/core';
import {Player} from "./Player";
import {Http, Response}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: InternalStateType = {};

  constructor(private http: Http) {
  }

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }

  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }

  public getPlayers(): Observable<Player[]> {
    // return this.http.get("http://ec2-52-78-218-164.ap-northeast-2.compute.amazonaws.com:5000/api/users")
    return this.http.get("http://localhost:5000/api/users")
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
