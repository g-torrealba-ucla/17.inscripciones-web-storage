import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mEstudiante from "./Cl_mEstudiante.js";
import Cl_mMateria from "./Cl_mMateria.js";
export default class Cl_mUcla {
    constructor() {
        this.tbMateria = "demo17.materia";
        this.tbEstudiante = "demo17.estudiante";
        this.db = new Cl_dcytDb({ aliasCuenta: "PROFESOR" });
        this.materias = [];
        this.estudiantes = [];
    }
    addMateria({ dtMateria, callback, }) {
        let encontrada = this.materias.find((m) => m.codigo === dtMateria.codigo);
        if (encontrada)
            callback(`La materia con código ${dtMateria.codigo} ya existe.`);
        let materia = new Cl_mMateria(dtMateria);
        if (!materia.materiaOk)
            callback(materia.materiaOk);
        this.db.addRecord({
            tabla: this.tbMateria,
            registroAlias: dtMateria.codigo,
            object: materia.toJSON(),
            callback: ({ id, objects: materias, error }) => {
                if (!error)
                    this.llenarMaterias(materias);
                callback === null || callback === void 0 ? void 0 : callback(error);
            },
        });
    }
    deleteMateria({ codigo, callback, }) {
        let indice = this.materias.findIndex((m) => m.codigo === codigo);
        if (indice === -1)
            callback(`La materia con código ${codigo} no existe.`);
        for (let estudiante of this.estudiantes)
            if (estudiante.inscritoEn(codigo))
                callback(`No se puede eliminar "${codigo}" (inscrita por "${estudiante.cedula}")`);
        this.materias.splice(indice, 1);
        callback(false);
    }
    addEstudiante({ dtEstudiante, callback, }) {
        let existe = this.estudiantes.find((e) => e.cedula === dtEstudiante.cedula);
        if (existe)
            callback(`El estudiante con cedula ${dtEstudiante.cedula} ya existe.`);
        let estudiante = new Cl_mEstudiante(dtEstudiante);
        if (!estudiante.estudianteOk)
            callback(estudiante.estudianteOk);
        this.estudiantes.push(estudiante);
        callback(false);
    }
    deleteEstudiante({ cedula, callback, }) {
        let indice = this.estudiantes.findIndex((e) => e.cedula === cedula);
        if (indice === -1)
            callback(`El estudiante con cedula ${cedula} no existe.`);
        if (this.estudiantes[indice].cntMaterias > 0)
            callback(`No se puede eliminar "${cedula}" (inscrito en materias)`);
        this.estudiantes.splice(indice, 1);
        callback(false);
    }
    dtMaterias() {
        return this.materias.map((m) => m.toJSON());
    }
    dtEstudiantes() {
        return this.estudiantes.map((e) => e.toJSON());
    }
    cargar(callback) {
        // Obtener la información desde la Web Storage
        this.db.listRecords({
            tabla: this.tbMateria,
            callback: ({ materias, error }) => {
                if (error)
                    callback(`Error cargando materias: ${error}`);
                else
                    this.db.listRecords({
                        tabla: this.tbEstudiante,
                        callback: ({ estudiantes, error }) => {
                            if (error)
                                callback(`Error cargando estudiantes: ${error}`);
                            else {
                                this.llenarMaterias(materias !== null && materias !== void 0 ? materias : []);
                                this.llenarEstudiantes(estudiantes !== null && estudiantes !== void 0 ? estudiantes : []);
                                callback(false);
                            }
                        },
                    });
            },
        });
    }
    llenarMaterias(materias) {
        this.materias = [];
        materias.forEach((materia) => this.materias.push(new Cl_mMateria(materia)));
    }
    llenarEstudiantes(estudiantes) {
        this.estudiantes = [];
        estudiantes.forEach((estudiante) => this.estudiantes.push(new Cl_mEstudiante(estudiante)));
    }
}
