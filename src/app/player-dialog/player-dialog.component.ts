import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Country, SquadNumber, Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss']
})
export class PlayerDialogComponent implements OnInit {
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  @Input() player: Player;
  private team;

  public countries = Object.keys(Country).map(key => ({ label: key, key: Country[key] }))
  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map(key => ({
      label: key,
      key: SquadNumber[key]
    }))
  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        if (teams.length > 0) {
          this.team = teams[0]
        }
      })
  }

  private newPlayer(playerFormValue) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = {
      ...playerFormValue,
      key
    }
    const formattedTeam = {
      ... this.team,
      players: [...(this.team.players ? this.team.players : []), playerFormValue]
    }
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value }
    if (playerForm.valid) {
      playerFormValue.leftFooted = (playerFormValue.leftFooted === '' || playerFormValue.leftFooted ===undefined) ? false : playerFormValue.leftFooted;
    }else{
      if (playerFormValue.leftFooted === null || playerFormValue.leftFooted === undefined) {
        playerFormValue.leftFooted=false;
      }
    }
    if (this.player) {
      this.editPlayer(playerFormValue)
    }else{
      this.newPlayer(playerFormValue);
    }
    
      window.location.replace('#');
  }

  onClose() {
    this.closeDialog.emit(true);
  }

  private editPlayer(playerFormValue) {
    const playerFormValueKey = { ...playerFormValue, $key: this.player.$key };
    const playerFormValueWithFormattedKey = { ...playerFormValue, key: this.player.$key };
    delete playerFormValueWithFormattedKey.$key;
    const moddifiedPlayers = this.team.players
      ? this.team.players.map(player => {
        return player.key === this.player.$key ? playerFormValueWithFormattedKey : this.player;
      }) : this.team.players;

    const formattedTeam = {
      ...this.team,
      players: [...(moddifiedPlayers ? moddifiedPlayers : [playerFormValueWithFormattedKey])]
    }

    this.playerService.editPlayer(playerFormValueKey);
    this.teamService.editTeam(formattedTeam);
  }
}
