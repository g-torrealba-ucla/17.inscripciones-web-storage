import { iEstudiante } from "./Cl_mEstudiante.js";
import Cl_mMateria, { iMateria } from "./Cl_mMateria.js";
import Cl_mUcla from "./Cl_mUcla.js";
import Cl_vUcla from "./Cl_vUcla.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class Cl_controlador {
  public modelo: Cl_mUcla;
  public vista: Cl_vUcla;
  constructor(modelo: Cl_mUcla, vista: Cl_vUcla) {
    this.modelo = modelo;
    this.vista = vista;
  }
  addMateria({
    dtMateria,
    callback,
  }: {
    dtMateria: iMateria;
    callback: (error: string | false) => void;
  }): void {
    this.modelo.addMateria({
      dtMateria,
      callback,
    });
  }
  editMateria({
    dtMateria,
    callback,
  }: {
    dtMateria: iMateria;
    callback: (error: string | boolean) => void;
  }): void {
    this.modelo.editMateria({
      dtMateria,
      callback,
    });
  }
  deleteMateria({
    codigo,
    callback,
  }: {
    codigo: string;
    callback: (error: string | boolean) => void;
  }): void {
    this.modelo.deleteMateria({
      codigo,
      callback,
    });
  }
  materia(codigo: string): Cl_mMateria | null {
    let materia = this.modelo.materia(codigo);
    if (materia) return new Cl_mMateria(materia.toJSON());
    else return null;
  }
  get dtMaterias(): iMateria[] {
    let dtMaterias = this.modelo.dtMaterias();
    dtMaterias.sort((a, b) => a.codigo.localeCompare(b.codigo));
    return dtMaterias;
  }
  get dtEstudiantes(): iEstudiante[] {
    let dtEstudiantes = this.modelo.dtEstudiantes();
    dtEstudiantes.sort((a, b) => a.cedula - b.cedula);
    return dtEstudiantes;
  }
  activarVista({
    vista,
    opcion,
    objeto,
  }: {
    vista: string;
    opcion?: opcionFicha;
    objeto?: Cl_mMateria;
  }): void {
    this.vista.activarVista({ vista, opcion, objeto });
  }
}
