import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../services/anime.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  animes: any;

  constructor(
    private animeService: AnimeService, private router: Router) { }

  ngOnInit() {
    this.getTop();
  }

  ionViewWillEnter(){
    this.getTop();
  }

  getTop(){
    this.animeService.getTopAnimes().subscribe( data => {
      this.animes = data;
    })
  }

  // itemSelected(ani){
  //   this.router.navigate(['/details',ani.mal_id, ani.title ]);
  //   //this.router.navigate(['details',{id: ani.mal_id, title: ani.title} ]);
  // }

}
