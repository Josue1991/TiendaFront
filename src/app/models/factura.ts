import { DetalleFactura } from "./detalle-factura";

export class Factura {
    constructor(
        public ID_FACTURA?: number,
        public ID_CLIENTE?: number,
        public ID_ESTADO?: number,
        public ID_USUARIO?: number,
        public FECHA_FACTURA?: string,
        public SUB_TOTAL?: number,
        public TOTAL?: number,
        public SUB_TOTAL_IVA?: number,
        public DETALLE_FACTURA?: DetalleFactura[]
    ) { }
}
