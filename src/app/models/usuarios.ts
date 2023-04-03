import { Empleado } from "./empleado";

export class Usuarios {
    constructor(
        public ID_USUARIO?: number,
        public COD_EMPLEADO?: number,
        public ID_ESTADO?: number,
        public CONTRASENA?: string,
        public RECONTRASENA?: string,
        public EMAIL?: string,
        public EMPLEADO: Empleado = new Empleado
    ) { }
}