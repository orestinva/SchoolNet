import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolNetSharedModule } from '../../shared';
import { SchoolNetAdminModule } from '../../admin/admin.module';
import {
    ParentMySuffixService,
    ParentMySuffixPopupService,
    ParentMySuffixComponent,
    ParentMySuffixDetailComponent,
    ParentMySuffixDialogComponent,
    ParentMySuffixPopupComponent,
    ParentMySuffixDeletePopupComponent,
    ParentMySuffixDeleteDialogComponent,
    parentRoute,
    parentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...parentRoute,
    ...parentPopupRoute,
];

@NgModule({
    imports: [
        SchoolNetSharedModule,
        SchoolNetAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ParentMySuffixComponent,
        ParentMySuffixDetailComponent,
        ParentMySuffixDialogComponent,
        ParentMySuffixDeleteDialogComponent,
        ParentMySuffixPopupComponent,
        ParentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ParentMySuffixComponent,
        ParentMySuffixDialogComponent,
        ParentMySuffixPopupComponent,
        ParentMySuffixDeleteDialogComponent,
        ParentMySuffixDeletePopupComponent,
    ],
    providers: [
        ParentMySuffixService,
        ParentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolNetParentMySuffixModule {}
