import { TestBed } from '@angular/core/testing';

import { CommandRegistry } from './command-registry';

describe('CommandRegistry', () => {
  let service: CommandRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
