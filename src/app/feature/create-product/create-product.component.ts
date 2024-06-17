import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule
    ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true, 
      validators: Validators.required
    }),
  });

  onSubmit() {
    this.form.controls.title.value;
  }
}
