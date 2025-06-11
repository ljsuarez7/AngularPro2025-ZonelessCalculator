
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

describe('CalculatorButtonComponent', () => {

  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 if doubleSize is false', () => {

    expect(component.isDoubleSize()).toBeFalse();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-1/4');

  });

  it('should apply w-2/4 if doubleSize is true', () => {

    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    expect(component.isDoubleSize()).toBeTrue();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-2/4');

  });

});
