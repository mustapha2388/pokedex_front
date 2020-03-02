import { Page } from './../../models/page';
import { PokemonRepositoryService } from './../../services/pokemon-repository.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.noPage = 1;
    this.taillePage = 8;
    this.totalItems = 0;
    this.pagePokemon = Page.emptyPage<Pokemon>();
    this.getPokemon();
    this.switchUrl();
  }

  switchUrl() {
    if (this.router.url.includes('/list-asc')) {
      this.pokemonService.refreshList('ASC');
    } else if (this.router.url.includes('/list-desc')) {
      this.pokemonService.refreshList('DESC');
    } else if (this.router.url.includes('/list-id-desc')) {
      this.pokemonService.refreshList('ID_DESC');
    } else if (this.router.url.includes('max/weight')) {
      this.pokemonService.refreshList('MAX_WEIGHT');
    } else if (this.router.url.includes('max/height')) {
      this.pokemonService.refreshList('MAX_HEIGHT');
    } else if (this.router.url.includes('min/weight')) {
      this.pokemonService.refreshList('MIN_WEIGHT');
    } else if (this.router.url.includes('min/height')) {
      this.pokemonService.refreshList('MIN_HEIGHT');
    } else {
      this.pokemonService.refreshList();
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

  public onPageChanged(event): void {
    this.pokemonService.setNoPage(event.page - 1);
  }

  public getImgFromApi(id: number): string {
    return this.pokemonService.getImagePokemonAPi(id);
  }
}
