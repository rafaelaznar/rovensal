import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  constructor(private formService: FormService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      interest: [null, Validators.required],
      phone: [null, Validators.required],
      message: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  form: FormGroup;

  submit$ = new Subject<void>();
  loading = false;

  // ejemplo de RxJS para formularios
  ngOnInit() {
    this.submit$
      .pipe(
        // continua si el formulario es valido
        filter(() => this.form.valid),

        // ignorar clicks repetidos
        exhaustMap(() => {
          this.loading = true; // activar el estado de carga

          console.log(this.form.value);

          // enviar los datos al servidor
          return (
            this.formService
              .sendForm(this.form.value)
              // "finalize" se ejecuta al terminar el request
              .pipe(finalize(() => (this.loading = false)))
          );
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      // marcar todos los inputs para mostrar erores
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
    }
    this.submit$.next(); // dispara el flujo de envío del formulario
  }
}
