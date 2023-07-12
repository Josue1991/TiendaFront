export class Empleado {
    constructor(
        public ID_EMPLEADO?: number,
        public NOMBRE_EMPLEADO?: string,
        public APELLIDO_EMPLEADO?: string,
        public DNI_EMPLEADO?: number,
        public ARCHIVOS?:string,
        public File?:Blob
    ) { }
}