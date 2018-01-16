import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];

  constructor(private _heroesService: HeroesService) { 
    this._heroesService.getHeroes()
            .subscribe(data => {
              
              console.log(data);
              for (var key$ in data) {
                let h = data[key$];
                h.key$ = key$;
                this.heroes.push(data[key$]);
              }
              console.log(this.heroes);
            });
  }

  ngOnInit() {
  }

}
