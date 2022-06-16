import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BeltDto, BeltSaveInput } from 'src/app/core/entities/belt/belt';
import { BeltService } from 'src/app/core/entities/belt/belt.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { BeltNamePipe } from 'src/app/shared/pipes/belt-name.pipe';

@Component({
    selector: 'app-belt-form',
    templateUrl: 'belt-form.component.html',
    providers: [BeltNamePipe]
})

export class BeltFormComponent implements OnInit {

    public isLoading: boolean = false;
    public form: FormGroup;
    public belt: BeltDto;

    constructor(
        private router: Router,
        private beltService: BeltService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private beltNamePipe: BeltNamePipe,
    ) {
        const state = router.getCurrentNavigation()?.extras.state;
        if (!state || !state['entity']) {
            this.router.navigate(['belt'], { replaceUrl: true });
            return;
        }
        const entity = state['entity'];
        this.belt = entity;
    }

    ngOnInit() {
        this.createForm();
    }

    public onSave(): void {
        if (this.form.invalid) {
            // Mark all fields as dirty
            return;
        }

        const payload: BeltSaveInput = this.form.value;
        payload.belt = this.belt.belt;
        this.isLoading = true;
        this.beltService.save(payload)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: () => {
                    this.toastService.success('Faixa alterada com sucesso.');
                    this.router.navigate(['belt'], { replaceUrl: true });
                }, error: (error) => {
                    console.log('Something went wrong: ', error);
                }
            })
    }

    public onCancel(): void {
        this.router.navigate(['belt'], { replaceUrl: true });
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            belt: [{ value: this.beltNamePipe.transform(this.belt.belt), disabled: true }, Validators.compose([Validators.required])],
            minMonths: [this.belt.minMonths, Validators.compose([Validators.required, Validators.min(1)])],
        });
    }
}