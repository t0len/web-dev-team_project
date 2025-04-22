import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
//import { EditUserDialogComponent } from './edit-user-dialog.component';
import { User } from '../../types';


@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  private adminService = inject(AdminService);
  private dialog = inject(MatDialog);
  
  displayedColumns = ['id', 'email', 'name', 'isAdmin', 'actions'];
  users: User[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  // editUser(user: User) {
  //   this.dialog.open(EditUserDialogComponent, {
  //     data: user,
  //     width: '400px'
  //   }).afterClosed().subscribe(updated => {
  //     if (updated) this.loadUsers();
  //   });
  // }
}
