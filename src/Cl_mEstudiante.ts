import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";

export interface iEstudiante {
  id: number | null;
  creadoEl: string | null;
  alias: string | null;
  cedula: number;
  nombre: string;
  materiasInscritas?: iInscrita[];
}
interface iInscrita {
  codigoMateria: string;
  nota: number | null;
}
export default class Cl_mEstudiante extends Cl_mTablaWeb {
  private _cedula: number = 0;
  private _nombre: string = "";
  private materiasInscritas: iInscrita[] = [];

  constructor({ id, creadoEl, alias, cedula, nombre }: iEstudiante) {
    super({ id, creadoEl, alias });
    this.cedula = cedula;
    this.nombre = nombre;
  }
  set cedula(cedula: number) {
    this._cedula = cedula;
  }
  get cedula(): number {
    return this._cedula;
  }
  set nombre(nombre: string) {
    this._nombre = nombre;
  }
  get nombre(): string {
    return this._nombre;
  }
  get cedulaOk(): boolean {
    return this.cedula > 1000000 && this.cedula < 99999999;
  }
  get nombreOk(): boolean {
    return this.nombre.length > 5;
  }
  get estudianteOk(): string | true {
    if (!this.cedulaOk) return "cedula";
    if (!this.nombreOk) return "nombre";
    return true;
  }
  get cntMaterias(): number {
    return this.materiasInscritas.length;
  }
  addMateria(codigo: string): boolean {
    let encontrada = this.materiasInscritas.find(
      (m) => m.codigoMateria === codigo
    );
    if (encontrada) return false;
    this.materiasInscritas.push({ codigoMateria: codigo, nota: null });
    return true;
  }
  deleteMateria(codigo: string): boolean {
    let indice = this.materiasInscritas.findIndex(
      (m) => m.codigoMateria === codigo
    );
    if (indice === -1) return false;
    this.materiasInscritas.splice(indice, 1);
    return true;
  }
  inscritoEn(codigo: string): boolean {
    return Boolean(
      this.materiasInscritas.find((m) => m.codigoMateria === codigo)
    );
  }
  asignarNota(codigo: string, nota: number): boolean {
    // Verificar si está inscrito
    // Seguro que existe ya que se verificó antes
    if (!this.inscritoEn(codigo)) return false;
    let materia = this.materiasInscritas.find(
      (m) => m.codigoMateria === codigo
    );
    // materia! indica que estamos seguros que no es undefined
    materia!.nota = nota;
    return true;
  }
  toJSON(): iEstudiante {
    // unir los datos de la clase base con los de la clase derivada, usando super.toJSON()
    return {
      ...super.toJSON(),
      cedula: this._cedula,
      nombre: this._nombre,
      materiasInscritas: this.materiasInscritas,
    };
  }
}
