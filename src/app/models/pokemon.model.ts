import { Observable } from "rxjs";

// Modelo de clase para crear pokemon.
export class Pokemon{
  constructor(public name:string, public sprite:string, public id:number, public moves:string[]){}
}
