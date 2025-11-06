import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueList } from './league-list';

describe('LeagueList', () => {
  let component: LeagueList;
  let fixture: ComponentFixture<LeagueList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
