import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('username: ', localStorage.getItem('username'));
    this.userName = localStorage.getItem('username') || '';
  }

  onLogout() {
    console.log('Logout clicked');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['/auth/login']);
  }
}
