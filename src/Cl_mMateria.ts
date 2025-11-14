import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";

export interface iMateria {
  id: number | null;
  creadoEl: string | null;
  alias: string | null;
  codigo: string;
  nombre: string;
}
export default class Cl_mMateria extends Cl_mTablaWeb {
  private _codigo: string = "";
  private _nombre: string = "";

  constructor(
    { id, creadoEl, alias, codigo, nombre }: iMateria = {
      id: null,
      creadoEl: null,
      alias: null,
      codigo: "",
      nombre: "",
    }
  ) {
    super({ id, creadoEl, alias });
    this.codigo = codigo;
    this.nombre = nombre;
  }
  set codigo(codigo: string) {
    this._codigo = codigo.toUpperCase().trim();
  }
  get codigo(): string {
    return this._codigo;
  }
  set nombre(nombre: string) {
    this._nombre = nombre;
  }
  get nombre(): string {
    return this._nombre;
  }
  get codigoOk(): boolean {
    return this.codigo.length === 4;
  }
  get nombreOk(): boolean {
    return this.nombre.length > 5;
  }
  get materiaOk(): string | true {
    if (!this.codigoOk) return "codigo";
    if (!this.nombreOk) return "nombre";
    return true;
  }
  toJSON(): iMateria {
    // unir los datos de la clase base con los de la clase derivada, usando super.toJSON()
    return {
      ...super.toJSON(),
      codigo: this._codigo,
      nombre: this._nombre,
    };
  }
}
