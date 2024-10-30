import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';
import { ILogin } from '../../Models/ILogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: ILogin = { email: '', password: '' };
  registerData = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    roleId: 2,
  };
  forgotPasswordData = { email: '', newPassword: '' };
  isRegisterModalOpen = false;
  isForgotPasswordModalOpen = false;
  errorMessage = '';

  private readonly loginService: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);

  onSubmit(): void {
    this.loginService.login(this.credentials).subscribe(
      (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage =
          error?.error?.message ||
          'Ocurrió un error inesperado. Inténtalo de nuevo.';
      }
    );
  }

  openRegisterModal(): void {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal(): void {
    this.isRegisterModalOpen = false;
  }

  registerUser(): void {
    this.loginService.register(this.registerData).subscribe(
      () => {
        this.closeRegisterModal();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openForgotPasswordModal(): void {
    this.isForgotPasswordModalOpen = true;
  }

  closeForgotPasswordModal(): void {
    this.isForgotPasswordModalOpen = false;
  }

  resetPassword(): void {
    this.loginService.resetPassword(this.forgotPasswordData).subscribe(
      () => {
        this.closeForgotPasswordModal();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
