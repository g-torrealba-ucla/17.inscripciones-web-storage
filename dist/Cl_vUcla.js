import Cl_vMateria from "./Cl_vMateria.js";
import Cl_vMaterias from "./Cl_vMaterias.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vUcla extends Cl_vGeneral {
    constructor() {
        super({ formName: "ucla" });
        this.vMaterias = new Cl_vMaterias();
        this.vMaterias.show({ ver: false });
        this.vMateria = new Cl_vMateria();
        this.vMateria.show({ ver: false });
        this.btMaterias = this.crearHTMLButtonElement("btMaterias", {
            onclick: () => this.controlador.activarVista({ vista: "materias" }),
        });
        this.btEstudiantes = this.crearHTMLButtonElement("btEstudiantes", {
            onclick: () => 0,
        });
        this.btReportes = this.crearHTMLButtonElement("btReportes", {
            onclick: () => 0,
        });
        this.lblMaterias = this.crearHTMLLabelElement("lblMaterias", {
            refresh: () => { },
        });
        this.lblEstudiantes = this.crearHTMLLabelElement("lblEstudiantes", {
            refresh: () => { },
        });
    }
    set controlador(controlador) {
        super.controlador = controlador;
        this.vMaterias.controlador = controlador;
        this.vMateria.controlador = controlador;
    }
    activarVista({ vista, opcion, }) {
        this.show({ ver: vista === "ucla" });
        this.vMaterias.show({ ver: vista === "materias" });
        this.vMateria.show({ ver: vista === "materia", opcion });
    }
}
