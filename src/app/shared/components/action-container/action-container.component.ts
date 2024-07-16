import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-action-container',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule, 
    MatDividerModule,
    MatIconModule, 
    RouterLink
  ],
  templateUrl: './action-container.component.html',
  styleUrl: './action-container.component.scss'
})
export class ActionContainerComponent {
  @Input() variantLabels: 'Treco' | 'Categoria' = 'Treco';
  @Output() searchEvent = new EventEmitter<string>();

  searchItens(event: Event) {
    const input = (event.target as HTMLInputElement).value.trim();
    this.searchEvent.emit(input);
  }
}
