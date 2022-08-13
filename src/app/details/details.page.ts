import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnimeService, Favorite } from '../services/anime.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  loaded: boolean = false;

  malID: any;
  aniTitle: any;
  thumbNail: string;
  aniSynopsis: string;
  url: string;
  type: string;
  episodes: number;
  startDate: Date;
  endDate: Date;
  members: number;
  score: number;
  extraPictures: any;
  videos: any;


  toFav: Favorite = {
    malID: "",
    name: "",
    img: "",
  }

  constructor(private activated_route: ActivatedRoute, private animeService: AnimeService) { }

  option={
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    autoplay: true,
  }

  ngOnInit() {
    this.activated_route.params.subscribe((data: Params) =>{
      this.malID = data['id'];
      this.aniTitle = data['title'];
    })
    
    this.getAnimeDetails();
    
  }

  getAnimeDetails(){
    this.animeService.searchAnime(this.aniTitle).subscribe( data => {
      data.forEach( element =>{
        if(element.mal_id == this.malID){
          
          this.thumbNail = element.image_url;
          this.aniSynopsis = element.synopsis; //Sometimes the Sysnopsis is incomplete because the API couldn't give it full
          this.url = element.url;
          this.type = element.type;
          this.episodes = element.episodes;
          if(element.start_date){this.startDate = new Date(element.start_date);
          }else{this.startDate = null;}
          if(element.end_date){this.endDate = new Date(element.end_date);
          }else{this.endDate = null;}
          this.members = element.members;
          this.score = element.score;

        }
      })

    })

    this.getPictures();
    this.getVideos();
    this.loaded = true;

  }

  redirectToExternal(url){
    window.open(url, '_system', 'location=yes');
  }

  getPictures(){
    this.animeService.getPictureForDetails(this.malID).subscribe( data =>{
      this.extraPictures = data;

    })
  }

  getVideos(){
    this.animeService.getVideosForDetails(this.malID).subscribe( data => {
      this.videos = data;
    })
  }

  addFavorites(){
    this.toFav.malID = this.malID;
    this.toFav.name = this.aniTitle;
    this.toFav.img = this.thumbNail;
    this.animeService.addAniveFavorite(this.toFav);

  }

}
