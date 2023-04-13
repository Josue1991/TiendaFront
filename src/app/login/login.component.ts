import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../models/usuarios';
import { NotificationService } from '../alerta/notification.service';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { TokenModel } from '../models/token';
import { UserProfile } from './userProfile';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  closeResult: string = '';
  usuario: Usuarios = new Usuarios;
  login: Usuarios = new Usuarios;
  jwtService: JwtHelperService = new JwtHelperService();
  userProfile: any;

  constructor(private modalService: NgbModal,
    public notificationService: NotificationService,
    private jwtHelper: JwtHelperService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {

  }
  Registrarse(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  Ingresar(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /**
   * Guardar Usuario
   */
  GuardarUsuario() {
    if (this.usuario.CONTRASENA == this.usuario.RECONTRASENA) {
      this.notificationService.showSuccess("Datos Almacenados Correctamente!!", "Usuario Registrado");
      this.loginService.RegistrarEmpleado(this.login).subscribe((data) => {
        if (data) {
          console.log(data)
        }
      });
    }
    else
      this.notificationService.showError("Password No Coinciden !!", "Error Password")
  }
  /**
   * Ingresar al Sistema
   */
  Login() {
    this.loginService.Login(this.login).subscribe((data) => {
      if (data) {
        var token = data as TokenModel;
        localStorage.setItem('tokens', JSON.stringify(data.Token));
        localStorage.setItem('perfil', JSON.stringify(data.Rol));
        this.isUserAuthenticated();
      }
    });
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("tokens");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(["/"]);
      this.modalService.dismissAll();
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      this.notificationService.showError("Credenciales caducadas o incorrectas!", "Error de Ingreso")
      return false;
    }
  }

}
