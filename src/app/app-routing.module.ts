import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'pokedex/list', component: ListPokemonComponent},
  {path: 'pokedex/list-asc', component: ListPokemonComponent},
  {path: '', pathMatch: 'full', redirectTo: '/pokedex/list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
