export class DetalleServicio {
    constructor(        
        public ID_DETALLESERVICIO?: number,
        public ID_SERVICIO?: number,
        public ID_PRODUCTO?: number,
        public CANTIDAD_DETALLE?: number, 
        // DTO
        public seleccionado?: number
    ) { }
}
