/**
 * Se trata de una pequeña aplicación que controla inscripciones de materias a estudiantes
 * Tenemos una tabla de materias, con codigo y nombre de materia
 * Tenemos una tabla de estudiantes, con cedula y nombre
 *
 * Se omiten reglas de validación para enfocar el uso de WebStorage con 2 tablas relacionadas
 *
 * La APP permite:
 * - Registrar / eliminar materias
 * - Registrar / eliminar estudiantes
 * - Inscribir estudiantes en materias
 * - Validar que no se elimine un registro que esté siendo referenciado (materia o estudiante)
 * - Incluye algunos reportes: materias del estudiante, estudiantes inscritos en una materia
 * - Todo usando WebStorage
 */

import Cl_controlador from "./Cl_controlador.js";
import Cl_mUcla from "./Cl_mUcla.js";
import Cl_vUcla from "./Cl_vUcla.js";

export default class Cl_index {
  constructor() {
    let modelo = new Cl_mUcla();
    modelo.cargar((error: string | false) => {
      if (error) alert(error);
      if (error) throw new Error(error);
      let vista = new Cl_vUcla();
      let controlador = new Cl_controlador(modelo, vista);
      vista.controlador = controlador;
      vista.refresh();
    });
  }
}
