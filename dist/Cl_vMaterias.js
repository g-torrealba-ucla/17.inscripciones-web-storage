import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vMaterias extends Cl_vGeneral {
    constructor() {
        super({ formName: "materias" });
        this.btAgregar = this.crearHTMLButtonElement("btAgregar", {
            onclick: () => this.agregarMateria(),
        });
        this.btVolver = this.crearHTMLButtonElement("btVolver", {
            onclick: () => this.controlador.activarVista({ vista: "ucla" }),
        });
        this.divMaterias = this.crearHTMLElement("divMaterias", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarMaterias(),
        });
    }
    mostrarMaterias() {
        var _a;
        this.divMaterias.innerHTML = "";
        let materias = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.dtMaterias;
        if (!materias)
            return;
        materias.forEach((materia) => {
            this.divMaterias.innerHTML += `<tr>
            <td>${materia.codigo}</td>
            <td>${materia.nombre}</td>
            <td>
                <button id="materias_btEditar_${materia.codigo}">Editar</button>
                <button id="materias_btEliminar_${materia.codigo}">X</button>
            </td>
        </tr>`;
            this.crearHTMLButtonElement(`materias_btEditar_${materia.codigo}`, {
                onclick: () => this.editarMateria(materia.codigo),
            });
            this.crearHTMLButtonElement(`materias_btEliminar_${materia.codigo}`, {
                onclick: () => this.eliminarMateria(materia.codigo),
            });
        });
    }
    agregarMateria() {
        var _a;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({
            vista: "materia",
            opcion: opcionFicha.add,
        });
    }
    editarMateria(codigo) { }
    eliminarMateria(codigo) { }
    show({ ver }) {
        super.show({ ver });
        if (ver)
            this.mostrarMaterias();
    }
}
