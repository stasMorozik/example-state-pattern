import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

type TypeInput = 'text' | 'password'

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
  @Input() label = ''
  @Input() type: TypeInput = 'text'

  @ViewChild(FormControlDirective, {static: true}) formControlDirective!: FormControlDirective

  @Input() formControlName!: string

  @Input() formControl!: FormControl

  constructor(
    private controlContainer: ControlContainer
  ) {}

  get control() {
    return this.formControl || this.controlContainer.control?.get(this.formControlName)
  }

  writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj)
  }

  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn)
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn)
  }

  ngOnInit(): void {}
}
