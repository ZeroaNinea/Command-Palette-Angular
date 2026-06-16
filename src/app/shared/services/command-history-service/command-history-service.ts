import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandHistoryService {
  private history = signal<string[]>([]);

  record(commandId: string) {
    this.history.update((history) => [commandId, ...history]);
  }

  getHistory() {
    return this.history.asReadonly();
  }
}
