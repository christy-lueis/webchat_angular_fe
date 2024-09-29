import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapsComponent } from './gmaps.component';

describe('GmapsComponent', () => {
  let component: GmapsComponent;
  let fixture: ComponentFixture<GmapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GmapsComponent]
    });
    fixture = TestBed.createComponent(GmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
