import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScheduleMySuffix } from './schedule-my-suffix.model';
import { ScheduleMySuffixPopupService } from './schedule-my-suffix-popup.service';
import { ScheduleMySuffixService } from './schedule-my-suffix.service';

@Component({
    selector: 'jhi-schedule-my-suffix-delete-dialog',
    templateUrl: './schedule-my-suffix-delete-dialog.component.html'
})
export class ScheduleMySuffixDeleteDialogComponent {

    schedule: ScheduleMySuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scheduleService: ScheduleMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['schedule']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scheduleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scheduleListModification',
                content: 'Deleted an schedule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-schedule-my-suffix-delete-popup',
    template: ''
})
export class ScheduleMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schedulePopupService: ScheduleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.schedulePopupService
                .open(ScheduleMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
