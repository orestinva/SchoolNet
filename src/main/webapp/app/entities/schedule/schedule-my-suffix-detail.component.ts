import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ScheduleMySuffix } from './schedule-my-suffix.model';
import { ScheduleMySuffixService } from './schedule-my-suffix.service';

@Component({
    selector: 'jhi-schedule-my-suffix-detail',
    templateUrl: './schedule-my-suffix-detail.component.html'
})
export class ScheduleMySuffixDetailComponent implements OnInit, OnDestroy {

    schedule: ScheduleMySuffix;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private scheduleService: ScheduleMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['schedule']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSchedules();
    }

    load(id) {
        this.scheduleService.find(id).subscribe((schedule) => {
            this.schedule = schedule;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSchedules() {
        this.eventSubscriber = this.eventManager.subscribe('scheduleListModification', (response) => this.load(this.schedule.id));
    }
}
