import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastanyeraMenuButton } from './castanyera-menu-button';

describe('CastanyeraMenuButton', () => {
  let component: CastanyeraMenuButton;
  let fixture: ComponentFixture<CastanyeraMenuButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastanyeraMenuButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastanyeraMenuButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
