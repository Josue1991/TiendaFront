import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../models/usuarios';
import { NotificationService } from '../alerta/notification.service';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  closeResult: string = '';
  usuario: Usuarios = new Usuarios;
  login: Usuarios = new Usuarios;

  constructor(private modalService: NgbModal, 
    public notificationService: NotificationService,
    private jwtHelper : JwtHelperService,
    private loginService: LoginService) { }

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
    if(this.usuario.CONTRASENA == this.usuario.RECONTRASENA)
    this.notificationService.showSuccess("Datos Almacenados Correctamente!!", "Usuario Registrado")
    else
    this.notificationService.showError("Password No Coinciden !!", "Error Password")

  }
  /**
   * Ingresar al Sistema
   */
  Login() {
    debugger;
    this.loginService.Login(this.login).subscribe((data) => {
      if (data) {
        console.log(data)
      }
    });
    this.loginService.Login(this.login);
   }

   isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}
