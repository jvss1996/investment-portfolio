import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  newTransaction: any = {type: '', name: '', amount: 0, quantity: 0, date: new Date()};

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.dashboardService.getTransactions(+userId).subscribe({
        next: (data) => {
          this.transactions = data;
        },
        error: (err) => {
          console.error('Error loading transactions: ', err);
        }
      });
    } else {
      console.log('No user ID found in local storage');
      this.router.navigate(['/auth/login']);
    }
  }

  onAddTransaction() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.newTransaction.user = { id: +userId };
      this.dashboardService.addTransaction(this.newTransaction).subscribe({
        next: (response) => {
          this.newTransaction = {type: '', name: '', amount: 0, quantity: 0, date: new Date()};
          this.loadTransactions();
        },
        error: (err) => {
          console.error('Error adding transaction: ', err);
        }
      });
    } else {
      console.log('No user ID found in local storage');
      this.router.navigate(['/auth/login']);
    }
  }

  onLogout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }
}
