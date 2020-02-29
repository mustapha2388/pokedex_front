import { TestBed } from '@angular/core/testing';

import { PokemonRepositoryService } from './pokemon-repository.service';

describe('PokemonRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonRepositoryService = TestBed.get(PokemonRepositoryService);
    expect(service).toBeTruthy();
  });
});
