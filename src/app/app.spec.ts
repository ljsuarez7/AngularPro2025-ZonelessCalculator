import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

let fixture: ComponentFixture<App>;
let compiled: HTMLElement;

describe('App', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {

    //Arrange
    const num1 = 1;
    const num2 = 2;

    //Act
    const result = num1 + num2;

    //Assert
    expect(result).toBe(3);

  });

  it('should have the "zoneless-calculator" title', () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped this css classes', () => {

    const divElement = compiled.querySelector('div');
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
    const divClasses = divElement?.classList.value.split(' ');

    //El div debe existir
    expect(divElement).not.toBeNull();

    //El div debe tener el router-outlet dentro
    expect(divElement!.querySelector('router-outlet')).toBeTruthy();

    //Esto obliga a que las clases del div sean las mismas de mustHaveClasses
    // divElement?.classList.forEach(className => {
    //   expect(mustHaveClasses).toContain(className);
    // });

    //Esto obliga a que las clases de mustHaveClasses tengan que estar en el div, pero puede haber más
    mustHaveClasses.forEach(className => {
      expect(divClasses).toContain(className);
    });

  });

  it('should contain the "buy me a beer" link', () => {

    const anchorElement = compiled.querySelector('a');

    expect(anchorElement).not.toBeNull();

    expect(anchorElement?.title).toBe('Buy me a beer');

    expect(anchorElement?.href).toBe('https://www.buymeacoffee.com/scottwindon');

    expect(anchorElement?.getAttribute('href')).toBe('https://www.buymeacoffee.com/scottwindon');

  });

});
