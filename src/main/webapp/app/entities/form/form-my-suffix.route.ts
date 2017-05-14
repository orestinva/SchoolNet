import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { FormMySuffixComponent } from './form-my-suffix.component';
import { FormMySuffixDetailComponent } from './form-my-suffix-detail.component';
import { FormMySuffixPopupComponent } from './form-my-suffix-dialog.component';
import { FormMySuffixDeletePopupComponent } from './form-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const formRoute: Routes = [
  {
    path: 'form-my-suffix',
    component: FormMySuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.form.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'form-my-suffix/:id',
    component: FormMySuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.form.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const formPopupRoute: Routes = [
  {
    path: 'form-my-suffix-new',
    component: FormMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.form.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'form-my-suffix/:id/edit',
    component: FormMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.form.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'form-my-suffix/:id/delete',
    component: FormMySuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.form.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
