import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email = '';
  password = '';
  /*error = '';*/

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']); // после логина — на главную
      },
      error: (err) => {
        alert('Неверный логин или пароль');
        console.error(err);
      }
    });
  }
}