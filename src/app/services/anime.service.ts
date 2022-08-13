import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

const URL = 'https://jikan1.p.rapidapi.com/';
const api_host = 'jikan1.p.rapidapi.com';
const api_key = '8945cdd55emshdd923e137a7cc2dp1bf431jsn52087ee7fa89';

export interface Favorite{
  malID: string,
  name: string,
}

const ANIME_KEY = 'my-animes';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage, private alertController: AlertController, private router: Router) { 
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  getTopAnimes(){
    return this.http.get(`${URL}top/anime/1/upcoming`, {
      headers: {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': api_host
      }
    }).pipe(
      map(data => data['top']));
  }

  searchAnime(que){
    return this.http.get(`${URL}search/anime`,{
      params: {q: que},
      headers: {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': api_host
      }
    }).pipe(
      map(data => data['results']));
  }

  getPictureForDetails(id){
    return this.http.get(`${URL}anime/${id}/pictures`,{
      headers: {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': api_host
      }
    }).pipe(
      map(data => data['pictures']));
  }

  getVideosForDetails(id){
    return this.http.get(`${URL}anime/${id}/videos`,{
      headers: {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': api_host
      }
    }).pipe(
      map(data => data['promo']));
  }

  //-------------------- STORAGE SECTION -----------------------//

  async saveSuccess(){
    const alert = await this.alertController.create({
      header: 'Done!',
      message: 'Anime Added To Favorite List',
      //buttons: ['OK']
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/favorites']);
        }
      }]
    });

    await alert.present();
  }

  addAniveFavorite(toFav: Favorite){
    this.storage.get(ANIME_KEY).then( async (animes: Favorite[]) => {
      if(!animes || animes.length === 0){
        this.storage.set(ANIME_KEY, [toFav]);
        this.saveSuccess();
      }else{
        let ok = false;
        for (let i of animes){
          if(toFav.malID == i.malID){
            ok = true;
          }
        }

        if(!ok){
          animes.push(toFav);
          this.storage.set(ANIME_KEY, animes);
          this.saveSuccess();
        }else{
          const alert = await this.alertController.create({
            header: 'Error!',
            message: 'Anime Already In Favorite',
            buttons: ['OK']
          });
      
          await alert.present();
        }
      }
    })
  }

}
