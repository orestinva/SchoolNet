import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { AttendancesMySuffix } from './attendances-my-suffix.model';
import { AttendancesMySuffixPopupService } from './attendances-my-suffix-popup.service';
import { AttendancesMySuffixService } from './attendances-my-suffix.service';

@Component({
    selector: 'jhi-attendances-my-suffix-delete-dialog',
    templateUrl: './attendances-my-suffix-delete-dialog.component.html'
})
export class AttendancesMySuffixDeleteDialogComponent {

    attendances: AttendancesMySuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private attendancesService: AttendancesMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['attendances']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.attendancesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'attendancesListModification',
                content: 'Deleted an attendances'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-attendances-my-suffix-delete-popup',
    template: ''
})
export class AttendancesMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attendancesPopupService: AttendancesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.attendancesPopupService
                .open(AttendancesMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
