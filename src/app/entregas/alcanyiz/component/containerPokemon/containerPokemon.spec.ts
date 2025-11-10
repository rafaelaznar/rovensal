import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPokemon } from './containerPokemon';

describe('ContainerPokemon', () => {
  let component: ContainerPokemon;
  let fixture: ComponentFixture<ContainerPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
