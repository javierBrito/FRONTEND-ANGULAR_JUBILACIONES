import { IsgdVwPersonaDTO } from './../interfaces/IsgdVwPersonaDTO';
import { set, get } from 'lodash-es';

export class SgdVwPersonaDTO implements IsgdVwPersonaDTO {
    constructor(data) {
        set(this, 'data', data);
    }

    get cedula(): string {
        return get(this, 'data.cedula');
    }
    get nombre(): string {
        return get(this, 'data.nombre');
    }
    get codPersona(): number {
        return get(this, 'data.codPersona');
    }
    get numRegistroAccion(): string {
        return get(this, 'data.numRegistroAccion');
    }
    get nomCategoria(): string {
        return get(this, 'data.nomCategoria');
    }
    get tipoExperiencia(): string {
        return get(this, 'data.tipoExperiencia');
    }
    get nomRegLab(): string {
        return get(this, 'data.nomRegLab');
    }
    get denoPuesto(): string {
        return get(this, 'data.denoPuesto');
    }
    get tipoAccion(): string {
        return get(this, 'data.tipoAccion');
    }
    get fechInicioAccion(): Date {
        return get(this, 'data.fechInicioAccion');
    }
    get fechFinAccion(): Date {
        return get(this, 'data.fechFinAccion');
    }
    get estado(): string {
        return get(this, 'data.estado');
    }
    get explicacionAccion(): string {
        return get(this, 'data.explicacionAccion');
    }
    get nomInstitucion(): string {
        return get(this, 'data.nomInstitucion');
    }
    get amie(): string {
        return get(this, 'data.amie');
    }
    get nomCircuito(): string {
        return get(this, 'data.nomCircuito');
    }
    get nomDistrito(): string {
        return get(this, 'data.nomDistrito');
    }
    get nomCanton(): string {
        return get(this, 'data.nomCanton');
    }
    get nomParroquia(): string {
        return get(this, 'data.nomParroquia');
    }
    get estadoIE(): string {
        return get(this, 'data.estadoIE');
    }
    get estadoSta(): string {
        return get(this, 'data.estadoSta');
    }
    get codZona(): number {
        return get(this, 'data.codZona');
    }
    get celular(): string {
        return get(this, 'data.celular');
    }
    get correo(): string {
        return get(this, 'data.correo');
    }
    get direccion(): string {
        return get(this, 'data.direccion');
    }
}
