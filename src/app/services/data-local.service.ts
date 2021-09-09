import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  private storages: Storage;

  constructor( private storage: Storage, private toastController: ToastController) {
    this.init();
  }

  async init(){
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storages = storage;
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  guardarNoticia( noticia: Article) {

    const existe = this.noticias.find( noti => noti.title === noticia.title);

    if ( !existe){
      this.noticias.unshift( noticia);
      this.storages.set('favoritos', this.noticias);
      this.presentToast('Agregado a favoritos');
    } else {
      this.presentToast('Ya está en favoritos');
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storages.get('favoritos');
    if(favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia( noticia: Article) {
    this.noticias= this.noticias.filter(noti => noti.title !== noticia.title);
    this.storages.set('favoritos', this.noticias);
    this.presentToast('Eliminado de favoritos');
  }
}
