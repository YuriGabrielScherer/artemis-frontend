import { Component, EventEmitter, Output } from '@angular/core';
import { CustomLocalStorage } from 'src/app/shared/storage/local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output('toggleMenu') toggleMenuEvent = new EventEmitter<undefined>();
  public showMenu: boolean = false;

  constructor() {
    this.showMenu = CustomLocalStorage.isMenuToggled();
  }

  public toggleMenu(): void {
    CustomLocalStorage.toggleMenu();
    this.showMenu = !this.showMenu;
    this.toggleMenuEvent.next(undefined);
  }

}
