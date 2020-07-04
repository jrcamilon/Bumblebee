import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public router: Router) { }

  handleError(error: HttpErrorResponse) {
    console.log('An Error Occurred!', error);
    return throwError(error)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('IAToken');
    console.log('intercept', req);
    const httpRequest = new HttpRequest(<any>req.method, environment.API.domain + ':' + environment.API.port + req.url, req.body);
    req = Object.assign(req, httpRequest);

    const tokenizeReq = req.clone({
      setHeaders: {
        'Authorization': 'Brearer ' + token,
        'Content-Type' : 'application/json'
      },
      // withCredentials: true
    })

    // console.log(tokenizeReq);
    return next.handle(tokenizeReq).pipe(
      // tap(response => console.log(response)),
      catchError(this.handleError)
    );
  }
}
