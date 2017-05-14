import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { TeacherMySuffix } from './teacher-my-suffix.model';
import { TeacherMySuffixService } from './teacher-my-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-teacher-my-suffix',
    templateUrl: './teacher-my-suffix.component.html'
})
export class TeacherMySuffixComponent implements OnInit, OnDestroy {
teachers: TeacherMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private teacherService: TeacherMySuffixService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['teacher']);
    }

    loadAll() {
        this.teacherService.query().subscribe(
            (res: Response) => {
                this.teachers = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTeachers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TeacherMySuffix) {
        return item.id;
    }
    registerChangeInTeachers() {
        this.eventSubscriber = this.eventManager.subscribe('teacherListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
