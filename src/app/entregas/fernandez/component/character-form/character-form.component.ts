import { Component, inject, input, output, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Character } from '../../model';

@Component({
  selector: 'app-character-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterFormComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  
  character = input<Character | null>(null);
  isEditing = input<boolean>(false);
  
  formSubmitted = output<Partial<Character>>();
  formCancelled = output<void>();
  
  characterForm!: FormGroup;
  isSubmitting = signal<boolean>(false);
  

  
  ngOnInit(): void {
    this.initializeForm();
    
    const currentCharacter = this.character();
    if (currentCharacter) {
      this.populateForm(currentCharacter);
    }
  }
  
  private initializeForm(): void {
    this.characterForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      title: [''],
      family: [''],
      imageUrl: ['']
    });
  }
  
  private populateForm(character: Character): void {
    this.characterForm.patchValue({
      firstName: character.firstName,
      lastName: character.lastName,
      title: character.title,
      family: character.family,
      imageUrl: character.imageUrl || character.image
    });
  }
  
  getFieldErrors(fieldName: string): string[] {
    const field = this.characterForm.get(fieldName);
    const errors: string[] = [];
    
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        errors.push('Este campo es obligatorio');
      }
      if (field.errors?.['pattern']) {
        errors.push(this.getPatternErrorMessage(fieldName));
      }
      if (field.errors?.['maxlength']) {
        errors.push(`Máximo ${field.errors['maxlength'].requiredLength} caracteres`);
      }
    }
    
    return errors;
  }
  
  private getPatternErrorMessage(fieldName: string): string {
    return 'Formato inválido';
  }
  
  hasFieldErrors(fieldName: string): boolean {
    return this.getFieldErrors(fieldName).length > 0;
  }
  
  getFieldValidationClass(fieldName: string): string {
    const field = this.characterForm.get(fieldName);
    if (!field || (!field.dirty && !field.touched)) {
      return '';
    }
    
    return field.valid ? 'valid' : 'invalid';
  }
  
  onSubmit(): void {
    if (this.characterForm.valid) {
      this.isSubmitting.set(true);
      
      const formData = this.characterForm.value;
      const characterData: Partial<Character> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        title: formData.title,
        family: formData.family,
        imageUrl: formData.imageUrl
      };
      
      setTimeout(() => {
        this.formSubmitted.emit(characterData);
        this.isSubmitting.set(false);
      }, 1000);
    } else {
      this.markAllFieldsAsTouched();
    }
  }
  
  private markAllFieldsAsTouched(): void {
    Object.keys(this.characterForm.controls).forEach(key => {
      this.characterForm.get(key)?.markAsTouched();
    });
  }
  
  onCancel(): void {
    this.formCancelled.emit();
  }
  
  onReset(): void {
    this.characterForm.reset();
    const currentCharacter = this.character();
    if (currentCharacter) {
      this.populateForm(currentCharacter);
    }
  }
}