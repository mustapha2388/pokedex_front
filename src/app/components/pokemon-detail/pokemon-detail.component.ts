import { Pokemon } from 'src/app/models/pokemon';
import { PokemonRepositoryService } from './../../services/pokemon-repository.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  pokemonDetail: Pokemon;
  faArrowLeft = faArrowLeft;
  statsArr: Array<string>;
  constructor(private pokemonService: PokemonRepositoryService,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.pokemonDetail = null;
    this.statsArr = new Array<string>();
    this.activeRoute.params.subscribe(params =>  {
      const id: number = Number(params.id);
      this.pokemonService.getPokemonByid(id).then(
        pokemon => { this.pokemonDetail = pokemon;
                     console.log('pokemon id is ' + this.pokemonDetail.id);
                    }
      );

      this.pokemonService.getStatOfPokemonById(id).then(
        data => {
          this.statsArr = data.stats;
          console.log(data.stats);
        }
      );
    });
  }

  convertTypeToImg(type: string): string {
    return './assets/img/' + type + '.png';
  }

   getImgFromApi(id: number): string {
    return this.pokemonService.getImagePokemonAPi(id);
  }

  back() {
    this.location.back();
  }


}
