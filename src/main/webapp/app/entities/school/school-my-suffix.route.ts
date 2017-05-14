import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { SchoolMySuffixComponent } from './school-my-suffix.component';
import { SchoolMySuffixDetailComponent } from './school-my-suffix-detail.component';
import { SchoolMySuffixPopupComponent } from './school-my-suffix-dialog.component';
import { SchoolMySuffixDeletePopupComponent } from './school-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const schoolRoute: Routes = [
  {
    path: 'school-my-suffix',
    component: SchoolMySuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.school.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'school-my-suffix/:id',
    component: SchoolMySuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.school.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const schoolPopupRoute: Routes = [
  {
    path: 'school-my-suffix-new',
    component: SchoolMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.school.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'school-my-suffix/:id/edit',
    component: SchoolMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.school.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'school-my-suffix/:id/delete',
    component: SchoolMySuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.school.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
