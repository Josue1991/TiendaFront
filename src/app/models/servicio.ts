import { DetalleServicio } from "./detalle-servicio";

export class Servicio {
    constructor(
        public ID_SERVICIO?: number,
        public DESCRIPCION_SERVICIO?: string,
        public PRECIO_SERVICIO?: number,
        public DETALLESERVICIO?: DetalleServicio[]) { }
}
