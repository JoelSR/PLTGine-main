import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAutorizadoComponent } from './agregar-autorizado.component';

describe('AgregarEmpleadosComponent', () => {
  let component: AgregarAutorizadoComponent;
  let fixture: ComponentFixture<AgregarAutorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAutorizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAutorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
