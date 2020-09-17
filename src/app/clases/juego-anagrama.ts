export class JuegoAnagrama {
  palabraSecreta: string;
  listaDePalabras: string[];
  constructor() {
    this.listaDePalabras = [
      'Odontologo',
      'Clinica',
      'Gatos',
      'Perros',
      'Monitor',
      'Estrella',
      'Galaxia'
    ];
  }

  public chequearPalabra(palabraUsuario) {
    return palabraUsuario.toLowerCase() === this.palabraSecreta.toLowerCase();
  }
}
