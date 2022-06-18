import { Component, OnInit } from '@angular/core';
import { AssociationService } from 'src/app/core/entities/association/association.service';
import { AthleteService } from 'src/app/core/entities/athlete/athlete.service';
import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { ProfessorService } from 'src/app/core/entities/professor/professor.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {



    constructor(
        public personService: PersonService,
        public athleteService: AthleteService,
        public professorService: ProfessorService,
        public graduationService: GraduationService,
    ) { }

    ngOnInit() {
      
    }
}