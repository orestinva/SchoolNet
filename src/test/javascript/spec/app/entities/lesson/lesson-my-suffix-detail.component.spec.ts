import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LessonMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/lesson/lesson-my-suffix-detail.component';
import { LessonMySuffixService } from '../../../../../../main/webapp/app/entities/lesson/lesson-my-suffix.service';
import { LessonMySuffix } from '../../../../../../main/webapp/app/entities/lesson/lesson-my-suffix.model';

describe('Component Tests', () => {

    describe('LessonMySuffix Management Detail Component', () => {
        let comp: LessonMySuffixDetailComponent;
        let fixture: ComponentFixture<LessonMySuffixDetailComponent>;
        let service: LessonMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [LessonMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LessonMySuffixService,
                    EventManager
                ]
            }).overrideComponent(LessonMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LessonMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.lesson).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
