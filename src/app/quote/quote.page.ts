import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../services/anime.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {

  constructor(private animeService: AnimeService) { }
  gotQuote: boolean = false;
  receptor: any;

  ngOnInit() {

  }

  getQuote(){
    this.animeService.getRandomQuote().subscribe( data => {
      this.receptor = data;
      this.gotQuote = true;
    })
  }

}
