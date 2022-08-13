import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../services/anime.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private animeService: AnimeService, private alertController: AlertController) { }

  result: any = '';

  ngOnInit() {
    
  }

  async queryString(toQuery: string){

    if(!toQuery || toQuery.length < 4){
      const alert = await this.alertController.create({
        header: 'Fail to search',
        message: 'Please type at least 4 characters',
        buttons: ['OK']
      });
      await alert.present();
    }else{
      this.animeService.searchAnime(toQuery.toLocaleLowerCase()).subscribe( data => {
        this.result = data;
      }, async error => {
        const alert = await this.alertController.create({
          header: 'Fail to search',
          message: 'Took too long, for API response, try searching a different title',
          buttons: [{
            text: 'OK',
            handler: () => {
              window.location.reload();
            }
          }]
        });
        await alert.present();
      })
    }

  }

}
