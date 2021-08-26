import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from '../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, {static: true }) segment: IonSegment;

  categorias = ['business','entertainment','general','health','science','sports','technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarnoticias(this.categorias[0]);
  }

  cargarnoticias(categoria: string) {

    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe( (resp: any) => {
      console.log(resp);
      this.noticias.push(...resp.articles);
    });
  }

  cambioCategoria( event) {
    this.noticias = [];
    this.cargarnoticias(event.detail.value);
  }

}
