import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the spinner container with the correct class', () => {
    const containerElement = fixture.nativeElement.querySelector('.lds-ring');
    expect(containerElement).toBeTruthy();
  });

  it('should render four child div elements', () => {
    const childElements = fixture.nativeElement.querySelectorAll('.lds-ring div');
    expect(childElements.length).toBe(4);
  });

  it('should not render any other elements besides the spinner container and its child divs', () => {
    const allElements = fixture.nativeElement.querySelectorAll('*');
    expect(allElements.length).toBe(5); // 1 container + 4 child divs
  });
});
