import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

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

  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
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
