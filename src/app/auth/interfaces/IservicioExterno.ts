export interface IservicioExterno {
    nombre: string;
    filas: Filas;
}
export interface Filas {
    fila: Fila[];
}
export interface Fila {
    columnas: Columnas;
}
export interface Columnas {
    columna: Columna[];
}
export interface Columna {
    campo: string;
    valor: string;
}