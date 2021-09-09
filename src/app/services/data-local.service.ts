import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  private storages: Storage;

  constructor( private storage: Storage) {
    this.init();
  }

  async init(){
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storages = storage;
    this.cargarFavoritos();
  }

  guardarNoticia( noticia: Article) {

    const existe = this.noticias.find( noti => noti.title === noticia.title);

    if ( !existe){
    this.noticias.unshift( noticia);
    this.storages.set('favoritos', this.noticias);
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
  }
}
