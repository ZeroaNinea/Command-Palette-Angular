import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import chroma from 'chroma-js';

import { Palette } from '../types/palette.alias';

import { CommandPalette } from './command-palette/command-palette';
import { ColorInput } from './color-input/color-input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette, ColorInput],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Command-Palette-Angular');

  primary = signal('#4FC3F7');
  secondary = signal('#2196F3');
  tertiary = signal('#3949AB');

  primaryPalette = computed<Palette>(() => {
    const base = this.primary();

    return {
      bg: chroma(base).darken(2).hex(),
      surface: chroma(base).darken(1).hex(),
      text: chroma(base).luminance(0.9).hex(),
      accent: chroma.scale([base, '#ffffff']).mode('lab')(0.3).hex(),
      border: chroma(base).brighten(1).hex(),
    };
  });

  secondaryPalette = computed<Palette>(() => {
    const base = this.secondary();

    return {
      bg: chroma(base).darken(2).hex(),
      surface: chroma(base).darken(1).hex(),
      text: chroma(base).luminance(0.9).hex(),
      accent: chroma.scale([base, '#ffffff']).mode('lab')(0.3).hex(),
      border: chroma(base).brighten(1).hex(),
    };
  });

  tertiaryPalette = computed<Palette>(() => {
    const base = this.tertiary();

    return {
      bg: chroma(base).darken(2).hex(),
      surface: chroma(base).darken(1).hex(),
      text: chroma(base).luminance(0.9).hex(),
      accent: chroma.scale([base, '#ffffff']).mode('lab')(0.3).hex(),
      border: chroma(base).brighten(1).hex(),
    };
  });
}
