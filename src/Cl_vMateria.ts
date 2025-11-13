import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class Cl_vMateria extends Cl_vGeneral {
  private inCodigo: HTMLInputElement;
  private inNombre: HTMLInputElement;
  private btAceptar: HTMLButtonElement;
  private btCancelar: HTMLButtonElement;
  private lblOpcion: HTMLLabelElement;
  private opcion: opcionFicha = opcionFicha.add;
  constructor() {
    super({ formName: "materia" });
    this.lblOpcion = this.crearHTMLLabelElement("lblOpcion", {});
    this.inCodigo = this.crearHTMLInputElement("inCodigo", {});
    this.inNombre = this.crearHTMLInputElement("inNombre", {});
    this.btAceptar = this.crearHTMLButtonElement("btAceptar", {
      onclick: () => this.aceptar(),
    });
    this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
      onclick: () => this.controlador!.activarVista({vista: "materias"}),
    });
  }
  aceptar() {}
  show({ ver, opcion }: { ver: boolean; opcion?: opcionFicha }): void {
    super.show({ ver });
    if (opcion) this.opcion = opcion;
  }
}
