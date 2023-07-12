export class DetalleFactura {
    constructor(
        public ID_DETALLE?: number,
        public ID_ESTADO?: number,
        public ID_FACTURA?: number,
        public ID_SERVICIO?: number,
        public PRECIO_TOTAL?: number,
        public CANTIDAD_DETALLE?: number) { }
}
