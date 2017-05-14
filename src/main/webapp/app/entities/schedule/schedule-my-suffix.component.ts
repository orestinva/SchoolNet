import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { ScheduleMySuffix } from './schedule-my-suffix.model';
import { ScheduleMySuffixService } from './schedule-my-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-schedule-my-suffix',
    templateUrl: './schedule-my-suffix.component.html'
})
export class ScheduleMySuffixComponent implements OnInit, OnDestroy {
schedules: ScheduleMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scheduleService: ScheduleMySuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['schedule']);
    }

    loadAll() {
        this.scheduleService.query().subscribe(
            (res: Response) => {
                this.schedules = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSchedules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScheduleMySuffix) {
        return item.id;
    }
    registerChangeInSchedules() {
        this.eventSubscriber = this.eventManager.subscribe('scheduleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
