import type { FlowData } from './types';
import { directLibrary } from './library/direct';
import { directEntry, directOfflineOpenings } from './entry/direct';
import { directDiscoveryRouting, directDiscoveryChecklist } from './discovery/direct';

export const flowDirect: FlowData = {
  id: 'direct',
  title: 'Direct',
  subtitle: 'Pitching the young changemaker themselves',
  forWhom: 'A young person with one to two years of social sector or volunteering experience',
  goal: 'They want to work with BRM. Ideally they apply, or nominate someone who will.',
  frame: 'Complement, not competition. Twelve weekends to level up the work they are already doing in a new field, or a new way, and see actual visible change.',
  library: directLibrary,
  entry: directEntry,
  offlineOpenings: directOfflineOpenings,
  discoveryRouting: directDiscoveryRouting,
  discoveryChecklist: directDiscoveryChecklist,
};
