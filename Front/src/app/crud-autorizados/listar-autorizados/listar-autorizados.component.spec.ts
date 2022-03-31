import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAutorizadosComponent } from './listar-autorizados.component';

describe('ListarEmpleadosComponent', () => {
  let component: ListarAutorizadosComponent;
  let fixture: ComponentFixture<ListarAutorizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAutorizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAutorizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
