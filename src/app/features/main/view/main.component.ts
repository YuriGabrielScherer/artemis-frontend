import { animate, state, style, transition, trigger } from '@angular/animations';
import { CustomLocalStorage } from 'src/app/shared/storage/local-storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('parent', [
      transition(':enter', [])
    ]),
    trigger('menu', [
      state('void', style({ width: '0px' })),
      transition('* => void', animate('400ms cubic-bezier(0.25, 0.15, 0.25, 0.15)',)),
      transition('void => *', animate('400ms cubic-bezier(0.10, 0.15, 0.25, 0.15)',)),
    ])
  ]
})
export class MainComponent implements OnInit {

  public showMenu: boolean = true;

  ngOnInit(): void {
    this.showMenu = CustomLocalStorage.isMenuToggled();
  }

  public onToggleMenu(): void {
    this.showMenu = !this.showMenu;
    localStorage.setItem('isMenuToggled', this.showMenu ? 'true' : 'false');
  }


}
