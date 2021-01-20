
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PokeApiService {

  urlBase = environment.Url;

  constructor(private http: HttpClient ) {}

  // Metodo que recupera datos de un pokemon especifico por su numero de id.
  getPokemon(pokemonId: any){
    return this.http.get<any>(`${this.urlBase}/pokemon/${pokemonId}`)
  }

}
