import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ScheduleMySuffix } from './schedule-my-suffix.model';
import { ScheduleMySuffixService } from './schedule-my-suffix.service';
@Injectable()
export class ScheduleMySuffixPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scheduleService: ScheduleMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scheduleService.find(id).subscribe((schedule) => {
                schedule.date = this.datePipe
                    .transform(schedule.date, 'yyyy-MM-ddThh:mm');
                this.scheduleModalRef(component, schedule);
            });
        } else {
            return this.scheduleModalRef(component, new ScheduleMySuffix());
        }
    }

    scheduleModalRef(component: Component, schedule: ScheduleMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.schedule = schedule;
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
