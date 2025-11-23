import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesasListPage } from './despesas-list.page';

describe('DespesasListPage', () => {
  let component: DespesasListPage;
  let fixture: ComponentFixture<DespesasListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
