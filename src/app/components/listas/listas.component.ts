import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {


//  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtl: AlertController)
  {

  }

  ngOnInit(){}

  listaSeleccionada(lista: Lista)
  {
    if(this.terminada)
    {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }
    else
    {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
    console.log(lista);
  }

borrarLista(lista: Lista)
 {
 this.deseosService.borrarLista(lista);
 }

async editLista(lista: Lista)
{

  const alert = await this.alertCtl.create({
        header: 'Actualizar Lista',
        inputs:
        [
        {
          name:'titulo',
          type:'text',
          value: lista.titulo,
          placeholder:'nombre de la lista'
        }
        ],
        buttons:
        [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler:()=>
          {
             console.log('Cancelar');
          }
        },
          {
            text: 'Actualizar',
            handler:(data) =>
            {
               if(data.titulo.length === 0)
               {
                  return;
               }
               lista.titulo = data.titulo;
               this.deseosService.guardarStorage();
               //this.lista.closeSlidingItems();
               console.log(data);
            }
          }
        ]
      });
     alert.present();
}


}
