import * as migration_20260911_031634_initial from './20260911_031634_initial';

export const migrations = [
  {
    up: migration_20260911_031634_initial.up,
    down: migration_20260911_031634_initial.down,
    name: '20260911_031634_initial'
  },
];
