import { Page } from './../../models/page';
import { PokemonRepositoryService } from './../../services/pokemon-repository.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit, OnDestroy {


  constructor(private pokemonService: PokemonRepositoryService,
              private router: Router) { }

  // pagination
  noPage: number;
  taillePage: number;
  totalItems: number;

  pagePokemon: Page<Pokemon>;
  private pokemonSubscription: Subscription;

  tagFilter: string;
  filterType: string[] = [];

  ngOnInit() {
    this.noPage = 1;
    this.taillePage = 8;
    this.totalItems = 0;
    this.pagePokemon = Page.emptyPage<Pokemon>();
    this.pokemonService.refreshList(this.router.url);
    this.tagFilter = 'numéro';
    this.getPokemon();
    this.getFilter();
    this.changeTag();
  }

  convertTypeToImg(type: string): string {
    return './assets/img/' + type + '.png';
  }

  getFilter() {
    this.pokemonService.getTypesPokemon().subscribe(type => this.filterType = type);
  }

  getPokemon() {
    this.pokemonSubscription = this.pokemonService
      .getPokemonPageAsObsversable()
      .subscribe(p => {
        this.pagePokemon = p;
        this.noPage = p.number + 1;
        this.taillePage = p.size;
        this.totalItems = p.totalElements;
      });
  }

  public changeTag() {
    if (this.router.url.includes('min/weight')) {
      this.tagFilter = 'Pokemon(s) le(s) plus léger';
    } else if (this.router.url.includes('max/weight')) {
      this.tagFilter = 'Pokemon(s) le(s) plus lourd';

    } else if (this.router.url.includes('min/height')) {
      this.tagFilter = 'Pokemon(s) le(s) plus petit';

    } else if (this.router.url.includes('max/height')) {
      this.tagFilter = 'Pokemon(s) le(s) plus grand';

    } else if (this.router.url.includes('list-id-desc')) {
      this.tagFilter = 'Pokemons par # décroissant';
    } else if (this.router.url.includes('list-desc')) {
      this.tagFilter = 'Pokemons par nom Z-A';
    } else if (this.router.url.includes('list-asc')) {
      this.tagFilter = 'Pokemons par nom A-Z';
    } else if (this.router.url.includes('/search/types')){
      this.tagFilter = 'Pokemons par filter';
    } else {
      this.tagFilter = 'Pokemons par # croissant';
    }

  }

  public onPokemonFilter(event: number) {
    if (event > 0) {
    console.log('onpokemonFilter' + event);
    this.pokemonService.setFiltreType(this.filterType[event - 1]);
    }
  }

  public onPageChanged(event): void {
    this.pokemonService.setNoPage(event.page - 1, this.router.url);
  }

  public getImgFromApi(id: number): string {
    return this.pokemonService.getImagePokemonAPi(id);
  }

  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe();
  }

}
