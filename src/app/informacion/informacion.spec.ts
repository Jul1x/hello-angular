import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionComponent } from './informacion';

describe('InformacionComponent', () => {
  let component: InformacionComponent;
  let fixture: ComponentFixture<InformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
