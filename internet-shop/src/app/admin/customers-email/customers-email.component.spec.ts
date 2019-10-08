import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersEmailComponent } from './customers-email.component';

describe('CustomersEmailComponent', () => {
  let component: CustomersEmailComponent;
  let fixture: ComponentFixture<CustomersEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
