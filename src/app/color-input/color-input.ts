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

  generatePalette(base: string) {
    return {
      bg: chroma(base).darken(2).hex(),
      surface: chroma(base).darken(1).hex(),
      text: chroma(base).luminance(0.9).hex(),
      accent: chroma.scale([base, '#ffffff']).mode('lab')(0.3).hex(),
      border: chroma(base).brighten(1).hex(),
    };
  }
}
