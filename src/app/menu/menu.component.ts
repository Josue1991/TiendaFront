import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  perfil: string | undefined;
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }
  isUserAuthenticated() {
    const token = localStorage.getItem("tokens");
    const timeExpire = this.jwtHelper.isTokenExpired(token);
    if (token && !timeExpire) {
      return true;
    }
    else {
      return false;
      this.router.navigate(["/login"]);
    }
  }
  obtenerPerfil() {
    switch (localStorage.getItem("perfil")) {
      case "1":
        this.perfil = "Administrador"
        break;
      case "2":
        this.perfil = "Vendedor"
        break;
      case "3":
        this.perfil = "Cliente"
        break;
      default:
      // code block
    }
  }

  logOut() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("perfil");
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }
}
