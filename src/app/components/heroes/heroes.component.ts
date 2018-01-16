import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading: boolean = true;

  constructor(private _heroesService: HeroesService) { 
    this._heroesService.getHeroes()
            .subscribe(data => {
              this.heroes = data;
              this.loading = false;
              // PARA OBTENER LOS KEY (PRIMERA FORMA)
              // for (var key$ in data) {
              //   let h = data[key$];
              //   h.key$ = key$;
              //   this.heroes.push(data[key$]);
              // }
              // console.log(this.heroes);
            });
  }

  ngOnInit() {
  }

  borrarHeroe(key$: string) {
    this._heroesService.borrarHeroe(key$)
            .subscribe(res => {
              if (res) {
                console.error(res);
                
              } else {
                // todo bien
                delete this.heroes[key$];
              }
              
            });
  }

}
