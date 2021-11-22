import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDialogComponent } from './posts-dialog.component';

describe('PostsDialogComponent', () => {
  let component: PostsDialogComponent;
  let fixture: ComponentFixture<PostsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
