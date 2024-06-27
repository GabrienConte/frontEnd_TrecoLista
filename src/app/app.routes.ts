import { Routes } from '@angular/router';
import { CreateProductComponent } from './feature/create-product/create-product.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUsuarioComponent } from './feature/create-usuario/create-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MeuPerfilComponent } from './pages/meu-perfil/meu-perfil.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'registro', component: CreateUsuarioComponent },
    { path: 'home', component: HomeComponent },
    { path: 'meuPerfil', component: MeuPerfilComponent },
    { path: 'categoria', component: CategoriasComponent},
    {
        path: 'create-product',
        loadComponent: () => 
            import('./feature/create-product/create-product.component').then(
                m => CreateProductComponent
            )
    }
];
