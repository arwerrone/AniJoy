import { Component, OnInit } from '@angular/core';
import { AnimeService, Favorite } from '../services/anime.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favoriteList: Favorite[] = null;

  constructor(private animeService: AnimeService) { }

  ngOnInit() {
    this.loadFavList();
  }
  ionViewWillEnter(){
    this.loadFavList();
  }

  loadFavList(){
    this.animeService.loadFavorites().then(animes => {
      this.favoriteList = animes;
    })
  }

  removeFavorite(toRemove){
    this.animeService.deleteFromFavorite(toRemove.malID);
    window.location.reload();
  }

}
