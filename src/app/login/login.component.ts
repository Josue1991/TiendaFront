import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../models/usuarios';
import { NotificationService } from '../alerta/notification.service';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { TokenModel } from '../models/token';
import { HttpEventType } from '@angular/common/http';
import { IProgressStatus, ProgressStatusEnum } from '../barra-progreso/barra-progreso';
import { FileToUpload } from '../models/FileToUpload';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @Output() public uploadStatus: EventEmitter<IProgressStatus>;
  @ViewChild('inputFile') inputFile!: ElementRef;
  closeResult: string = '';
  usuario: Usuarios = new Usuarios;
  login: Usuarios = new Usuarios;
  jwtService: JwtHelperService = new JwtHelperService();
  userProfile: any;
  theFile: any = null;
  messages: string[] = [];

  constructor(private modalService: NgbModal,
    public notificationService: NotificationService,
    private jwtHelper: JwtHelperService,
    private loginService: LoginService,
    private router: Router) {
    this.uploadStatus = new EventEmitter<IProgressStatus>();
  }

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
      console.log(this.usuario)
      this.loginService.RegistrarEmpleado(this.usuario).subscribe((data) => {
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

  onFileChange(event: any) {
    const MAX_SIZE: number = 1048576;
    this.theFile = null;
    if (event.target.files && event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        this.theFile = event.target.files[0];
      }
      else {
        // Display error message
        this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
      }
    }
  }
  private readAndUploadFile(theFile: any) {
    let file = new FileToUpload();
    this.usuario.EMPLEADO.ARCHIVOS = theFile.name;

    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;

    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();

    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result?.toString();

      // POST to server
      this.loginService.uploadFile(file).subscribe(resp => {
        this.messages.push("Upload complete");
      });
    }

    // Read the file
    reader.readAsDataURL(theFile);
  }
  uploadFile(): void {
    this.readAndUploadFile(this.theFile);
  }
}
