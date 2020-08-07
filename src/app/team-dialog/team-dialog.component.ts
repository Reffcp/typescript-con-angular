import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Team } from '../interfaces/team';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent implements OnInit {
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  @Input() team: Team;

  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(playerForm: NgForm) {
  }

}
