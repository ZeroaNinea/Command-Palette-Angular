import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  getColorPickerOverlayColor() {
    // const scale = chroma
    //   .scale([chroma(this.value).brighten(3), this.value, chroma(this.value).darken(3)])
    //   .mode('lab')
    //   .colors(10);
    return chroma.contrast(this.value, '#fff') > 4.5 ? '#fff' : '#000';
  }

  onInput(value: string) {
    this.valueChange.emit(value);
  }

  createRipple(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const ripple = wrapper.querySelector('.ripple') as HTMLElement;

    const rect = wrapper.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.remove('active');
    void ripple.offsetWidth;
    ripple.classList.add('active');
  }
}
