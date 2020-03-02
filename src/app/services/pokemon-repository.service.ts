import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { Page } from '../models/page';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonRepositoryService {

  private serviceUrl = 'http://localhost:8080/pokedex';
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

  public choiceUrl(flag?: string): string {
    switch (flag) {
      case 'ASC':
        console.log('in asc flag');
        return this.serviceUrl + '/list-asc';
      case 'DESC':
        console.log('in desc flag');
        return this.serviceUrl + '/list-desc';
      case 'ID_DESC':
        console.log('in desc flag');
        return this.serviceUrl + '/list-id-desc';
      case 'MAX_WEIGHT':
        console.log('in desc flag');
        return this.serviceUrl + '/pokemon/max/weight';
      case 'MIN_WEIGHT':
        console.log('in desc flag');
        return this.serviceUrl + '/pokemon/min/weight';
      case 'MAX_HEIGHT':
        console.log('in max height');
        return this.serviceUrl + '/pokemon/max/height';
      case 'MIN_HEIGHT':
        console.log('in min height');
        return this.serviceUrl + '/pokemon/min/height';
      default:
        console.log('in default');
        return this.serviceUrl;
    }
  }
  public refreshList(filter?: string) {
    const urlParams: HttpParams = new HttpParams().set('page', '' + this.noPage).set('size', '' + this.taillePage);
    this.http.get<Page<Pokemon>>(this.choiceUrl(filter), { params: urlParams }).subscribe(pok => this.pokemonsSubject.next(pok));
  }

  public setNoPage(noPage: number): void {
    this.noPage = noPage;
    this.refreshList();
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
