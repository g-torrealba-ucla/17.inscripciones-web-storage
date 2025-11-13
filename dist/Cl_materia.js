export default class Cl_mMateria {
  constructor(codigo, nombre) {
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
  get CodigoOk() {
    return this.codigo.length === 4;
  }
  get NombreOk() {
    return this.nombre.length > 5;
  }
  toJSON() {
    return {
      codigo: this.codigo,
      nombre: this.nombre,
    };
  }
}
