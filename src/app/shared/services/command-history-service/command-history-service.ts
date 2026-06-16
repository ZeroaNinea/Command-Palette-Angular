import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { HistoryEntry } from '../../../../types/history-entry.interface';

@Injectable({
  providedIn: 'root',
})
export class CommandHistoryService {
  history = signal<HistoryEntry[]>([]);

  record(commandId: string) {
    this.history.update((history) => {
      const existing = history.find((entry) => entry.commandId === commandId);

      if (!existing) {
        return [
          {
            commandId,
            usageCount: 1,
            lastUsed: Date.now(),
          },
          ...history,
        ];
      }

      return history.map((entry) =>
        entry.commandId === commandId
          ? {
              ...entry,
              usageCount: entry.usageCount + 1,
              lastUsed: Date.now(),
            }
          : entry,
      );
    });
  }

  getHistory() {
    return this.history.asReadonly();
  }
}
