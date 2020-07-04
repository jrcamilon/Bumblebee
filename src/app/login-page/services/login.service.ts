import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public isAuthenticated = new BehaviorSubject<any>(false);
  public user = new BehaviorSubject<any>({name: '', email: ''});

  constructor(public _http: Http, public router: Router) { }

  public login(email: string, password: string): Observable<any> {
    // console.log('loginfunction', email, password);
    const body = {
      email: email,
      pass: password,
    };
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/signin', body, { headers: this.headers }).pipe(
      map((res: Response) => {
          const tmpData = res.json();
          return tmpData;
      })
    )
  //  return this._http.post('/signin', body).pipe(
  //    map((res: Response) => {
  //      const tmpData = res.json();
  //      return tmpData;
  //    })
  //  )
  }

  public logout() {
    this.isAuthenticated.next(false);
    this.user.next({});
    localStorage.removeItem('IAToken');
    localStorage.removeItem('IAUser');
    this.router.navigate(['/login']);

  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('IAToken') && !!localStorage.getItem('IAUser');
  }

  public getToken(): string {
    return localStorage.getItem('IAToken');
  }
}
