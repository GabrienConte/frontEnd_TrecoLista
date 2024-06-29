import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  //productsService = inject();

  matSnackBar = inject(MatSnackBar);

  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true, 
      validators: Validators.required
    }),
  });

  onSubmit() {
    // this.productsService.post({
    //   title: this.form.controls.title.value
    // })
    // .subscribe(() => {
    //   this.matSnackBar.open('Produto criado com sucesso!', "Ok");
    //   this.router.navigateByUrl('/');
    // });
  }
}
