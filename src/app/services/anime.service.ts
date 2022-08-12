import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


const URL = 'https://jikan1.p.rapidapi.com/';
const api_host = 'jikan1.p.rapidapi.com';
const api_key = '8945cdd55emshdd923e137a7cc2dp1bf431jsn52087ee7fa89';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {




  constructor(private http: HttpClient) { }

  
  getTopAnimes(){
    return this.http.get(`${URL}top/anime/1/upcoming`, {
      headers: {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': api_host
      }
    }).pipe(
      map(data => data['top']));
  }


  // getTopAnimes(){
  //   return this.http.get('https://jikan1.p.rapidapi.com/top/anime/1/upcoming', {
  //     headers: {
  //       'X-RapidAPI-Key': '8945cdd55emshdd923e137a7cc2dp1bf431jsn52087ee7fa89',
  //       'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
  //     }
  //   }).pipe(
  //     map(data => data['top']));
  // }



}
