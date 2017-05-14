import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ParentMySuffix } from './parent-my-suffix.model';
import { ParentMySuffixPopupService } from './parent-my-suffix-popup.service';
import { ParentMySuffixService } from './parent-my-suffix.service';

@Component({
    selector: 'jhi-parent-my-suffix-delete-dialog',
    templateUrl: './parent-my-suffix-delete-dialog.component.html'
})
export class ParentMySuffixDeleteDialogComponent {

    parent: ParentMySuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private parentService: ParentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['parent']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'parentListModification',
                content: 'Deleted an parent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parent-my-suffix-delete-popup',
    template: ''
})
export class ParentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parentPopupService: ParentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.parentPopupService
                .open(ParentMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
