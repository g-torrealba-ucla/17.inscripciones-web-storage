import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mMateria extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, codigo, nombre }) {
        super({ id, creadoEl, alias });
        this._codigo = "";
        this._nombre = "";
        this.codigo = codigo;
        this.nombre = nombre;
    }
    set codigo(codigo) {
        this._codigo = codigo.toUpperCase().trim();
    }
    get codigo() {
        return this._codigo;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    get codigoOk() {
        return this.codigo.length === 4;
    }
    get nombreOk() {
        return this.nombre.length > 5;
    }
    get materiaOk() {
        if (!this.codigoOk)
            return "codigo";
        if (!this.nombreOk)
            return "nombre";
        return true;
    }
    toJSON() {
        // unir los datos de la clase base con los de la clase derivada, usando super.toJSON()
        return Object.assign(Object.assign({}, super.toJSON()), { codigo: this._codigo, nombre: this._nombre });
    }
}
