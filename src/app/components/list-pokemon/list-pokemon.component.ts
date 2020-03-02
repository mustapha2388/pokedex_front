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

  ngOnInit() {
    this.noPage = 1;
    this.taillePage = 8;
    this.totalItems = 0;
    this.pagePokemon = Page.emptyPage<Pokemon>();
    this.pokemonService.refreshList(this.router.url);
    this.getPokemon();
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
    this.pokemonService.setNoPage(event.page - 1, this.router.url);
  }

  public getImgFromApi(id: number): string {
    return this.pokemonService.getImagePokemonAPi(id);
  }
}
