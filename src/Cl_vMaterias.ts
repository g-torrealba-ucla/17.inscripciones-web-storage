import { iMateria } from "./Cl_mMateria.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
interface iOpcionMateria {
  edit: HTMLButtonElement | null;
  delete: HTMLButtonElement | null;
}
export default class Cl_vMaterias extends Cl_vGeneral {
  private btAgregar: HTMLButtonElement;
  private btVolver: HTMLButtonElement;
  private divMaterias: HTMLDivElement;
  constructor() {
    super({ formName: "materias" });
    this.btAgregar = this.crearHTMLButtonElement("btAgregar", {
      onclick: () => this.addMateria(),
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
    materias.forEach(
      (materia: iMateria, index: number) =>
        (this.divMaterias.innerHTML += `<tr>
            <td>${materia.codigo}</td>
            <td>${materia.nombre}</td>
            <td>
                <button id="materias_btEditar_${index}">Editar</button>
                <button id="materias_btEliminar_${index}">X</button>
            </td>
        </tr>`)
    );
    materias.forEach((materia: iMateria, index) => {
      this.crearHTMLButtonElement(`btEditar_${index}`, {
        onclick: () => this.editarMateria(materia.codigo),
      });
      this.crearHTMLButtonElement(`btEliminar_${index}`, {
        onclick: () => this.deleteMateria(materia.codigo),
      });
    });
  }
  addMateria() {
    this.controlador?.activarVista({
      vista: "materia",
      opcion: opcionFicha.add,
    });
  }
  editarMateria(codigo: string) {
    let materia = this.controlador?.materia(codigo);
    if (materia)
      this.controlador?.activarVista({
        vista: "materia",
        opcion: opcionFicha.edit,
        objeto: materia,
      });
  }
  deleteMateria(codigo: string) {
    if (confirm(`¿Está seguro de eliminar la materia ${codigo}?`))
      this.controlador?.deleteMateria({
        codigo,
        callback: (error) => {
          if (error)
            alert(`No se pudo eliminar la materia ${codigo}.\n${error}`);
          else this.mostrarMaterias();
        },
      });
  }
  show({ ver }: { ver: boolean }): void {
    super.show({ ver });
    if (ver) this.mostrarMaterias();
  }
}
