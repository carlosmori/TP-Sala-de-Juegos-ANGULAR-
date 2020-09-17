export class JuegoMemoTest {
  public listaDeNumeros: number[];
  gano: boolean;
  constructor() {
    this.gano = false;
  }

  chequearSecuencia(secuenciaUsuario) {
    let listaNumerosString = '';
    this.listaDeNumeros.forEach((numero) => {
      listaNumerosString = listaNumerosString.concat(numero.toString());
    });
    return listaNumerosString === secuenciaUsuario.toString();
  }
}
