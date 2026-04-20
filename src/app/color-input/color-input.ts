import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import chroma from 'chroma-js';

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
