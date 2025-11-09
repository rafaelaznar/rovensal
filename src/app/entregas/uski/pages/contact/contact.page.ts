import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { exhaustMap, filter, finalize, Subject } from 'rxjs';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.css',
  standalone: true,
})
export class UskiContactPage {
  form: FormGroup = new FormGroup({
    username: new FormControl(null),
    email: new FormControl(null),
    interest: new FormControl(),
    phone: new FormControl(null),
    message: new FormControl(null),
  });

  submit$ = new Subject<void>();
  loading = false;

  constructor(private formService: FormService) {
    
  }

  ngOnInit() {
    this.submit$
      .pipe(
        filter(() => this.form.valid),
        exhaustMap(() => {
          this.loading = true;
          return this.formService.sendForm(this.form.value).pipe(
            finalize(() => this.loading = false)
          );
        })
      )
      .subscribe();
  }

  onSubmit() {
    this.submit$.next();
  }
}
