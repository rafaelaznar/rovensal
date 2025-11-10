import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDetalladaPokemon } from './vistaDetalladaPokemon';

describe('VistaDetalladaPokemon', () => {
  let component: VistaDetalladaPokemon;
  let fixture: ComponentFixture<VistaDetalladaPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDetalladaPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaDetalladaPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
