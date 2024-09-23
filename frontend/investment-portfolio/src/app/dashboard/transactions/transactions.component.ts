import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionDialogComponent } from '../add-transaction-dialog/add-transaction-dialog.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  transactions = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'type', 'quantity', 'amount', 'date'];
  newTransaction: any = {type: '', name: '', amount: 0, quantity: 0, date: new Date()};

  constructor(private dashboardService: DashboardService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.dashboardService.getTransactions(+userId).subscribe({
        next: (data) => {
          this.transactions.data = data;
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

  onAddTransaction(transaction: any) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      transaction.user = { id: +userId };
      this.dashboardService.addTransaction(transaction).subscribe({
        next: (response) => {
          console.log('Transaction added successfully: ', response);
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

  openAddTransactionDialog() {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactions.data = [...this.transactions.data, result];
        this.onAddTransaction(result);
      }
    });
  }

  onLogout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['/auth/login']);
  }
}
