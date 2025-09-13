import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let router: Router;

  beforeEach(async () => {
    // Mock de AuthService
    mockAuthService = {
      login: jasmine.createSpy('login')
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener formulario inicial vacío', () => {
    const form = component.loginForm;
    expect(form.value.email).toBe('');
    expect(form.value.password).toBe('');
  });

  it('debería establecer errorMessage si el formulario está vacío', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(component.errorMessage).toBe('Por favor, completa todos los campos correctamente.');
  });

  it('debería llamar a AuthService.login y navegar con credenciales correctas', () => {
    const spyNavigate = spyOn(router, 'navigate');
    mockAuthService.login.and.returnValue(of({ token: 'falso-token' }));

    component.loginForm.setValue({ email: 'test@test.com', password: '123456' });
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' });
    expect(spyNavigate).toHaveBeenCalledWith(['/task']);
    expect(component.errorMessage).toBeNull();
  });

  it('debería establecer errorMessage con credenciales incorrectas', () => {
    mockAuthService.login.and.returnValue(throwError(() => new Error('Credenciales incorrectas')));

    component.loginForm.setValue({ email: 'wrong@test.com', password: '123' });
    component.onSubmit();

    expect(component.errorMessage).toBe('Credenciales incorrectas. Por favor, intenta de nuevo.');
  });
});
