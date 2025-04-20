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
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/books']),
      error: err => this.error = 'Неверный логин или пароль'
    });
  }
}