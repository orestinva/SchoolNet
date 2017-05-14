import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { AttendancesMySuffix } from './attendances-my-suffix.model';
import { AttendancesMySuffixService } from './attendances-my-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-attendances-my-suffix',
    templateUrl: './attendances-my-suffix.component.html'
})
export class AttendancesMySuffixComponent implements OnInit, OnDestroy {
attendances: AttendancesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private attendancesService: AttendancesMySuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['attendances']);
    }

    loadAll() {
        this.attendancesService.query().subscribe(
            (res: Response) => {
                this.attendances = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAttendances();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AttendancesMySuffix) {
        return item.id;
    }
    registerChangeInAttendances() {
        this.eventSubscriber = this.eventManager.subscribe('attendancesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
