import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Command } from '../../types/command.alias';

@Component({
  selector: 'app-command-palette',
  imports: [],
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
    this.isOpen = false;
  }
}
