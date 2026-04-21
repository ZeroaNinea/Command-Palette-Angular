import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { createPalette } from './shared/utils/palette.util';

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
  tertiary = signal('#086CBC');
  neutral = signal('#929CA6');
  neutralVariant = signal('#6E8E9D');
  error = signal('#E01B24');

  primaryPalette = computed<Palette>(() => createPalette(this.primary()));
  secondaryPalette = computed<Palette>(() => createPalette(this.secondary()));
  tertiaryPalette = computed<Palette>(() => createPalette(this.tertiary()));
  neutralPalette = computed<Palette>(() => createPalette(this.neutral()));
  neutralVariantPalette = computed<Palette>(() => createPalette(this.neutralVariant()));
  errorPalette = computed<Palette>(() => createPalette(this.error()));
}
