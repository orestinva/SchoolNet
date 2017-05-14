import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { PupilMySuffix } from './pupil-my-suffix.model';
import { PupilMySuffixPopupService } from './pupil-my-suffix-popup.service';
import { PupilMySuffixService } from './pupil-my-suffix.service';

@Component({
    selector: 'jhi-pupil-my-suffix-delete-dialog',
    templateUrl: './pupil-my-suffix-delete-dialog.component.html'
})
export class PupilMySuffixDeleteDialogComponent {

    pupil: PupilMySuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private pupilService: PupilMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['pupil']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pupilService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pupilListModification',
                content: 'Deleted an pupil'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pupil-my-suffix-delete-popup',
    template: ''
})
export class PupilMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pupilPopupService: PupilMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.pupilPopupService
                .open(PupilMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
