import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IEPMainDashboardComponent } from './iepmain-dashboard.component';

describe('IEPMainDashboardComponent', () => {
  let component: IEPMainDashboardComponent;
  let fixture: ComponentFixture<IEPMainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IEPMainDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IEPMainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
