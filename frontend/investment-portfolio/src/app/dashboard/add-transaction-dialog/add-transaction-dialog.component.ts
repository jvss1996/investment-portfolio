import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.css']
})
export class AddTransactionDialogComponent {
  transactionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      quantity: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onAdd(): void {
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transactionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
