import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Command } from '../../types/command.alias';

@Component({
  selector: 'app-command-palette',
  imports: [CommonModule, FormsModule],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.scss',
})
export class CommandPalette implements OnChanges, AfterViewChecked {
  @Input() commands: Command[] = [];
  @Input() isOpen: boolean = false;

  @Output() commandSelected = new EventEmitter<Command>();
  @Output() isOpenChange = new EventEmitter<boolean>();

  @ViewChild('searchInput') input!: ElementRef<HTMLInputElement>;

  query = '';
  filtered: Command[] = [];
  activeIndex = 0;

  get visibleCommands(): Command[] {
    if (!this.query) return this.commands;
    return this.filtered;
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.query = '';
      this.filtered = [];
      this.activeIndex = 0;
    }

    setTimeout(() => {
      const el = document.querySelector('.item.active');
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  ngAfterViewChecked() {
    if (this.isOpen) {
      this.input?.nativeElement.focus();
    }
  }

  filter() {
    const q = this.query.toLowerCase();

    this.filtered = this.commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.keywords?.some((k) => k.toLowerCase().includes(q)),
    );

    this.activeIndex = 0;
  }

  onCommand(cmd: Command) {
    this.commandSelected.emit(cmd);
    cmd.handler?.(cmd.payload);
    this.isOpenChange.emit(false);
  }

  close() {
    this.isOpenChange.emit(false);
  }

  onKeydown(e: KeyboardEvent) {
    const list = this.visibleCommands;

    if (!list.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % list.length;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + list.length) % list.length;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      this.onCommand(list[this.activeIndex]);
    }

    if (e.key === 'Escape') {
      this.close();
    }
  }
}
