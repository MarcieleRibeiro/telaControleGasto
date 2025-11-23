import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesaCreatePage } from './despesa-create.page';

describe('DespesaCreatePage', () => {
  let component: DespesaCreatePage;
  let fixture: ComponentFixture<DespesaCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
