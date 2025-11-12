import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-castanyera-confirm-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './castanyera-confirm-dialog.html',
  styles: [
    `
      :host {
        display: block;
        padding: 16px;
      }
      .actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 16px;
      }
    `,
  ],
})
export class CastanyeraConfirmDialog {
  private dialogRef = inject(MatDialogRef) as MatDialogRef<CastanyeraConfirmDialog>;

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
