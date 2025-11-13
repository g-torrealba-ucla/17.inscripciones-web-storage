import { iEstudiante } from "./Cl_mEstudiante.js";
import { iMateria } from "./Cl_mMateria.js";
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
  }: {
    vista: string;
    opcion?: opcionFicha;
  }): void {
    this.vista.activarVista({ vista, opcion });
  }
}
