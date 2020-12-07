import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCatergoryComponent } from './new-catergory.component';

describe('NewCatergoryComponent', () => {
  let component: NewCatergoryComponent;
  let fixture: ComponentFixture<NewCatergoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCatergoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCatergoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
