import { ImvCeduladoMeducacion } from '../interfaces/ImvCeduladoMeducacion';
import { set, get } from 'lodash-es';
export class MvCeduladoMeducacion implements ImvCeduladoMeducacion {
    constructor(data) {
        set(this, 'data', data);
    }
    get cedula(): number {
        return get(this, 'data.cedula');
    }
    get cedulaMadre(): number {
        return get(this, 'data.cedulaMadre');
    }
    get cedulaPadre(): number {
        return get(this, 'data.cedulaPadre');
    }
    get codCondicionCedulado(): number {
        return get(this, 'data.codCondicionCedulado');
    }
    get codDomicilio(): number {
        return get(this, 'data.codDomicilio');
    }
    get codEstadoCivil(): number {
        return get(this, 'data.codEstadoCivil');
    }
    get codInstruccion(): number {
        return get(this, 'data.codInstruccion');
    }
    get codLugarMatrimonio(): number {
        return get(this, 'data.codLugarMatrimonio');
    }
    get codLugarNacimiento(): number {
        return get(this, 'data.codLugarNacimiento');
    }
    get codNacionalidad(): number {
        return get(this, 'data.codNacionalidad');
    }
    get codProfesion(): string {
        return get(this, 'data.codProfesion');
    }
    get codSexo(): number {
        return get(this, 'data.codSexo');
    }
    get fechaExpedicionCed(): Date {
        return get(this, 'data.fechaExpedicionCed');
    }
    get fechaFallecimiento(): Date {
        return get(this, 'data.fechaFallecimiento');
    }
    get fechaMatrimonio(): Date {
        return get(this, 'data.fechaMatrimonio');
    }
    get fechaNacimiento(): Date {
        return get(this, 'data.fechaNacimiento');
    }
    get nombreCalle(): string {
        return get(this, 'data.nombreCalle');
    }
    get nombreConyuge(): string {
        return get(this, 'data.nombreConyuge');
    }
    get nombreMadre(): string {
        return get(this, 'data.nombreMadre');
    }
    get nombrePadre(): string {
        return get(this, 'data.nombrePadre');
    }
    get nombres(): string {
        return get(this, 'data.nombres');
    }
    get numeroCasa(): string {
        return get(this, 'data.numeroCasa');
    }
}
