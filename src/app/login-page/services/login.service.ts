import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public isAuthenticated = new BehaviorSubject<any>(false);

  constructor(public _http: Http) { }

  public login(email: string, password: string): Observable<any> {
    console.log('loginfunction', email, password);
    const body = {
      email: email,
      pass: password,
    };
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/signin', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }
}
