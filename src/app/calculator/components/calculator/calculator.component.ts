import { ChangeDetectionStrategy, Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
  // styles: `
  //   .is-command {
  //     @apply bg-indigo-700 bg-opacity-20
  //   }
  // `
})
export class CalculatorComponent {

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {
    console.log({key});
  }

  // @HostListener('document:keyup', ['$event']) //Esta es la forma antigua, ahora se usa host en el @Component
  handleKeyboardEvent(event: KeyboardEvent) {

    const keyEquivalents: Record<string, string> = {
      Escape : 'C',
      Clear : 'C',
      '*' : 'x',
      '/' : '÷',
      Enter : '='
    };

    const keyValue = keyEquivalents[event.key] ?? event.key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(keyValue);
    });

  }

}
