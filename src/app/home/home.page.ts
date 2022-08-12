import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../services/anime.service';


///tesdte



///teste

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private animeService: AnimeService) { }

  ngOnInit() {
    this.testFunction();
  }

  testFunction(){
    this.animeService.getTopAnimes().subscribe( data => {
      console.log(data);
    })
  }


}
