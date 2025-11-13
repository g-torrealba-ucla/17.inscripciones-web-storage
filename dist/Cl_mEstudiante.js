import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mEstudiante extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, cedula, nombre }) {
        super({ id, creadoEl, alias });
        this._cedula = 0;
        this._nombre = "";
        this.materiasInscritas = [];
        this.cedula = cedula;
        this.nombre = nombre;
    }
    set cedula(cedula) {
        this._cedula = cedula;
    }
    get cedula() {
        return this._cedula;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    get cedulaOk() {
        return this.cedula > 1000000 && this.cedula < 99999999;
    }
    get nombreOk() {
        return this.nombre.length > 5;
    }
    get estudianteOk() {
        if (!this.cedulaOk)
            return "cedula";
        if (!this.nombreOk)
            return "nombre";
        return true;
    }
    get cntMaterias() {
        return this.materiasInscritas.length;
    }
    addMateria(codigo) {
        let encontrada = this.materiasInscritas.find((m) => m.codigoMateria === codigo);
        if (encontrada)
            return false;
        this.materiasInscritas.push({ codigoMateria: codigo, nota: null });
        return true;
    }
    deleteMateria(codigo) {
        let indice = this.materiasInscritas.findIndex((m) => m.codigoMateria === codigo);
        if (indice === -1)
            return false;
        this.materiasInscritas.splice(indice, 1);
        return true;
    }
    inscritoEn(codigo) {
        return Boolean(this.materiasInscritas.find((m) => m.codigoMateria === codigo));
    }
    asignarNota(codigo, nota) {
        // Verificar si está inscrito
        // Seguro que existe ya que se verificó antes
        if (!this.inscritoEn(codigo))
            return false;
        let materia = this.materiasInscritas.find((m) => m.codigoMateria === codigo);
        // materia! indica que estamos seguros que no es undefined
        materia.nota = nota;
        return true;
    }
    toJSON() {
        // unir los datos de la clase base con los de la clase derivada, usando super.toJSON()
        return Object.assign(Object.assign({}, super.toJSON()), { cedula: this._cedula, nombre: this._nombre, materiasInscritas: this.materiasInscritas });
    }
}
