import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TeacherMySuffixComponent } from './teacher-my-suffix.component';
import { TeacherMySuffixDetailComponent } from './teacher-my-suffix-detail.component';
import { TeacherMySuffixPopupComponent } from './teacher-my-suffix-dialog.component';
import { TeacherMySuffixDeletePopupComponent } from './teacher-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const teacherRoute: Routes = [
  {
    path: 'teacher-my-suffix',
    component: TeacherMySuffixComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'teacher-my-suffix/:id',
    component: TeacherMySuffixDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const teacherPopupRoute: Routes = [
  {
    path: 'teacher-my-suffix-new',
    component: TeacherMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'teacher-my-suffix/:id/edit',
    component: TeacherMySuffixPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'teacher-my-suffix/:id/delete',
    component: TeacherMySuffixDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'schoolNetApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
