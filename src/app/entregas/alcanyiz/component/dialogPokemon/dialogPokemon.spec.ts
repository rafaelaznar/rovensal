import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPokemon } from './dialogPokemon';

describe('DialogPokemon', () => {
  let component: DialogPokemon;
  let fixture: ComponentFixture<DialogPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
