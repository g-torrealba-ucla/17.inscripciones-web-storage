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
    activarVista({ vista, opcion, }) {
        this.vista.activarVista({ vista, opcion });
    }
}
