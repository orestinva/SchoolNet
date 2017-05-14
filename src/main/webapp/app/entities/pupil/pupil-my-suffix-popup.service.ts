import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PupilMySuffix } from './pupil-my-suffix.model';
import { PupilMySuffixService } from './pupil-my-suffix.service';
@Injectable()
export class PupilMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pupilService: PupilMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.pupilService.find(id).subscribe((pupil) => {
                this.pupilModalRef(component, pupil);
            });
        } else {
            return this.pupilModalRef(component, new PupilMySuffix());
        }
    }

    pupilModalRef(component: Component, pupil: PupilMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pupil = pupil;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
