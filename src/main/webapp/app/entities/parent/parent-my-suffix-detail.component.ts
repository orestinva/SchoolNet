import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ParentMySuffix } from './parent-my-suffix.model';
import { ParentMySuffixService } from './parent-my-suffix.service';

@Component({
    selector: 'jhi-parent-my-suffix-detail',
    templateUrl: './parent-my-suffix-detail.component.html'
})
export class ParentMySuffixDetailComponent implements OnInit, OnDestroy {

    parent: ParentMySuffix;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private parentService: ParentMySuffixService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['parent']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInParents();
    }

    load(id) {
        this.parentService.find(id).subscribe((parent) => {
            this.parent = parent;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParents() {
        this.eventSubscriber = this.eventManager.subscribe('parentListModification', (response) => this.load(this.parent.id));
    }
}
