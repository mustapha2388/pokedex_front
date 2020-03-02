import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { Page } from '../models/page';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonRepositoryService {

  private serviceUrl = 'http://localhost:8080';
  private urlApiImg = 'https://pokeres.bastionbot.org/images/pokemon/';
  private extensionImg = '.png';
  // pagination
  private noPage: number;
  private taillePage: number;

  private pokemonsSubject: BehaviorSubject<Page<Pokemon>>;

  constructor(private http: HttpClient) {
    this.noPage = 0;
    this.taillePage = 48;
    this.pokemonsSubject = new BehaviorSubject(Page.emptyPage<Pokemon>());
  }

  public getPokemonPageAsObsversable() {
    return this.pokemonsSubject.asObservable();
  }

  public getUrl(filter: string): string {
    if (filter) {
      return this.serviceUrl + filter;
    } else {
      return this.serviceUrl;
    }
  }
  public refreshList(filter: string) {
    console.log('filter:' + filter);
    const urlParams: HttpParams = new HttpParams().set('page', '' + this.noPage).set('size', '' + this.taillePage);
    this.http.get<Page<Pokemon>>(this.getUrl(filter), { params: urlParams }).subscribe(pok => this.pokemonsSubject.next(pok));
  }

  public setNoPage(noPage: number, filter: string): void {
    console.log(' taillePage :' + this.taillePage);
    console.log(' noPage :' + noPage);

    if (noPage > this.taillePage ) {
      this.noPage = this.taillePage;
    } else {
    this.noPage = noPage;
    }
    this.refreshList(filter);
  }

  /**
   * USE POKERES API for Image
   * USE POKEAPI for Data
   * @param pokeID : Id Pokemon
   */
  public getImagePokemonAPi(pokeID: number): string {
    return this.urlApiImg + `${pokeID}` + this.extensionImg;
  }
}
