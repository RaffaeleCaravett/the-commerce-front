import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProdottoComponent } from './view-prodotto.component';

describe('ViewProdottoComponent', () => {
  let component: ViewProdottoComponent;
  let fixture: ComponentFixture<ViewProdottoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProdottoComponent]
    });
    fixture = TestBed.createComponent(ViewProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
