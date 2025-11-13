import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vMateria extends Cl_vGeneral {
    constructor() {
        super({ formName: "materia" });
        this.opcion = opcionFicha.add;
        this.lblOpcion = this.crearHTMLLabelElement("lblOpcion", {});
        this.inCodigo = this.crearHTMLInputElement("inCodigo", {});
        this.inNombre = this.crearHTMLInputElement("inNombre", {});
        this.btAceptar = this.crearHTMLButtonElement("btAceptar", {
            onclick: () => this.aceptar(),
        });
        this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
            onclick: () => this.controlador.activarVista({ vista: "materias" }),
        });
    }
    aceptar() { }
    show({ ver, opcion }) {
        super.show({ ver });
        if (opcion)
            this.opcion = opcion;
    }
}
