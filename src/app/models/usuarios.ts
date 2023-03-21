export class Usuarios {
    constructor(
        public ID_USUARIO?: number,
        public CEDULA?: string,
        public NOMBRE?: string,
        public EMAIL?: string,
        public CONTRASENA?: string,
        public RECONTRASENA?: string,
        public ESTADO_USUARIO?: number) { }
}