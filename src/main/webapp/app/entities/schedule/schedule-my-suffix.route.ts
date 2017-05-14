import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScheduleMySuffixComponent } from './schedule-my-suffix.component';
import { ScheduleMySuffixDetailComponent } from './schedule-my-suffix-detail.component';
import { ScheduleMySuffixPopupComponent } from './schedule-my-suffix-dialog.component';
import { ScheduleMySuffixDeletePopupComponent } from './schedule-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const scheduleRoute: Routes = [
  {
    path: 'schedule-my-suffix',
    component: ScheduleMySuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.schedule.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'schedule-my-suffix/:id',
    component: ScheduleMySuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.schedule.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const schedulePopupRoute: Routes = [
  {
    path: 'schedule-my-suffix-new',
    component: ScheduleMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.schedule.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'schedule-my-suffix/:id/edit',
    component: ScheduleMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.schedule.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'schedule-my-suffix/:id/delete',
    component: ScheduleMySuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.schedule.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
