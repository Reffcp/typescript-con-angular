import { Injectable } from '@angular/core';
import { Team } from '../interfaces/team';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

  export const TeamsTableHeaders = ['name','country','players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsDB: AngularFireList<Team>;
  constructor(private db: AngularFireDatabase) {
    this.teamsDB = db.list('/teams', ref => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]>{
    return this.teamsDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val()}))
      })
    )
  }

  addTeam(player: Team){
    return this.teamsDB.push(player);
  }

  deleteTeam(id: string){
    this.db.list('/teams').remove(id);
  }

  editTeam(newTeam){
    const $key = newTeam.$key;
    delete(newTeam.$key)
    this.db.list('/teams').update($key,newTeam)
  }
}
