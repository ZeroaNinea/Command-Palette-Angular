import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { HistoryEntry } from '../../../../types/history-entry.interface';

@Injectable({
  providedIn: 'root',
})
export class CommandHistoryService {
  private history = signal<HistoryEntry[]>([]);

  record(commandId: string) {
    const historyEntry = this.history().find((entry) => entry.commandId === commandId);
    const newHistoryEntry: HistoryEntry = {
      commandId,
      usageCount: historyEntry?.usageCount ? historyEntry.usageCount + 1 : 1,
      lastUsed: Date.now(),
    };
    this.history.update((history) => [newHistoryEntry, ...history]);
    this.history.update((history) => history.filter((entry) => entry.commandId !== commandId));
  }

  getHistory() {
    return this.history.asReadonly();
  }
}
