import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const titleCss = By.css('h1');
const simpleGalleryCss = By.css('ngx-simple-gallery');

describe('AppComponent', () => {
  let component: AppComponent;
  let componentDe: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    componentDe = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleDe = componentDe.query(titleCss);
    const title = titleDe.nativeElement;
    expect(title.textContent).toContain('ngx-simple-gallery');
  });

  it(`should include the simple gallery lib`, () => {
    const simpleGalleryDe = componentDe.query(simpleGalleryCss);
    expect(simpleGalleryDe).not.toBeNull();
  });
});
