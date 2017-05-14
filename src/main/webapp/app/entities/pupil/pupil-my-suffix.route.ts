import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PupilMySuffixComponent } from './pupil-my-suffix.component';
import { PupilMySuffixDetailComponent } from './pupil-my-suffix-detail.component';
import { PupilMySuffixPopupComponent } from './pupil-my-suffix-dialog.component';
import { PupilMySuffixDeletePopupComponent } from './pupil-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const pupilRoute: Routes = [
  {
    path: 'pupil-my-suffix',
    component: PupilMySuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.pupil.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'pupil-my-suffix/:id',
    component: PupilMySuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.pupil.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pupilPopupRoute: Routes = [
  {
    path: 'pupil-my-suffix-new',
    component: PupilMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.pupil.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'pupil-my-suffix/:id/edit',
    component: PupilMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.pupil.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'pupil-my-suffix/:id/delete',
    component: PupilMySuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.pupil.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
