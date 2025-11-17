import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mEstudiante, { iEstudiante } from "./Cl_mEstudiante.js";
import Cl_mMateria, { iMateria } from "./Cl_mMateria.js";
interface iResultMaterias {
  objects: [iMateria] | null;
  error: string | false;
}
interface iResultEstudiantes {
  estudiantes: [iEstudiante] | null;
  error: string | false;
}

export default class Cl_mUcla {
  private db: Cl_dcytDb;
  private materias: Cl_mMateria[];
  private estudiantes: Cl_mEstudiante[];
  readonly tbMateria: string = "demo17.materia";
  readonly tbEstudiante: string = "demo17.estudiante";
  constructor() {
    this.db = new Cl_dcytDb({ aliasCuenta: "PROFESOR" });
    this.materias = [];
    this.estudiantes = [];
  }

  addMateria({
    dtMateria,
    callback,
  }: {
    dtMateria: iMateria;
    callback: (error: string | false) => void;
  }): void {
    let materia = new Cl_mMateria(dtMateria);
    // Validar que no exista otra materia con el mismo código
    if (this.materias.find((m) => m.codigo === dtMateria.codigo))
      callback(`La materia con código ${dtMateria.codigo} ya existe.`);
    // Validar que la materia sea correcta
    else if (!materia.materiaOk) callback(materia.materiaOk);
    // Guardar la materia
    else
      this.db.addRecord({
        tabla: this.tbMateria,
        registroAlias: dtMateria.codigo,
        object: materia,
        callback: ({ id, objects: materias, error }) => {
          if (!error) this.llenarMaterias(materias);
          callback?.(error);
        },
      });
  }
  editMateria({
    dtMateria,
    callback,
  }: {
    dtMateria: iMateria;
    callback: (error: string | boolean) => void;
  }): void {
    let materia = new Cl_mMateria(dtMateria);
    // Validar que la materia sea correcta
    if (!materia.materiaOk) callback(materia.materiaOk);
    else
      this.db.editRecord({
        tabla: this.tbMateria,
        object: materia,
        callback: ({ objects: materias, error }) => {
          if (!error) this.llenarMaterias(materias);
          callback?.(error);
        },
      });
  }
  deleteMateria({
    codigo,
    callback,
  }: {
    codigo: string;
    callback: (error: string | boolean) => void;
  }): void {
    let indice = this.materias.findIndex((m) => m.codigo === codigo);
    // Verificar si la materia existe
    if (indice === -1) callback(`La materia con código ${codigo} no existe.`);
    else {
      // Verificar si están inscritos estudiantes en la materia
      let algunInscrito = false;
      for (let estudiante of this.estudiantes)
        if (estudiante.inscritoEn(codigo)) {
          algunInscrito = true;
          break;
        }
      if (algunInscrito)
        callback(
          `No se puede eliminar "${codigo}" (inscrita por un estudiante)`
        );
      // Eliminar la materia
      else {
        this.db.deleteRecord({
          tabla: this.tbMateria,
          object: this.materias[indice],
          callback: ({ objects: materias, error }) => {
            if (!error) this.llenarMaterias(materias);
            callback?.(error);
          },
        });
      }
    }
  }
  addEstudiante({
    dtEstudiante,
    callback,
  }: {
    dtEstudiante: iEstudiante;
    callback: (error: string | boolean) => void;
  }): void {
    let existe = this.estudiantes.find((e) => e.cedula === dtEstudiante.cedula);
    if (existe)
      callback(`El estudiante con cedula ${dtEstudiante.cedula} ya existe.`);
    let estudiante = new Cl_mEstudiante(dtEstudiante);
    if (!estudiante.estudianteOk) callback(estudiante.estudianteOk);
    this.estudiantes.push(estudiante);
    callback(false);
  }
  deleteEstudiante({
    cedula,
    callback,
  }: {
    cedula: number;
    callback: (error: string | boolean) => void;
  }): void {
    let indice = this.estudiantes.findIndex((e) => e.cedula === cedula);
    if (indice === -1)
      callback(`El estudiante con cedula ${cedula} no existe.`);
    if (this.estudiantes[indice].cntMaterias > 0)
      callback(`No se puede eliminar "${cedula}" (inscrito en materias)`);
    this.estudiantes.splice(indice, 1);
    callback(false);
  }
  dtMaterias(): iMateria[] {
    return this.materias.map((m) => m.toJSON());
  }
  dtEstudiantes(): iEstudiante[] {
    return this.estudiantes.map((e) => e.toJSON());
  }
  materia(codigo: string): Cl_mMateria | null {
    let materia = this.materias.find((m) => m.codigo === codigo);
    return materia ? materia : null;
  }
  cargar(callback: (error: string | false) => void): void {
    // Obtener la información desde la Web Storage
    this.db.listRecords({
      tabla: this.tbMateria,
      callback: ({ objects, error }: iResultMaterias) => {
        if (error) callback(`Error cargando materias: ${error}`);
        else
          this.db.listRecords({
            tabla: this.tbEstudiante,
            callback: ({ estudiantes, error }: iResultEstudiantes) => {
              if (error) callback(`Error cargando estudiantes: ${error}`);
              else {
                this.llenarMaterias(objects ?? []);
                this.llenarEstudiantes(estudiantes ?? []);
                callback(false);
              }
            },
          });
      },
    });
  }
  llenarMaterias(materias: iMateria[]): void {
    this.materias = [];
    materias.forEach((materia: iMateria) =>
      this.materias.push(new Cl_mMateria(materia))
    );
  }
  llenarEstudiantes(estudiantes: iEstudiante[]): void {
    this.estudiantes = [];
    estudiantes.forEach((estudiante: iEstudiante) =>
      this.estudiantes.push(new Cl_mEstudiante(estudiante))
    );
  }
}
