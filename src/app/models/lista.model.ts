import { ListaItem } from './lista-item.models';



export class Lista
{
  id: number;
  titulo: string;
  creadaEn: Date;
  terminadaEn: Date;
  terminada: boolean;
  items: ListaItem [];

  constructor( titulo: string)
  {
    this.id = new Date().getTime();
    this.titulo = titulo;
    this.creadaEn = new Date();
    this.terminadaEn;
    this.terminada = false;
    this.items = [];

  }
}
