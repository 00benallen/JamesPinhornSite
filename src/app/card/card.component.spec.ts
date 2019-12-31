import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({ selector: 'app-card-host', template: '<app-card>test</app-card>'})
class FakeHostComponent {}

describe('CardComponent', () => {
  let component: FakeHostComponent;
  let fixture: ComponentFixture<FakeHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent, FakeHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display content', () => {

    const content = fixture.debugElement
    .query(By.css('app-card'))
    .query(By.css('.card-container'))
    .nativeElement.innerText;

    expect(content).toBe('test');
  });
});
