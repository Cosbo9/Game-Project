import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameplayScreenComponent } from './gameplay-screen.component';

describe('GameplayScreenComponent', () => {
  let component: GameplayScreenComponent;
  let fixture: ComponentFixture<GameplayScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameplayScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
