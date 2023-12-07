import { Isgd_jub_tipo_jubilacion } from './Isgd_jub_tipo_jubilacion';
export interface Isgd_jub_tipo_discapacidad {
    tipdisCodigo: number,
    tipdisNombre: String,
    tipdisEstado: number,
    fkTipjubCod: Isgd_jub_tipo_jubilacion
}
