import { Injectable, signal } from '@angular/core';
import { Command } from '../../../../types/command.alias';

import { ThemeService } from '../theme-service.ts/theme-service';

@Injectable({
  providedIn: 'root',
})
export class CommandRegistry {
  // primary = signal('#4FC3F7');
  // secondary = signal('#2196F3');
  // tertiary = signal('#086CBC');
  // neutral = signal('#929CA6');
  // neutralVariant = signal('#6E8E9D');
  // error = signal('#E01B24');

  private commands = signal<Command[]>([]);

  constructor(private themeService: ThemeService) {
    const initialCommands = [
      {
        id: 'alert-1',
        label: 'Alert 1',
        keywords: ['alert', '1'],
        shortcut: 'a1',
        handler: () => alert('Alert 1'),
      },
      {
        id: 'alert-2',
        label: 'Alert 2',
        keywords: ['alert', '2'],
        shortcut: 'a2',
        handler: () => alert('Alert 2'),
      },
      {
        id: 'primary-red',
        label: 'Set Primary to Red',
        handler: () => this.themeService.primary.set('#ff4d4f'),
      },
      {
        id: 'primary-blue',
        label: 'Set Primary to Blue',
        handler: () => this.themeService.primary.set('#4FC3F7'),
      },
      {
        id: 'reset',
        label: 'Reset Colors',
        handler: () => {
          this.themeService.primary.set('#4FC3F7');
          this.themeService.secondary.set('#2196F3');
          this.themeService.tertiary.set('#086CBC');
        },
      },
    ];

    initialCommands.map((cmd) => this.register(cmd));
  }

  // private commands = signal<Command[]>([
  //   // id: string;
  //   // label: string;
  //   // keywords?: string[];
  //   // shortcut?: string;
  //   // payload?: unknown;
  //   // handler?: (payload?: unknown) => void;
  //   {
  //     id: 'alert-1',
  //     label: 'Alert 1',
  //     keywords: ['alert', '1'],
  //     shortcut: 'a1',
  //     handler: () => alert('Alert 1'),
  //   },
  //   {
  //     id: 'alert-2',
  //     label: 'Alert 2',
  //     keywords: ['alert', '2'],
  //     shortcut: 'a2',
  //     handler: () => alert('Alert 2'),
  //   },
  //   {
  //     id: 'primary-red',
  //     label: 'Set Primary to Red',
  //     handler: () => this.primary.set('#ff4d4f'),
  //   },
  //   {
  //     id: 'primary-blue',
  //     label: 'Set Primary to Blue',
  //     handler: () => this.primary.set('#4FC3F7'),
  //   },
  //   {
  //     id: 'reset',
  //     label: 'Reset Colors',
  //     handler: () => {
  //       this.primary.set('#4FC3F7');
  //       this.secondary.set('#2196F3');
  //       this.tertiary.set('#086CBC');
  //     },
  //   },
  // ]);

  getCommands() {
    return this.commands;
  }

  register(command: Command) {
    this.commands.update((cmds) => [...cmds, command]);
  }
}
