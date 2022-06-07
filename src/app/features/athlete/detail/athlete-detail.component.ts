import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AthleteDto } from 'src/app/core/entities/athlete/athlete';

@Component({
    selector: 'app-athlete-detail',
    templateUrl: 'athlete-detail.component.html',
    styleUrls: ['./athlete-detail.component.css']
})

export class AthleteDetailComponent implements OnInit {

    public athlete: AthleteDto;
    public isLoading: boolean = false;

    constructor(
        private location: Location,
        private router: Router,
    ) {
        const state = this.router.getCurrentNavigation()?.extras.state;
        if (!state) {
            this.router.navigate(['/athlete']);
            return;
        }

        this.athlete = state['entity'];
    }

    ngOnInit() { }

    public onGoBack(): void {
        this.location.back();
    }
}