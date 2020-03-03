import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';


const routes: Routes = [
  {path: 'pokedex/list', component: ListPokemonComponent},
  {path: 'pokedex/list-asc', component: ListPokemonComponent},
  {path: 'pokedex/list-desc', component: ListPokemonComponent},
  {path: 'pokedex/list-id-desc', component: ListPokemonComponent},
  {path: 'pokedex/pokemon/:id/details', component: PokemonDetailComponent},
  {path: 'pokedex/pokemon/max/weight', component: ListPokemonComponent},
  {path: 'pokedex/pokemon/max/height', component: ListPokemonComponent},
  {path: 'pokedex/pokemon/min/weight', component: ListPokemonComponent},
  {path: 'pokedex/pokemon/min/height', component: ListPokemonComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/pokedex/list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
