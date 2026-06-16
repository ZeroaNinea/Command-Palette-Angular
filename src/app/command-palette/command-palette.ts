import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Command } from '../../types/command.alias';
import { CommandHistoryService } from '../shared/services/command-history-service/command-history-service';

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

  private wasOpen = false;
  private commandHistoryService = inject(CommandHistoryService);

  get visibleCommands(): Command[] {
    if (!this.query) {
      const history = this.commandHistoryService.history();
      return this.commands.slice().sort((a, b) => {
        const aUsage = history.find((h) => h.commandId === a.id)?.usageCount ?? 0;

        const bUsage = history.find((h) => h.commandId === b.id)?.usageCount ?? 0;

        return bUsage - aUsage;
      });
    }
    return this.filtered;
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.query = '';
      this.filtered = [];
      this.activeIndex = 0;
    }
  }

  ngAfterViewChecked() {
    if (this.isOpen && !this.wasOpen) {
      this.input?.nativeElement.focus();
    }
    this.wasOpen = this.isOpen;
  }

  filter() {
    const q = this.query.toLowerCase();
    const history = this.commandHistoryService.history();

    this.filtered = this.commands
      .filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(q) ||
          cmd.keywords?.some((k) => k.toLowerCase().includes(q)),
      )
      .sort((a, b) => {
        const aUsage = history.find((h) => h.commandId === a.id)?.usageCount ?? 0;

        const bUsage = history.find((h) => h.commandId === b.id)?.usageCount ?? 0;

        return bUsage - aUsage;
      });

    // this.filtered = this.commands.filter(
    //   (cmd) =>
    //     cmd.label.toLowerCase().includes(q) ||
    //     cmd.keywords?.some((k) => k.toLowerCase().includes(q)),
    // );

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

    setTimeout(() => {
      const el = document.querySelector('.item.active');
      el?.scrollIntoView({ block: 'nearest' });
    });
  }
}
