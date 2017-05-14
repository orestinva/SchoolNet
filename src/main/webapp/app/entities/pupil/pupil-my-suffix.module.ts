import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import { SchoolNetAdminModule } from '../../admin/admin.module';
import {
    PupilMySuffixService,
    PupilMySuffixPopupService,
    PupilMySuffixComponent,
    PupilMySuffixDetailComponent,
    PupilMySuffixDialogComponent,
    PupilMySuffixPopupComponent,
    PupilMySuffixDeletePopupComponent,
    PupilMySuffixDeleteDialogComponent,
    pupilRoute,
    pupilPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pupilRoute,
    ...pupilPopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        SchoolNetAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PupilMySuffixComponent,
        PupilMySuffixDetailComponent,
        PupilMySuffixDialogComponent,
        PupilMySuffixDeleteDialogComponent,
        PupilMySuffixPopupComponent,
        PupilMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PupilMySuffixComponent,
        PupilMySuffixDialogComponent,
        PupilMySuffixPopupComponent,
        PupilMySuffixDeleteDialogComponent,
        PupilMySuffixDeletePopupComponent,
    ],
    providers: [
        PupilMySuffixService,
        PupilMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetPupilMySuffixModule {}
