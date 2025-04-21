import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        alert('Успешно зарегистрировано!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Ошибка регистрации');
        console.error(err);
      }
    });
  }
}
