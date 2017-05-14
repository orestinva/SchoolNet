import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AttendancesMySuffix } from './attendances-my-suffix.model';
import { AttendancesMySuffixService } from './attendances-my-suffix.service';
@Injectable()
export class AttendancesMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private attendancesService: AttendancesMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.attendancesService.find(id).subscribe((attendances) => {
                this.attendancesModalRef(component, attendances);
            });
        } else {
            return this.attendancesModalRef(component, new AttendancesMySuffix());
        }
    }

    attendancesModalRef(component: Component, attendances: AttendancesMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.attendances = attendances;
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
