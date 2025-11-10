import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CastanyeraConfirmDialog } from '../castanyera-confirm-dialogue/castanyera-confirm-dialog';

@Component({
  selector: 'app-castanyera-menu-button',
  standalone: true,
  imports: [RouterModule, MatDialogModule, MatButtonModule, CastanyeraConfirmDialog],
  templateUrl: './castanyera-menu-button.html',
  styleUrls: ['./castanyera-menu-button.css'],
})
export class CastanyeraMenuButton {
  private dialog = inject(MatDialog);
  private router = inject(Router);

  openConfirm() {
    const ref = this.dialog.open(CastanyeraConfirmDialog, { width: '360px' });
    ref.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/']);
      }
    });
  }
}
