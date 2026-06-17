import { Injectable, signal } from '@angular/core';
import { Command } from '../../../../types/command.alias';

import { ThemeService } from '../theme-service/theme-service';

@Injectable({
  providedIn: 'root',
})
export class CommandRegistry {
  private commands = signal<Command[]>([]);
  readonlyCommands = this.commands.asReadonly();

  constructor(private themeService: ThemeService) {
    const initialCommands: Command[] = [
      {
        id: 'alert',
        label: 'Alert',
        children: [
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
        ],
      },
      {
        id: 'theme',
        label: 'Theme',
        children: [
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
              this.themeService.neutral.set('#929CA6');
              this.themeService.neutralVariant.set('#6E8E9D');
              this.themeService.error.set('#E01B24');
            },
          },
        ],
      },
    ];

    initialCommands.forEach((cmd) => this.register(cmd));
  }

  getCommands() {
    return this.readonlyCommands();
  }

  register(command: Command) {
    this.commands.update((cmds) => [...cmds, command]);
  }

  unregister(id: string) {
    this.commands.update((cmds) => cmds.filter((cmd) => cmd.id !== id));
  }
}
