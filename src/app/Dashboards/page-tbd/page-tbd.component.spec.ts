import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTBDComponent } from './page-tbd.component';

describe('PageTBDComponent', () => {
  let component: PageTBDComponent;
  let fixture: ComponentFixture<PageTBDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTBDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTBDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
