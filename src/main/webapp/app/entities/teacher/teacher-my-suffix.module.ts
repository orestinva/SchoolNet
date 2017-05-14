import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import { SchoolNetAdminModule } from '../../admin/admin.module';
import {
    TeacherMySuffixService,
    TeacherMySuffixPopupService,
    TeacherMySuffixComponent,
    TeacherMySuffixDetailComponent,
    TeacherMySuffixDialogComponent,
    TeacherMySuffixPopupComponent,
    TeacherMySuffixDeletePopupComponent,
    TeacherMySuffixDeleteDialogComponent,
    teacherRoute,
    teacherPopupRoute,
} from './';

const ENTITY_STATES = [
    ...teacherRoute,
    ...teacherPopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        SchoolNetAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TeacherMySuffixComponent,
        TeacherMySuffixDetailComponent,
        TeacherMySuffixDialogComponent,
        TeacherMySuffixDeleteDialogComponent,
        TeacherMySuffixPopupComponent,
        TeacherMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TeacherMySuffixComponent,
        TeacherMySuffixDialogComponent,
        TeacherMySuffixPopupComponent,
        TeacherMySuffixDeleteDialogComponent,
        TeacherMySuffixDeletePopupComponent,
    ],
    providers: [
        TeacherMySuffixService,
        TeacherMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetTeacherMySuffixModule {}
