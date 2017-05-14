import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScheduleMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/schedule/schedule-my-suffix-detail.component';
import { ScheduleMySuffixService } from '../../../../../../main/webapp/app/entities/schedule/schedule-my-suffix.service';
import { ScheduleMySuffix } from '../../../../../../main/webapp/app/entities/schedule/schedule-my-suffix.model';

describe('Component Tests', () => {

    describe('ScheduleMySuffix Management Detail Component', () => {
        let comp: ScheduleMySuffixDetailComponent;
        let fixture: ComponentFixture<ScheduleMySuffixDetailComponent>;
        let service: ScheduleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [ScheduleMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScheduleMySuffixService,
                    EventManager
                ]
            }).overrideComponent(ScheduleMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScheduleMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ScheduleMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.schedule).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
