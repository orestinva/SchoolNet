import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TeacherMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/teacher/teacher-my-suffix-detail.component';
import { TeacherMySuffixService } from '../../../../../../main/webapp/app/entities/teacher/teacher-my-suffix.service';
import { TeacherMySuffix } from '../../../../../../main/webapp/app/entities/teacher/teacher-my-suffix.model';

describe('Component Tests', () => {

    describe('TeacherMySuffix Management Detail Component', () => {
        let comp: TeacherMySuffixDetailComponent;
        let fixture: ComponentFixture<TeacherMySuffixDetailComponent>;
        let service: TeacherMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [TeacherMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TeacherMySuffixService,
                    EventManager
                ]
            }).overrideComponent(TeacherMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TeacherMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.teacher).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
