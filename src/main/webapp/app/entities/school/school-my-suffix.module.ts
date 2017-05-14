import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import {
    SchoolMySuffixService,
    SchoolMySuffixPopupService,
    SchoolMySuffixComponent,
    SchoolMySuffixDetailComponent,
    SchoolMySuffixDialogComponent,
    SchoolMySuffixPopupComponent,
    SchoolMySuffixDeletePopupComponent,
    SchoolMySuffixDeleteDialogComponent,
    schoolRoute,
    schoolPopupRoute,
} from './';

const ENTITY_STATES = [
    ...schoolRoute,
    ...schoolPopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SchoolMySuffixComponent,
        SchoolMySuffixDetailComponent,
        SchoolMySuffixDialogComponent,
        SchoolMySuffixDeleteDialogComponent,
        SchoolMySuffixPopupComponent,
        SchoolMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SchoolMySuffixComponent,
        SchoolMySuffixDialogComponent,
        SchoolMySuffixPopupComponent,
        SchoolMySuffixDeleteDialogComponent,
        SchoolMySuffixDeletePopupComponent,
    ],
    providers: [
        SchoolMySuffixService,
        SchoolMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetSchoolMySuffixModule {}
