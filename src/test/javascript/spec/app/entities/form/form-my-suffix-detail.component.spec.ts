import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SchoolNetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FormMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/form/form-my-suffix-detail.component';
import { FormMySuffixService } from '../../../../../../main/webapp/app/entities/form/form-my-suffix.service';
import { FormMySuffix } from '../../../../../../main/webapp/app/entities/form/form-my-suffix.model';

describe('Component Tests', () => {

    describe('FormMySuffix Management Detail Component', () => {
        let comp: FormMySuffixDetailComponent;
        let fixture: ComponentFixture<FormMySuffixDetailComponent>;
        let service: FormMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SchoolNetTestModule],
                declarations: [FormMySuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FormMySuffixService,
                    EventManager
                ]
            }).overrideComponent(FormMySuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FormMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.form).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
