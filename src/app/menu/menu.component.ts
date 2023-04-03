import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../app.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(tokenGetter())) {
      return true;
    }
    else {
      return false;
      this.router.navigate(["/login"]);
    }
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
  }
}
