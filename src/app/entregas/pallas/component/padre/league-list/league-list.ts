import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-league-list',
  imports: [],
  templateUrl: './league-list.html',
  styleUrl: './league-list.css',
})
export class LeagueList {
leagues: any[] = [];

constructor(private http: HttpClient) {}



}
