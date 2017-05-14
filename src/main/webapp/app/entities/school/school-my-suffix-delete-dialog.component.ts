import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { SchoolMySuffix } from './school-my-suffix.model';
import { SchoolMySuffixPopupService } from './school-my-suffix-popup.service';
import { SchoolMySuffixService } from './school-my-suffix.service';

@Component({
    selector: 'jhi-school-my-suffix-delete-dialog',
    templateUrl: './school-my-suffix-delete-dialog.component.html'
})
export class SchoolMySuffixDeleteDialogComponent {

    school: SchoolMySuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private schoolService: SchoolMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['school']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.schoolService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'schoolListModification',
                content: 'Deleted an school'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-school-my-suffix-delete-popup',
    template: ''
})
export class SchoolMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolPopupService: SchoolMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.schoolPopupService
                .open(SchoolMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
