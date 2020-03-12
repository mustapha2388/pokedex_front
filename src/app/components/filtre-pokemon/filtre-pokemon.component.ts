import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtre-pokemon',
  templateUrl: './filtre-pokemon.component.html',
  styleUrls: ['./filtre-pokemon.component.css']
})
export class FiltrePokemonComponent implements OnInit {

  @Input() typesInput: string[];
  @Output() typeOutput = new EventEmitter();

  choixType = 0;

  constructor() {
    this.typesInput = [];
   }

  ngOnInit() {
  }

  onChoixType(event: number): void {
    console.log('choix: ' + event);
    this.typeOutput.emit(event); // envoie de l'id de l'editeur choisi (pour filtrage)
  }

}
