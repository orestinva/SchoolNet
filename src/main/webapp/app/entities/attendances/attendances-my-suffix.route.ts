import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AttendancesMySuffixComponent } from './attendances-my-suffix.component';
import { AttendancesMySuffixDetailComponent } from './attendances-my-suffix-detail.component';
import { AttendancesMySuffixPopupComponent } from './attendances-my-suffix-dialog.component';
import { AttendancesMySuffixDeletePopupComponent } from './attendances-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const attendancesRoute: Routes = [
  {
    path: 'attendances-my-suffix',
    component: AttendancesMySuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.attendances.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'attendances-my-suffix/:id',
    component: AttendancesMySuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.attendances.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const attendancesPopupRoute: Routes = [
  {
    path: 'attendances-my-suffix-new',
    component: AttendancesMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.attendances.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'attendances-my-suffix/:id/edit',
    component: AttendancesMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.attendances.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'attendances-my-suffix/:id/delete',
    component: AttendancesMySuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.attendances.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
