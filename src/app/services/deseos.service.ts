import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})

export class DeseosService {

 listas: Lista[] = [];

  constructor()
  {
    this.cargarStorage();

  /*
    console.log(this.listas);
    const lista1 = new Lista('Recolectar las piedras del Infinito');
    const lista2 = new Lista('Heroes a Desaparecer');

    this.listas.push(lista1,lista2);  // Agrega la lista1 y lista2 a mi arreglo listas

    console.log(this.listas);
    console.log("Servicio Inicializado"); */

  }

  crearLista(titulo: string)
  {
    const nuevaLista = new Lista(titulo);

     this.listas.push(nuevaLista);
     this.guardarStorage();
        return nuevaLista.id;
  }


  obtenerLista(id: string | number)
  {
    id = Number(id);
     return this.listas.find(listaData => listaData.id === id);
  }

  borrarLista(lista: Lista)
  {
  this.listas = this.listas.filter( list => list.id!=lista.id);
  this.guardarStorage();
  }
  guardarStorage()
  {
    //Local Storage y Session Storage solo guardan String
    //JSON.stringify() convierte los objetos en un JSON valido de tipo string
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage()
  {
     if(localStorage.getItem('data'))
     {
       this.listas = JSON.parse(localStorage.getItem('data'));
     }

  }



}
