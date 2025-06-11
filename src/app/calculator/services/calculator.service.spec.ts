import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {

  //FALTARIAN ALGUNAS PRUEBAS SI MIRAMOS EL COVERAGE CON npm run test:coverage, lo deja así en el curso, pero en la vida real habria que probar todo lo q se pueda.

  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" y lastOperator to "+" when C is pressed', () => {

    //Ponemos unos valores iniciales para probar el reset de valores
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');

    //Reseteamos los valores de la calculadora
    service.constructNumber('C');

    //Comprobamos que se hayan reseteado los valores.
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should update resultText with number input', () => {

    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');

  });

  it('should handle operators correctly', () => {

    service.constructNumber('1');
    service.constructNumber('-');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('1');
    expect(service.lastOperator()).toBe('-');

  });

  it('should calculate result correctly for addition', () => {

    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');

  });

  it('should calculate result correctly for substraction', () => {

    service.constructNumber('5');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');

  });

  it('should calculate result correctly for multiplication', () => {

    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('4');
    service.constructNumber('=');

    expect(service.resultText()).toBe('8');

  });

  it('should calculate result correctly for division', () => {

    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');

  });

  it('should handle decimal point correctly', () => {

    //Pulsamos para escribir 1.5
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');

    //Comprobamos que es 1.5 el resultText
    expect(service.resultText()).toBe('1.5');

    //Si pulsamos el . de nuevo no deberia pasar nada
    service.constructNumber('.');

    //Comprobamos que es 1.5 el resultText de nuevo
    expect(service.resultText()).toBe('1.5');

  });

  it('should handle decimal point correctly starting with zero', () => {

    //Escribimos 0.0 y aunque hayamos pulsado varias veces el . deberia ser 0.0 al final.
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('0.0');

  });

  it('should handle sign change correctly', () => {

    //Escribimos 1 y pulsamos para cambiar el signo y deberia ser  -1
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');

    //Si pulsamos de nuevo el cambiar signo deberia ser 1
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');

  });

  it('should handle backspace correctly', () => {

    service.resultText.set('123');

    //Eliminamos el numero más a la derecha
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');

    //Eliminamos el numero más a la derecha
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');

    //Eliminamos el numero más a la derecha, si solo hay 1 ponemos 0
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');

    //Eliminamos el numero más a la derecha, si solo hay 1 y es 0 volvemos a poner 0
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');

  });

  it('should handle max length correctly', () => {

    //Pulsamos el numero 1 10 veces
    for (let i = 0; i < 10; i++) {
      service.constructNumber('1');
    }

    //Comprobamos que el tamaño debe ser 10
    expect(service.resultText().length).toBe(10);

    //Si pulsamos otro 1 debe pasar porque lo tenemos controlado
    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);

  });

});
