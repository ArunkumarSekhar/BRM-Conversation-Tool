import { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { ConversationScreen, type FinishResult } from './components/ConversationScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { CallScreen, type CallResult } from './components/CallScreen';
import { CallResultsScreen } from './components/CallResultsScreen';
import type { FlowId } from './data/types';
import type { RunConfig } from './game/engine';

type Screen = 'setup' | 'playing' | 'results' | 'call' | 'call-results';

/** The Partners formal-call path runs the full six-phase call simulation
 * instead of the generic step engine. */
function isCallSim(flowId: FlowId, config: RunConfig): boolean {
  return flowId === 'partners' && config.channel === 'offline' && config.offlineOpeningId === 'formal-call';
}

function App() {
  const [screen, setScreen] = useState<Screen>('setup');
  const [flowId, setFlowId] = useState<FlowId | null>(null);
  const [config, setConfig] = useState<RunConfig | null>(null);
  const [result, setResult] = useState<FinishResult | null>(null);
  const [callResult, setCallResult] = useState<CallResult | null>(null);
  const [runKey, setRunKey] = useState(0);

  return (
    <div className="min-h-[100svh] bg-white dark:bg-slate-900">
      {screen === 'setup' && (
        <SetupScreen
          onStart={(id, cfg) => {
            setFlowId(id);
            setConfig(cfg);
            setRunKey((k) => k + 1);
            setScreen(isCallSim(id, cfg) ? 'call' : 'playing');
          }}
        />
      )}

      {screen === 'playing' && flowId && config && (
        <ConversationScreen
          key={runKey}
          flowId={flowId}
          config={config}
          onExit={() => setScreen('setup')}
          onFinish={(res) => {
            setResult(res);
            setScreen('results');
          }}
        />
      )}

      {screen === 'call' && config && (
        <CallScreen
          key={runKey}
          difficulty={config.difficulty}
          onExit={() => setScreen('setup')}
          onFinish={(res) => {
            setCallResult(res);
            setScreen('call-results');
          }}
        />
      )}

      {screen === 'results' && result && (
        <ResultsScreen
          result={result}
          onRestart={() => {
            setRunKey((k) => k + 1);
            setScreen('playing');
          }}
          onChangeSettings={() => setScreen('setup')}
        />
      )}

      {screen === 'call-results' && callResult && (
        <CallResultsScreen
          result={callResult}
          onRestart={() => {
            setRunKey((k) => k + 1);
            setScreen('call');
          }}
          onChangeSettings={() => setScreen('setup')}
        />
      )}
    </div>
  );
}

export default App;
