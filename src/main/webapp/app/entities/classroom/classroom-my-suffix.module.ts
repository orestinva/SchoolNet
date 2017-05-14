import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import {
    ClassroomMySuffixService,
    ClassroomMySuffixPopupService,
    ClassroomMySuffixComponent,
    ClassroomMySuffixDetailComponent,
    ClassroomMySuffixDialogComponent,
    ClassroomMySuffixPopupComponent,
    ClassroomMySuffixDeletePopupComponent,
    ClassroomMySuffixDeleteDialogComponent,
    classroomRoute,
    classroomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...classroomRoute,
    ...classroomPopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ClassroomMySuffixComponent,
        ClassroomMySuffixDetailComponent,
        ClassroomMySuffixDialogComponent,
        ClassroomMySuffixDeleteDialogComponent,
        ClassroomMySuffixPopupComponent,
        ClassroomMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ClassroomMySuffixComponent,
        ClassroomMySuffixDialogComponent,
        ClassroomMySuffixPopupComponent,
        ClassroomMySuffixDeleteDialogComponent,
        ClassroomMySuffixDeletePopupComponent,
    ],
    providers: [
        ClassroomMySuffixService,
        ClassroomMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetClassroomMySuffixModule {}
