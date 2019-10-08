import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeInformationComponent } from './size-information.component';

describe('SizeInformationComponent', () => {
  let component: SizeInformationComponent;
  let fixture: ComponentFixture<SizeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
