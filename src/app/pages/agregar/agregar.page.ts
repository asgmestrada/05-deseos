import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.models';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

 lista: Lista;
 nombreItem = '';
  constructor(private deseosService: DeseosService,
              private activatedRouter: ActivatedRoute)
  {

   const listaId = this.activatedRouter.snapshot.paramMap.get('listaId');
   this.lista = this.deseosService.obtenerLista(listaId);
   console.log(listaId );
   console.log(this.lista);
  }

  ngOnInit() {
  }

  agregarItem()
  {
    if(this.nombreItem.length === 0)
    {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem)
  {
  const pendientes = this.lista.items
                     .filter(itemData => !itemData.completado)
                     .length;

   console.log({pendientes});
   console.log(item);

   if(pendientes === 0)
   {
     this.lista.terminadaEn = new Date();
     this.lista.terminada = true;
   }
   else
   {
     this.lista.terminadaEn = null;
     this.lista.terminada = false;
   }
   console.log(this.lista);
   console.log(this.deseosService.listas);
   this.deseosService.guardarStorage();
  }

  borrarTarea(i: number)
  {
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}
