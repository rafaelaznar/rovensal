import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPokemon } from './buscarPokemon';

describe('BuscarPokemon', () => {
  let component: BuscarPokemon;
  let fixture: ComponentFixture<BuscarPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
