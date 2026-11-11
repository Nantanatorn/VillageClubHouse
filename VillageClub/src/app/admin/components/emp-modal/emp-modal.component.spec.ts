import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpModalComponent } from './emp-modal.component';

describe('EmpModalComponent', () => {
  let component: EmpModalComponent;
  let fixture: ComponentFixture<EmpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
