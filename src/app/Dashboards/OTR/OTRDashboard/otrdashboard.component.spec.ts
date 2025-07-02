import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTRDashboardComponent } from './otrdashboard.component';

describe('OTRDashboardComponent', () => {
  let component: OTRDashboardComponent;
  let fixture: ComponentFixture<OTRDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OTRDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OTRDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
