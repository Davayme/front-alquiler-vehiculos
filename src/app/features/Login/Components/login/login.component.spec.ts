import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginService } from '../../Services/login.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],
      providers: [LoginService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service on form submit', () => {
    const loginSpy = spyOn(loginService, 'login').and.returnValue(of('token'));
    component.credentials = { email: 'test@example.com', password: 'password' };
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should display error message on login failure', () => {
    spyOn(loginService, 'login').and.returnValue(
      throwError(() => new Error('Unauthorized'))
    );
    component.credentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };
    component.onSubmit();
    expect(component.errorMessage).toBe(
      'Ocurrió un error inesperado. Inténtalo de nuevo.'
    );
  });

  it('should open and close the registration modal', () => {
    component.openRegisterModal();
    expect(component.isRegisterModalOpen).toBeTrue();
    component.closeRegisterModal();
    expect(component.isRegisterModalOpen).toBeFalse();
  });

  it('should open and close the forgot password modal', () => {
    component.openForgotPasswordModal();
    expect(component.isForgotPasswordModalOpen).toBeTrue();
    component.closeForgotPasswordModal();
    expect(component.isForgotPasswordModalOpen).toBeFalse();
  });
});
