import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import {
    AttendancesMySuffixService,
    AttendancesMySuffixPopupService,
    AttendancesMySuffixComponent,
    AttendancesMySuffixDetailComponent,
    AttendancesMySuffixDialogComponent,
    AttendancesMySuffixPopupComponent,
    AttendancesMySuffixDeletePopupComponent,
    AttendancesMySuffixDeleteDialogComponent,
    attendancesRoute,
    attendancesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...attendancesRoute,
    ...attendancesPopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AttendancesMySuffixComponent,
        AttendancesMySuffixDetailComponent,
        AttendancesMySuffixDialogComponent,
        AttendancesMySuffixDeleteDialogComponent,
        AttendancesMySuffixPopupComponent,
        AttendancesMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AttendancesMySuffixComponent,
        AttendancesMySuffixDialogComponent,
        AttendancesMySuffixPopupComponent,
        AttendancesMySuffixDeleteDialogComponent,
        AttendancesMySuffixDeletePopupComponent,
    ],
    providers: [
        AttendancesMySuffixService,
        AttendancesMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetAttendancesMySuffixModule {}
