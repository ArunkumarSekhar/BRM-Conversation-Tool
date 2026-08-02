import type { FlowData } from './types';
import { partnersLibrary } from './library/partners';
import { partnersEntry, partnersOfflineOpenings } from './entry/partners';
import { partnersDiscoveryRouting, partnersDiscoveryChecklist } from './discovery/partners';

export const flowPartners: FlowData = {
  id: 'partners',
  title: 'Partners',
  subtitle: 'Pitching the org / SPO lead who manages young people',
  forWhom: 'The SPO lead, NGO manager, or volunteer coordinator who manages or mentors the archetype',
  goal: 'An ongoing relationship for this cohort and future ones.',
  frame: 'Co-developing talent. Not poaching volunteers, but co-building the skills needed for future leaders.',
  library: partnersLibrary,
  entry: partnersEntry,
  offlineOpenings: partnersOfflineOpenings,
  discoveryRouting: partnersDiscoveryRouting,
  discoveryChecklist: partnersDiscoveryChecklist,
};
