import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Player } from '../interfaces/player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersDB: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDB = db.list('/players', ref => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Player[]>{
    return this.playersDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val()}))
      })
    )
  }

  addPlayer(player: Player){
    return this.playersDB.push(player);
  }

  deletePlayer(id: string){
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayer){
    const $key = newPlayer.$key;
    delete(newPlayer.$key)
    this.db.list('/players').update($key,newPlayer)
  }

  
}
