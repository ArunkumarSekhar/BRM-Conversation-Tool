import { flowDirect } from './flowDirect';
import { flowPartners } from './flowPartners';
import type { FlowId, FlowData } from './types';

export const FLOWS: Record<FlowId, FlowData> = {
  direct: flowDirect,
  partners: flowPartners,
};

export * from './types';
export * from './scoring';
