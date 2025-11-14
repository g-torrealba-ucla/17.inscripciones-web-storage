import { iMateria } from "./Cl_mMateria.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class Cl_vMaterias extends Cl_vGeneral {
  private btAgregar: HTMLButtonElement;
  private btVolver: HTMLButtonElement;
  private divMaterias: HTMLDivElement;
  constructor() {
    super({ formName: "materias" });
    this.btAgregar = this.crearHTMLButtonElement("btAgregar", {
      onclick: () => this.agregarMateria(),
    });
    this.btVolver = this.crearHTMLButtonElement("btVolver", {
      onclick: () => this.controlador!.activarVista({ vista: "ucla" }),
    });
    this.divMaterias = this.crearHTMLElement("divMaterias", {
      type: tHTMLElement.CONTAINER,
      refresh: () => this.mostrarMaterias(),
    }) as HTMLDivElement;
  }
  mostrarMaterias() {
    this.divMaterias.innerHTML = "";
    let materias = this.controlador?.dtMaterias;
    if (!materias) return;
    materias.forEach((materia: iMateria) => {
      this.divMaterias.innerHTML += `<tr>
            <td>${materia.codigo}</td>
            <td>${materia.nombre}</td>
            <td>
                <button id="materias_btEditar_${materia.codigo}">Editar</button>
                <button id="materias_btEliminar_${materia.codigo}">X</button>
            </td>
        </tr>`;
      this.crearHTMLButtonElement(`btEditar_${materia.codigo}`, {
        onclick: () => this.editarMateria(materia.codigo),
      });
      this.crearHTMLButtonElement(`btEliminar_${materia.codigo}`, {
        onclick: () => this.eliminarMateria(materia.codigo),
      });
    });
  }
  agregarMateria() {
    this.controlador?.activarVista({
      vista: "materia",
      opcion: opcionFicha.add,
    });
  }
  editarMateria(codigo: string) {}
  eliminarMateria(codigo: string) {}
  show({ ver }: { ver: boolean }): void {
    super.show({ ver });
    if (ver) this.mostrarMaterias();
  }
}
