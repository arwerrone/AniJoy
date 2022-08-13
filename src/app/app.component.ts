import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Top', url: '/home', icon: 'arrow-up' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'Search', url: '/search', icon: 'search' },
    { title: 'Random Quote', url: '/quote', icon: 'chatbubble-ellipses' },
  ];

  
  constructor() {}
}
