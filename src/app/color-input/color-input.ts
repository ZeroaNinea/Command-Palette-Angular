import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-input',
  imports: [],
  templateUrl: './color-input.html',
  styleUrl: './color-input.scss',
})
export class ColorInput {
  @Input() label = '';
  @Input() value = '#4FC3F7';
  @Output() valueChange = new EventEmitter<string>();

  onInput(value: string) {
    this.valueChange.emit(value);
  }
}
