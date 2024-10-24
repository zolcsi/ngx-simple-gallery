import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './showcase-dialog.component.html',
  styleUrl: './showcase-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseDialogComponent {
  protected readonly data = inject(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
