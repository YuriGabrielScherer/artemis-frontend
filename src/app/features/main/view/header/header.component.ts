import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('toggleMenu') toggleMenuEvent = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.toggleMenuEvent.next(undefined);
  }

}
