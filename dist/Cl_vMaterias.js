import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vMaterias extends Cl_vGeneral {
    constructor() {
        super({ formName: "materias" });
        this.btAgregar = this.crearHTMLButtonElement("btAgregar", {
            onclick: () => this.addMateria(),
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
        materias.forEach((materia, index) => (this.divMaterias.innerHTML += `<tr>
            <td>${materia.codigo}</td>
            <td>${materia.nombre}</td>
            <td>
                <button id="materias_btEditar_${index}">Editar</button>
                <button id="materias_btEliminar_${index}">X</button>
            </td>
        </tr>`));
        materias.forEach((materia, index) => {
            this.crearHTMLButtonElement(`btEditar_${index}`, {
                onclick: () => this.editarMateria(materia.codigo),
            });
            this.crearHTMLButtonElement(`btEliminar_${index}`, {
                onclick: () => this.deleteMateria(materia.codigo),
            });
        });
    }
    addMateria() {
        var _a;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({
            vista: "materia",
            opcion: opcionFicha.add,
        });
    }
    editarMateria(codigo) {
        var _a, _b;
        let materia = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.materia(codigo);
        if (materia)
            (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.activarVista({
                vista: "materia",
                opcion: opcionFicha.edit,
                objeto: materia,
            });
    }
    deleteMateria(codigo) {
        var _a;
        if (confirm(`¿Está seguro de eliminar la materia ${codigo}?`))
            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.deleteMateria({
                codigo,
                callback: (error) => {
                    if (error)
                        alert(`No se pudo eliminar la materia ${codigo}.\n${error}`);
                    else
                        this.mostrarMaterias();
                },
            });
    }
    show({ ver }) {
        super.show({ ver });
        if (ver)
            this.mostrarMaterias();
    }
}
