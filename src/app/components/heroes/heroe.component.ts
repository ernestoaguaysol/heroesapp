import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo: boolean = false;
  id: string;
  constructor( private _heroesService: HeroesService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params
      .subscribe( param => {
        this.id = param['id'];
        if (this.id !== 'nuevo') {
          this._heroesService.getHeroe(this.id)
                .subscribe(heroe => this.heroe = heroe);
        }
      });
  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.heroe);

    if (this.id == 'nuevo') {
      // insertar
      this._heroesService.nuevoHeroe( this.heroe )
                  .subscribe( data => {
                    this.router.navigate(['/heroe', data.name]);
                  },
                    error => console.error(error));
      
    }else{
      // actualizar
      this._heroesService.actualizarHeroe( this.heroe, this.id )
                .subscribe( data => {
                  console.log(data);
                },
                  error => console.error(error));

    }
  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel'
    });
  }



}
