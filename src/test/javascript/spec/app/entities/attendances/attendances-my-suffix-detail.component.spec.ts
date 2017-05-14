import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AttendancesMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/attendances/attendances-my-suffix-detail.component';
import { AttendancesMySuffixService } from '../../../../../../main/webapp/app/entities/attendances/attendances-my-suffix.service';
import { AttendancesMySuffix } from '../../../../../../main/webapp/app/entities/attendances/attendances-my-suffix.model';

describe('Component Tests', () => {

    describe('AttendancesMySuffix Management Detail Component', () => {
        let comp: AttendancesMySuffixDetailComponent;
        let fixture: ComponentFixture<AttendancesMySuffixDetailComponent>;
        let service: AttendancesMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [AttendancesMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AttendancesMySuffixService,
                    EventManager
                ]
            }).overrideComponent(AttendancesMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttendancesMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttendancesMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AttendancesMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.attendances).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
