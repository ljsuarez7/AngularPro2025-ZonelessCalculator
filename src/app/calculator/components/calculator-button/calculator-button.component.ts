import { booleanAttribute, ChangeDetectionStrategy, Component, contentChild, ElementRef, HostBinding, input, OnInit, output, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  },
  // encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent {

  // public isCommand = input(false, {
  //   transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  // });

  //Si solo tenemos una clase que añadir va bien esto, si tenemos más de una hacemos una clase personalizada
  // @HostBinding('class.bg-indigo-700') get commandStyle() {
  //   return this.isCommand();
  // }

  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  public isCommand = input(false, {transform: booleanAttribute});
  public isDoubleSize = input(false, {transform: booleanAttribute});

  public onClick = output<string>();

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  @HostBinding('class.w-2/4') get doubleSize() {
    return this.isDoubleSize();
  }

  handleClick() {

    if(!this.contentValue()?.nativeElement) {
      return;
    }

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());

  }

}
