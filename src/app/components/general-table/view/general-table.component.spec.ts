import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTableComponent } from './general-table.component';

describe('GeneralTableComponent', () => {
  let component: GeneralTableComponent<any>;
  let fixture: ComponentFixture<GeneralTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
