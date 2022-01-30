import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWineDetailComponent } from './user-wine-detail.component';

describe('UserWineDetailComponent', () => {
  let component: UserWineDetailComponent;
  let fixture: ComponentFixture<UserWineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWineDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
