import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    ContainerComponent,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {
  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }
}
