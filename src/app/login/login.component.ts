import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../models/usuarios';
import { NotificationService } from '../alerta/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  closeResult: string = '';
  usuario: Usuarios = new Usuarios;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  constructor(private modalService: NgbModal, public notificationService: NotificationService) { }

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
    this.notificationService.showSuccess("Datos Almacenados Correctamente!!", "Usuario Registrado")
  }
  /**
   * Ingresar al Sistema
   */
  Login() {
    this.notificationService.showInfo("Usuario y/o contaseña no se encuentran!!","Error de Ingreso")
  }

}
