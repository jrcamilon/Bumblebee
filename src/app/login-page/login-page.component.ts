import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(public auth: LoginService, public router: Router) { }

  ngOnInit() {
  }

  onLoginClick() {
    console.log('email, password', this.email , this.password);
    // check that the email is verified
    this.auth.login(this.email, this.password).subscribe(res => {
      if (res.message === 'Auth Success') {

        localStorage.setItem('IAToken', res.token);
        localStorage.setItem('IAUser', JSON.stringify({email: res.email, name: res.name}));

        this.auth.isAuthenticated.next(true);
        this.auth.user.next({email: res.email, name: res.name});

        this.router.navigate(['/sites']);
      } else {
        this.router.navigate(['/login']);
      }
    })
  }

}
