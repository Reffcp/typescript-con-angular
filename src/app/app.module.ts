import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { PlayerService } from './services/player.service';
import { TeamTableComponent } from './team-table/team-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamTableComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    
    
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
