import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { Page } from '../models/page';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonRepositoryService {

  private serviceUrl = 'http://localhost:8080/pokedex';
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

  public refreshList() {
    const urlParams: HttpParams = new HttpParams().set('page', '' + this.noPage).set('size', '' + this.taillePage);
    this.http.get<Page<Pokemon>>(this.serviceUrl, {params: urlParams}).subscribe(pok => this.pokemonsSubject.next(pok));
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
    return `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;
  }
}
