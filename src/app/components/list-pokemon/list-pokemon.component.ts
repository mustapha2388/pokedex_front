import { Page } from './../../models/page';
import { PokemonRepositoryService } from './../../services/pokemon-repository.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit {

  constructor(private pokemonService: PokemonRepositoryService,
              private router: Router) { }

  // pagination
  noPage: number;
  taillePage: number;
  totalItems: number;

  pagePokemon: Page<Pokemon>;
  private pokemonSubscription: Subscription;

  tagFilter: string;

  ngOnInit() {
    this.noPage = 1;
    this.taillePage = 8;
    this.totalItems = 0;
    this.pagePokemon = Page.emptyPage<Pokemon>();
    this.pokemonService.refreshList(this.router.url);
    this.tagFilter = 'numéro';
    this.getPokemon();
    this.changeTag();
  }

  convertTypeToImg(type: string): string {
    switch (type) {
      case 'Grass':
        return './assets/img/grass.png';
        case 'Poison':
          return './assets/img/grass.png';

    }
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
    } else if (this.router.url.includes('max/weight' )) {
      this.tagFilter = 'Pokemon(s) le(s) plus lourd';

    } else if (this.router.url.includes('min/height' )) {
      this.tagFilter = 'Pokemon(s) le(s) plus petit';

    } else if (this.router.url.includes('max/height' )) {
      this.tagFilter = 'Pokemon(s) le(s) plus grand';

    } else if (this.router.url.includes('list-id-desc' )) {
      this.tagFilter = 'Pokemons par # décroissant';
    }  else if (this.router.url.includes('list-desc' )) {
      this.tagFilter = 'Pokemons par nom Z-A';
    } else if (this.router.url.includes('list-asc' )) {
      this.tagFilter = 'Pokemons par nom A-Z';
    } else {
      this.tagFilter = 'Pokemons par # croissant';
    }

  }
  public onPageChanged(event): void {
    this.pokemonService.setNoPage(event.page - 1, this.router.url);
  }

  public getImgFromApi(id: number): string {
    return this.pokemonService.getImagePokemonAPi(id);
  }
}
