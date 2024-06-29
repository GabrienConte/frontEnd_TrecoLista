import { Routes } from '@angular/router';
import { CreateProductComponent } from './feature/create-product/create-product.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUsuarioComponent } from './feature/create-usuario/create-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MeuPerfilComponent } from './pages/meu-perfil/meu-perfil.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'registro', component: CreateUsuarioComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'meuPerfil', component: MeuPerfilComponent, canActivate: [authGuard] },
    { path: 'categoria', component: CategoriasComponent, canActivate: [authGuard]},
    {
        path: 'create-product',
        loadComponent: () => 
            import('./feature/create-product/create-product.component').then(
                m => CreateProductComponent
            ),
        canActivate: [authGuard]
    }
];
