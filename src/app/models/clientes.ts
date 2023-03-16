export class Clientes {
    constructor(
        public ID_CLIENTE?: number,
        public ID_FORMAPAGO?: number,
        public CEDULA?: string,
        public NOMBRE?: string,
        public APELLIDO?: string,
        public DIRECCION?: string,
        public TELEFONO?: number,
        public EMAIL?: string,
        public ESTADO_CLIENTE?: number) { }
}
