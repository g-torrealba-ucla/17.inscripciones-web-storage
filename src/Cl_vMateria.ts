import Cl_mMateria from "./Cl_mMateria.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class Cl_vMateria extends Cl_vGeneral {
  private inCodigo: HTMLInputElement;
  private inNombre: HTMLInputElement;
  private btAceptar: HTMLButtonElement;
  private btCancelar: HTMLButtonElement;
  private lblOpcion: HTMLLabelElement;
  private opcion: opcionFicha | null;
  private materia: Cl_mMateria;
  constructor() {
    super({ formName: "materia" });
    this.lblOpcion = this.crearHTMLLabelElement("lblOpcion", {
      refresh: () =>
        (this.lblOpcion.innerHTML =
          this.opcion === opcionFicha.add ? "Agregar " : "Editar "),
    });
    this.inCodigo = this.crearHTMLInputElement("inCodigo", {
      oninput: () => {
        this.inCodigo.value = this.materia.codigo = this.inCodigo.value
          .toUpperCase()
          .trim();
        this.refresh();
      },
      refresh: () =>
        (this.inCodigo.style.borderColor = this.materia.codigoOk ? "" : "red"),
    });
    this.inNombre = this.crearHTMLInputElement("inNombre", {
      oninput: () => {
        this.inNombre.value = this.materia.nombre = this.inNombre.value
          .trim()
          .toUpperCase();
        this.refresh();
      },
      refresh: () =>
        (this.inNombre.style.borderColor = this.materia.nombreOk ? "" : "red"),
    });
    this.btAceptar = this.crearHTMLButtonElement("btAceptar", {
      onclick: () => this.aceptar(),
      refresh: () => {
        this.btAceptar.disabled = this.materia.materiaOk !== true;
      },
    });
    this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
      onclick: () => this.controlador!.activarVista({ vista: "materias" }),
    });
    this.opcion = null;
    this.materia = new Cl_mMateria();
  }
  aceptar() {
    if (this.opcion === opcionFicha.add)
      this.controlador!.addMateria({
        dtMateria: this.materia.toJSON(),
        callback: (error) => {
          if (!error) this.controlador!.activarVista({ vista: "materias" });
          else alert(`Error: ${error}`);
        },
      });
  }
  show({ ver, opcion }: { ver: boolean; opcion?: opcionFicha }): void {
    super.show({ ver });
    if (opcion) {
      this.inCodigo.value = "";
      this.inNombre.value = "";
      this.opcion = opcion;
      this.refresh();
    }
  }
}
