import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWinesComponent } from './user-wines.component';

describe('UserWinesComponent', () => {
  let component: UserWinesComponent;
  let fixture: ComponentFixture<UserWinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
