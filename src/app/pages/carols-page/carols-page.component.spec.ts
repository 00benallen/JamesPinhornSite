import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarolsPageComponent } from './carols-page.component';

describe('CarolsPageComponent', () => {
  let component: CarolsPageComponent;
  let fixture: ComponentFixture<CarolsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarolsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarolsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // }); TODO
});
