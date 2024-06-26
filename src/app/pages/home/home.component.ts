import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { ListComponent } from '../../feature/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContainerComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
