import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicCategoryComponent } from './dinamic-category.component';

describe('DinamicCategoryComponent', () => {
  let component: DinamicCategoryComponent;
  let fixture: ComponentFixture<DinamicCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DinamicCategoryComponent]
    });
    fixture = TestBed.createComponent(DinamicCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
