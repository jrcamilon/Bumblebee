import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(public auth: LoginService) { }

  ngOnInit() {
  }

  onLoginClick() {
    console.log('email, password', this.email , this.password);
    // check that the email is verified
    this.auth.login(this.email, this.password).subscribe(res => {
      // console.log(res);
      if (res.message === 'Auth Success') {
        console.log('AUTH SUCCESS');
        this.auth.isAuthenticated.next(true);
      }
    })
  }

}
