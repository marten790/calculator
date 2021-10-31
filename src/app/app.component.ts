import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public default = '0';
  public currentDigit = '';
  public previousDigit = '';
  public symbol = '';
  public calculatedResult: number = null;

  public digitClicked(value: string) {
    this.currentDigit = this.currentDigit.toString() + value.toString();
  }

  public symbolClicked(value: string) {
    if (!this.currentDigit) return;

    this.symbol = value;
    this.previousDigit = this.currentDigit;
    this.currentDigit = '';
    // Update to calculate value on symbol clicked
    // Update history shown
    // this.calculate()
    // this.updateHistory()
  }

  public equalClicked() {
    this.calculate();
  }

  public calculate() {
    if (!this.currentDigit || !this.previousDigit) return;

    let current = Number(this.currentDigit);
    let previous = Number(this.previousDigit);

    switch (this.symbol) {
      case 'plus':
        this.calculatedResult = previous + current;
        break;

      case 'minus':
        this.calculatedResult = previous - current;
        break;

      case 'divide':
        this.calculatedResult = previous / current;
        break;

      case 'times':
        this.calculatedResult = previous * current;
        break;
      default:
        break;
    }

    this.currentDigit = this.calculatedResult.toString();
    this.previousDigit = '';
    this.symbol = '';
  }

  public clear() {
    this.currentDigit = '';
    this.symbol = '';
    this.previousDigit = '';
  }
}
