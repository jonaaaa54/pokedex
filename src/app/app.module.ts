import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexMainComponent } from './pokedex-main/pokedex-main.component';
import { HttpClientModule } from '@angular/common/http';


/* Servicios */
import { PokeApiService } from './services/poke-api.service';
/* Pipes */
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PokedexMainComponent,
    FilterPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [ PokeApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
