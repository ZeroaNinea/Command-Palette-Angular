import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  primary = signal('#4FC3F7');
  secondary = signal('#2196F3');
  tertiary = signal('#086CBC');
  neutral = signal('#929CA6');
  neutralVariant = signal('#6E8E9D');
  error = signal('#E01B24');
}
