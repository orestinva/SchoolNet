import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { FormMySuffix } from './form-my-suffix.model';
import { FormMySuffixPopupService } from './form-my-suffix-popup.service';
import { FormMySuffixService } from './form-my-suffix.service';
import { SchoolMySuffix, SchoolMySuffixService } from '../school';

@Component({
    selector: 'jhi-form-my-suffix-dialog',
    templateUrl: './form-my-suffix-dialog.component.html'
})
export class FormMySuffixDialogComponent implements OnInit {

    form: FormMySuffix;
    authorities: any[];
    isSaving: boolean;

    schools: SchoolMySuffix[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private formService: FormMySuffixService,
        private schoolService: SchoolMySuffixService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['form']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.schoolService.query().subscribe(
            (res: Response) => { this.schools = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.form.id !== undefined) {
            this.formService.update(this.form)
                .subscribe((res: FormMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.formService.create(this.form)
                .subscribe((res: FormMySuffix) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: FormMySuffix) {
        this.eventManager.broadcast({ name: 'formListModification', content: 'OK'});
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

    trackSchoolById(index: number, item: SchoolMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-form-my-suffix-popup',
    template: ''
})
export class FormMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formPopupService: FormMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.formPopupService
                    .open(FormMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.formPopupService
                    .open(FormMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
