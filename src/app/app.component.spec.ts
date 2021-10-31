import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have set the default calculator value`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.default).toEqual('0');
  });

  it(`should have set the entered value`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('3');

    expect(component.currentDigit).toEqual('3');
  });

  it(`should have set the current symbol if currentDigit is set`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('3');
    component.symbolClicked('minus');

    expect(component.symbol).toEqual('minus');
  });

  it(`should not set the current symbol if currentDigit is not set`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.symbolClicked('minus');

    expect(component.symbol).toEqual('');
  });

  it(`should set the currentDigit to previousDigit if symbol is set`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('5');
    component.symbolClicked('plus');
    component.digitClicked('1');

    expect(component.currentDigit).toEqual('1');
    expect(component.previousDigit).toEqual('5');
    expect(component.symbol).toEqual('plus');
  });

  it(`should clear all set values`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('5');
    component.symbolClicked('plus');
    component.digitClicked('1');

    expect(component.currentDigit).toEqual('1');
    expect(component.previousDigit).toEqual('5');
    expect(component.symbol).toEqual('plus');

    component.clear();

    expect(component.currentDigit).toEqual('');
    expect(component.previousDigit).toEqual('');
    expect(component.symbol).toEqual('');
  });

  it(`should be able to set multiple values consecutively`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('5');
    component.digitClicked('5');
    component.digitClicked('5');

    expect(component.currentDigit).toEqual('555');
  });

  it(`should calculate a digit value if current and previous value has been set and equal is clicked`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('5');
    component.digitClicked('5');
    component.digitClicked('5');
    component.symbolClicked('minus');
    component.digitClicked('5');
    component.equalClicked();

    expect(component.currentDigit).toEqual('550');
  });

  it(`should calculate and set current value and clear past values`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('7');
    component.digitClicked('8');
    component.digitClicked('5');
    component.symbolClicked('minus');
    component.digitClicked('5');
    component.equalClicked();

    expect(component.currentDigit).toEqual('780');
    expect(component.symbol).toEqual('');
    expect(component.previousDigit).toEqual('');
  });

  it(`should add values`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('7');
    component.digitClicked('8');
    component.digitClicked('5');
    component.symbolClicked('plus');
    component.digitClicked('5');
    component.equalClicked();

    expect(component.currentDigit).toEqual('790');
  });

  it(`should deduct values`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('7');
    component.digitClicked('9');
    component.digitClicked('5');
    component.symbolClicked('minus');
    component.digitClicked('5');
    component.equalClicked();

    expect(component.currentDigit).toEqual('790');
  });

  it(`should divide values`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('7');
    component.digitClicked('9');
    component.digitClicked('0');
    component.symbolClicked('divide');
    component.digitClicked('10');
    component.equalClicked();

    expect(component.currentDigit).toEqual('79');
  });

  it(`should multiply values`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('7');
    component.digitClicked('5');
    component.symbolClicked('times');
    component.digitClicked('10');
    component.equalClicked();

    expect(component.currentDigit).toEqual('750');
  });

  it(`should not calculate result if current value is not set`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.symbolClicked('times');
    component.equalClicked();

    expect(component.calculatedResult).toEqual(null);
  });

  it(`should not calculate result if previous value is not set`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.digitClicked('7');
    component.digitClicked('4');
    component.digitClicked('0');
    component.symbolClicked('times');
    component.equalClicked();

    expect(component.calculatedResult).toEqual(null);
  });

  // it(`should not allow multiple fulstops`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const component = fixture.componentInstance;

  //   component.digitClicked('7');
  //   component.digitClicked('9');
  //   component.digitClicked('0');
  //   component.digitClicked('.');
  //   component.digitClicked('.');
  //   component.digitClicked('1');
  //   component.digitClicked('0');

  //   expect(component.currentDigit).toEqual('790.10');
  // });

  // it(`should not allow fullstop if no current value`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const component = fixture.componentInstance;

  //   component.digitClicked('.');
  //   component.digitClicked('1');
  //   component.digitClicked('0');

  //   expect(component.currentDigit).toEqual('10');
  // });

  // it(`should allow fullstop if current value`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const component = fixture.componentInstance;

  //   component.digitClicked('2');
  //   component.digitClicked('.');
  //   component.digitClicked('1');
  //   component.digitClicked('0');

  //   expect(component.currentDigit).toEqual('2.10');
  // });
});
