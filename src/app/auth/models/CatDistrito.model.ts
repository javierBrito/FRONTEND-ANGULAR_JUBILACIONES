import { set, get } from 'lodash-es';
import { IcatDistrito } from '../interfaces/IcatDistrito';

export class CatDistrito implements IcatDistrito {
    constructor(data) {
        set(this, 'data', data);
    }
    get disCodigo(): number {
        return get(this, 'data.disCodigo');
    }
    get disDescripcion(): string {
        return get(this, 'data.disDescripcion');
    }
    get disEstado(): number {
        return get(this, 'data.disEstado');
    }
    get disFechaCreacion(): Date {
        return get(this, 'data.disFechaCreacion');
    }
    get disCodAd(): string {
        return get(this, 'data.disCodAd');
    }
    get zonCodigo(): number {
        return get(this, 'data.zonCodigo');
    }
}
