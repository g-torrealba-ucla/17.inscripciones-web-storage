import Cl_mMateria from "./Cl_mMateria.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vMateria extends Cl_vGeneral {
    constructor() {
        super({ formName: "materia" });
        this.opcion = null;
        this.materia = new Cl_mMateria();
        this.lblOpcion = this.crearHTMLLabelElement("lblOpcion", {
            refresh: () => (this.lblOpcion.innerHTML =
                this.opcion === opcionFicha.add ? "Agregar " : "Editar "),
        });
        this.inCodigo = this.crearHTMLInputElement("inCodigo", {
            oninput: () => {
                this.inCodigo.value = this.materia.codigo = this.inCodigo.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
            refresh: () => (this.inCodigo.style.borderColor = this.materia.codigoOk ? "" : "red"),
        });
        this.inCodigo.disabled = this.opcion === opcionFicha.edit;
        this.inNombre = this.crearHTMLInputElement("inNombre", {
            oninput: () => {
                this.inNombre.value = this.materia.nombre = this.inNombre.value
                    .trim()
                    .toUpperCase();
                this.refresh();
            },
            refresh: () => (this.inNombre.style.borderColor = this.materia.nombreOk ? "" : "red"),
        });
        this.btAceptar = this.crearHTMLButtonElement("btAceptar", {
            onclick: () => this.aceptar(),
            refresh: () => {
                this.btAceptar.disabled = this.materia.materiaOk !== true;
            },
        });
        this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
            onclick: () => this.controlador.activarVista({ vista: "materias" }),
        });
    }
    aceptar() {
        if (this.opcion === opcionFicha.add)
            this.controlador.addMateria({
                dtMateria: this.materia.toJSON(),
                callback: (error) => {
                    if (!error)
                        this.controlador.activarVista({ vista: "materias" });
                    else
                        alert(`Error: ${error}`);
                },
            });
        else {
            this.controlador.editMateria({
                dtMateria: this.materia.toJSON(),
                callback: (error) => {
                    if (!error)
                        this.controlador.activarVista({ vista: "materias" });
                    else
                        alert(`Error: ${error}`);
                },
            });
        }
    }
    show({ ver, materia: materia, opcion, } = {
        ver: false,
        materia: new Cl_mMateria(),
    }) {
        super.show({ ver });
        if (opcion) {
            this.opcion = opcion;
            this.materia.id = materia.id;
            this.materia.codigo = this.inCodigo.value = materia.codigo;
            this.materia.nombre = this.inNombre.value = materia.nombre;
            this.refresh();
        }
    }
}
