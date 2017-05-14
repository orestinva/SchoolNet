import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { SchoolMySuffix } from './school-my-suffix.model';
import { SchoolMySuffixPopupService } from './school-my-suffix-popup.service';
import { SchoolMySuffixService } from './school-my-suffix.service';

@Component({
    selector: 'jhi-school-my-suffix-dialog',
    templateUrl: './school-my-suffix-dialog.component.html'
})
export class SchoolMySuffixDialogComponent implements OnInit {

    school: SchoolMySuffix;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private schoolService: SchoolMySuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['school']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.school.id !== undefined) {
            this.schoolService.update(this.school)
                .subscribe((res: SchoolMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.schoolService.create(this.school)
                .subscribe((res: SchoolMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: SchoolMySuffix) {
        this.eventManager.broadcast({ name: 'schoolListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-school-my-suffix-popup',
    template: ''
})
export class SchoolMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolPopupService: SchoolMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.schoolPopupService
                    .open(SchoolMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.schoolPopupService
                    .open(SchoolMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
