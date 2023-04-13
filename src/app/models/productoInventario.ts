export class ProductoInventario {
    constructor(
        public ID_ESTADO ?: number,
        public ID_UNIDAD ?: number,
        public ID_PRODUCTO?: number,
        public DESCRIPCION_PRODUCTO?: string,
        public CANTIDAD_INGRESO?: number,
        public CANTIDAD_SALIDA?: number,   
        public FECHA_SALIDA?:string,
        public FECHA_INGRESO?:string,
        public STOCK_INVENTARIO?: number,
        public Precio?: number
        ) { }
}
