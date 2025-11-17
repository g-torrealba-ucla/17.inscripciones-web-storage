import Cl_mMateria from "./Cl_mMateria.js";
export default class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    addMateria({ dtMateria, callback, }) {
        this.modelo.addMateria({
            dtMateria,
            callback,
        });
    }
    editMateria({ dtMateria, callback, }) {
        this.modelo.editMateria({
            dtMateria,
            callback,
        });
    }
    deleteMateria({ codigo, callback, }) {
        this.modelo.deleteMateria({
            codigo,
            callback,
        });
    }
    materia(codigo) {
        let materia = this.modelo.materia(codigo);
        if (materia)
            return new Cl_mMateria(materia.toJSON());
        else
            return null;
    }
    get dtMaterias() {
        let dtMaterias = this.modelo.dtMaterias();
        dtMaterias.sort((a, b) => a.codigo.localeCompare(b.codigo));
        return dtMaterias;
    }
    get dtEstudiantes() {
        let dtEstudiantes = this.modelo.dtEstudiantes();
        dtEstudiantes.sort((a, b) => a.cedula - b.cedula);
        return dtEstudiantes;
    }
    activarVista({ vista, opcion, objeto, }) {
        this.vista.activarVista({ vista, opcion, objeto });
    }
}
