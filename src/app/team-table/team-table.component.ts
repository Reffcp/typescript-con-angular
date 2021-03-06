import { Component, OnInit } from '@angular/core';
import { TeamService, TeamsTableHeaders } from '../services/team.service';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team'
import { take } from 'rxjs/operators';
import { Country } from '../interfaces/player';
@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  public teams$: Observable<Team[]>;  //la $ al final dice que esta variable es asincrona
  public tableHeaders = TeamsTableHeaders;
  public selectedTeam: Team;
  public showModal = false;
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService.getTeams().pipe(take(1)).subscribe(teams =>{
      if (teams.length === 0) {
        const team: Team = {
          name: 'MyAmazingTeam',
          country: Country.Mexico,
          players: null,
        };
        this.teamService.addTeam(team)
      }
    })
  }

  newTeam(){
    this.showModal = true;
    this.selectedTeam = null;
    setTimeout(() => {
      window.location.replace('#open-modal-team');
    });
  }

}
