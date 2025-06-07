import { Injectable, signal } from '@angular/core';

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['+','-','*','/'];
const specialOperators = ['+/-','%','.','=','C','Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {

    //Validar input
    if(![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input', value);
      return;
    }

    // Calcular operacion (=)
    if(value === '=') {
      console.log('Calcular resultado');
      return;
    }

    // Limpiar resultados (C)
    if(value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Borrar caracter (Backspace)
    if(value === 'Backspace') {

      //Si es valor es 0 no hacemos nada
      if(this.resultText() === '0') return;

      //Si tenemos un solo caracter lo convertimos en 0
      if(this.resultText().length === 1){
        this.resultText.set('0');
        return;
      }

      //Si tenemos más de un caracter vamos borrando de uno en uno
      this.resultText.update(value => value.slice(0, -1));

      return;

    }

    //Operadores
    if(operators.includes(value)){
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //Limitar numero de caracteres
    if(this.resultText().length >= 10) {
      console.log('Max length reached');
      return;
    }

    //Punto decimal (.)
    if(value === '.' && !this.resultText().includes('.')) {

      if(this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }

      this.resultText.update(text => text + '.');
      return;

    }

    //Condiciones especiales para 0 inicial
    if(value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    //Cambiar signo (+/-)
    if(value === '+/-') {

      if(this.resultText().includes('-')) {
        this.resultText.update((text) => text.slice(1));
        return;
      }

      this.resultText.update(text => '-' + text);
      return;

    }

    //Numeros
    if(numbers.includes(value)){

      //Si el numero es 0 lo sustituimos por el pulsado
      if(this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      //Si el numero es -0 lo sustituimos por el pulsado pero con -
      if(this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      //Añadimos el numero al final de los anteriores
      this.resultText.update(text => text + value);
      return;

    }

  }

}
