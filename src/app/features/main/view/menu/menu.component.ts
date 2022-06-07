import { Component, OnInit } from '@angular/core';

import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  public items: MenuItem[];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: 'Início',
            icon: 'pi pi-home',
            routerLink: ['/'],
          },
          {
            label: 'Perfil',
            icon: 'pi pi-user',
          },
        ]
      },
      {
        label: 'Cadastros',
        items: [
          {
            label: 'Associações',
            icon: PrimeIcons.TH_LARGE,
            routerLink: ['/association'],
          },
          {
            label: 'Usuários',
            icon: PrimeIcons.USERS,
            routerLink: ['/person'],

          },
          {
            label: 'Atletas',
            icon: PrimeIcons.BOLT,
            routerLink: ['/athlete'],
          },
          {
            label: 'Professores',
            icon: PrimeIcons.ID_CARD,
            routerLink: ['/professor'],
          },
          {
            label: 'Exames de Graduação',
            icon: PrimeIcons.CALENDAR,
            routerLink: ['/graduation'],
          },
        ]
      },
      {
        label: 'Eventos',
        items: [{
          label: 'Cadastrados',
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
        },
        {
          label: 'Router',
          icon: 'pi pi-upload',
          routerLink: '/fileupload'
        }
        ]
      }
    ];
  }
}
