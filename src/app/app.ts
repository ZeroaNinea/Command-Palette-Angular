import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommandPalette } from './command-palette/command-palette';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Command-Palette-Angular');
}
