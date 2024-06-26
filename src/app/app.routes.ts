import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from './feature/list/list.component';
import { CreateProductComponent } from './feature/create-product/create-product.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUsuarioComponent } from './feature/create-usuario/create-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: CreateUsuarioComponent },
    { path: 'home', component: HomeComponent },
    { path: 'categoria', component: CategoriasComponent},
    {
        path: 'create-product',
        loadComponent: () => 
            import('./feature/create-product/create-product.component').then(
                m => CreateProductComponent
            )
    }
];
