import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrePokemonComponent } from './filtre-pokemon.component';

describe('FiltrePokemonComponent', () => {
  let component: FiltrePokemonComponent;
  let fixture: ComponentFixture<FiltrePokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrePokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
