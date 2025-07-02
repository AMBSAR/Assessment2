import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspoDashboardComponent } from './ispo-dashboard.component';

describe('IspoDashboardComponent', () => {
  let component: IspoDashboardComponent;
  let fixture: ComponentFixture<IspoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IspoDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IspoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
