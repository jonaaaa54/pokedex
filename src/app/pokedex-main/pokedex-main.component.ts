import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-pokedex-main',
  templateUrl: './pokedex-main.component.html',
  styleUrls: ['./pokedex-main.component.css']
})

export class PokedexMainComponent implements OnInit {

  private maxPokemon:number = 152; // cantidad maxima de pokemones en pokedex.
  private gif:string = 'https://projectpokemon.org/images/normal-sprite/' // Url que provee gifs de pokemons.

  private showUserPokemons: boolean = false; // Flag que permite cambiar entre pokemons del usuario y los disponibles.

  filterPost:string; // string de filtros.


  // Coleccion auxiliar de pokemons.
  public pokemons:Pokemon[]= [];
  // Coleccion de pokemons del usuario.
  public pokemonsUser: Pokemon[] = [];
  // Coleccion de todos los pokemons.
  public allPokemons: Pokemon[] = [];


  constructor(private pokeService: PokeApiService) { }

  ngOnInit(): void {
    this.getAllPokemons();
    this.pokemons = this.allPokemons;
    this.pokemons.sort(function(a, b){return a.id-b.id}); // Ordena pokemons según su numero de id.

  }

  // Metodo que guarda todos los pokemons en un array.
  getAllPokemons(): void{

    for (let i = 0 ; i< this.maxPokemon ; i++){
      this.pokeService.getPokemon(i+1)
      .subscribe(
        data=>{

        let pokemonData = new Pokemon(data.name,
        (this.gif + data.name + '.gif' ), data.id,data.moves.names);

        // No existen gifs para esos pokemons, se utilizan sprites de pokeapi.
        if((pokemonData.id == 29) || (pokemonData.id == 32) || (pokemonData.id == 122)){
          pokemonData.sprite = data.sprites.front_default;
        }

        this.allPokemons.push(pokemonData);
        },
        error=>{
          this.allPokemons = null;
        }
      )
    }


  } // Fin metodo.

  // Metodo que almacena pokemons elegidos por usuario.
  savePokemon(pokemon: Pokemon): void{

    if (!this.pokemonsUser.includes(pokemon)) // Caso en que se repitan pokemon.
      this.pokemonsUser.push(pokemon);

  } // Fin metodo.

  // Metodo que muestra pokemons, los del usuario o todos los disponibles.
  showPokemons(): void{

  this.showUserPokemons = this.changeStatus(this.showUserPokemons);
  const button = (<HTMLInputElement>document.getElementById('pokemons-user-list')); // Variable para cambiar mensaje del botón.

  if(this.showUserPokemons){

    button.value = "¡Atrapalos a todos!";
    this.pokemonsUser.sort(function(a, b){return a.id-b.id});

    this.pokemons = [];
    this.pokemons = this.pokemonsUser;

  }else{

    button.value = "Mi colección";
    this.pokemons = [];
    this.pokemons = this.allPokemons;
    }
  } // Fin metodo.

  // Cambia valor de variable boolean. Retorna valor contrario al ingresado.
  changeStatus(variable:boolean): boolean{
    if(variable === true){
      variable = false;
    }else{
      variable = true;
    }
    return variable;
  }// Fin metodo.
}

