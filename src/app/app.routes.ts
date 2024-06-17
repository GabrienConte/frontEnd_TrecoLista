import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from './feature/list/list.component';
import { CreateProductComponent } from './feature/create-product/create-product.component';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'create-product',
        component: CreateProductComponent
    }
];
