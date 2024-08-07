import { Routes } from '@angular/router';
import { CreateProductComponent } from './feature/create-product/create-product.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUsuarioComponent } from './feature/create-usuario/create-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MeuPerfilComponent } from './pages/meu-perfil/meu-perfil.component';
import { authGuard } from './core/guards/auth.guard';
import { MeusProdutosComponent } from './pages/meus-produtos/meus-produtos.component';
import { ProdutoFormComponent } from './pages/produto-form/produto-form.component';
import { CategoriaFormComponent } from './pages/categoria-form/categoria-form.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { adminGuard } from './core/guards/admin.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'registro', component: CreateUsuarioComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'meusProdutos', component: MeusProdutosComponent, canActivate: [authGuard] },
    { path: 'treco-form',component: ProdutoFormComponent, canActivate: [authGuard] },
    { path: 'produto-form/:id',component: ProdutoFormComponent, canActivate: [authGuard] },
    { path: 'meuPerfil', component: MeuPerfilComponent, canActivate: [authGuard] },
    { path: 'categoria', component: CategoriasComponent, canActivate: [authGuard]},
    { path: 'categoria-form', component: CategoriaFormComponent, canActivate: [authGuard]},
    { path: 'categoria-form/:id', component: CategoriaFormComponent, canActivate: [authGuard]},
    { path: 'admin', component: AdministradorComponent, canActivate: [adminGuard] },
    { path: 'unauthorized', component: UnauthorizedComponent }

];
