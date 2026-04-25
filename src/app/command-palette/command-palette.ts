import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Command } from '../../types/command.alias';

@Component({
  selector: 'app-command-palette',
  imports: [CommonModule],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.scss',
})
export class CommandPalette {
  @Input() commands: Command[] = [];
  @Output() commandSelected = new EventEmitter<Command>();

  query = '';
  filtered: Command[] = [];
  activeIndex = 0;
  isOpen = false;

  filter() {
    const q = this.query.toLowerCase();

    this.filtered = this.commands.filter(
      (cmd) => cmd.label.toLowerCase().includes(q) || cmd.keywords?.some((k) => k.includes(q)),
    );

    this.activeIndex = 0;
  }

  onCommand(cmd: Command) {
    this.commandSelected.emit(cmd);
    cmd.handler?.(cmd.payload);
    this.isOpen = false;
  }
}
