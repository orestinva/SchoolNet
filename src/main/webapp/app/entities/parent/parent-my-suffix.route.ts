import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ParentMySuffixComponent } from './parent-my-suffix.component';
import { ParentMySuffixDetailComponent } from './parent-my-suffix-detail.component';
import { ParentMySuffixPopupComponent } from './parent-my-suffix-dialog.component';
import { ParentMySuffixDeletePopupComponent } from './parent-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const parentRoute: Routes = [
  {
    path: 'parent-my-suffix',
    component: ParentMySuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.parent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'parent-my-suffix/:id',
    component: ParentMySuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.parent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const parentPopupRoute: Routes = [
  {
    path: 'parent-my-suffix-new',
    component: ParentMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.parent.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'parent-my-suffix/:id/edit',
    component: ParentMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.parent.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'parent-my-suffix/:id/delete',
    component: ParentMySuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.parent.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
