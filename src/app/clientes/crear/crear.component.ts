import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clientes } from '../../models/clientes';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent implements OnInit {
  
  clienteNuevo: Clientes = new Clientes

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  crear(){
    
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
  }

}
