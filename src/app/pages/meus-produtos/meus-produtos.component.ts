import { Component, ViewChild } from '@angular/core';
import { ContainerComponent } from "../../shared/components/container/container.component";
import { ActionContainerComponent } from "../../shared/components/action-container/action-container.component";
import { ListComponent } from "../../feature/list/list.component";

@Component({
    selector: 'app-meus-produtos',
    standalone: true,
    templateUrl: './meus-produtos.component.html',
    styleUrl: './meus-produtos.component.scss',
    imports: [ContainerComponent, ActionContainerComponent, ListComponent]
})
export class MeusProdutosComponent {

  @ViewChild('myProdutosComponent') myProdutosComponent!: ListComponent;

  aplicarFiltro(textoBusca: string): void {
    this.myProdutosComponent.aplicarFiltro(textoBusca);
  }
}
