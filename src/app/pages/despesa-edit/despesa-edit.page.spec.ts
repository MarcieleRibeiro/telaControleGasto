import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesaEditPage } from './despesa-edit.page';

describe('DespesaEditPage', () => {
  let component: DespesaEditPage;
  let fixture: ComponentFixture<DespesaEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
