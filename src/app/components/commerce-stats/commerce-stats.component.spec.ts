import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceStatsComponent } from './commerce-stats.component';

describe('CommerceStatsComponent', () => {
  let component: CommerceStatsComponent;
  let fixture: ComponentFixture<CommerceStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommerceStatsComponent]
    });
    fixture = TestBed.createComponent(CommerceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
