import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from './feature/list/list.component';
import { CreateProductComponent } from './feature/create-product/create-product.component';
import { LoginComponent } from './feature/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'create-product',
        loadComponent: () => 
            import('./feature/create-product/create-product.component').then(
                m => CreateProductComponent
            )
    }
];
