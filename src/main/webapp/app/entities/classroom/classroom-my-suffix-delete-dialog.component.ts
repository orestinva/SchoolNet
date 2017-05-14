import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { ClassroomMySuffixPopupService } from './classroom-my-suffix-popup.service';
import { ClassroomMySuffixService } from './classroom-my-suffix.service';

@Component({
    selector: 'jhi-classroom-my-suffix-delete-dialog',
    templateUrl: './classroom-my-suffix-delete-dialog.component.html'
})
export class ClassroomMySuffixDeleteDialogComponent {

    classroom: ClassroomMySuffix;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private classroomService: ClassroomMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['classroom']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classroomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'classroomListModification',
                content: 'Deleted an classroom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-classroom-my-suffix-delete-popup',
    template: ''
})
export class ClassroomMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classroomPopupService: ClassroomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.classroomPopupService
                .open(ClassroomMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
