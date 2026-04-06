import { useState } from 'react';
import { motion } from 'framer-motion';
import { getOSINTToolsList } from '../lib/api';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'status' | 'logs'>('tools');
  const tools = getOSINTToolsList();

  const systemStatus = {
    online: true,
    version: '2.0.0',
    uptime: '99.9%',
    latency: '24ms',
    apiStatus: 'Operational'
  };

  const recentLogs = [
    { time: '14:23:01', event: 'Session initialized' },
    { time: '14:23:00', event: 'Direct access granted' },
    { time: '14:22:58', event: 'System online' },
  ];

  return (
    <div className="h-full w-80 bg-[#0a0a0a]/80 border border-[#00ff88]/20 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[#00ff88]/20">
        {(['tools', 'status', 'logs'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? 'text-[#00ff88] border-b-2 border-[#00ff88]'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-cyber p-4">
        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-mono">
              Available OSINT Tools
            </h3>
            {tools.map((tool, index) => (
              <motion.div
                key={tool.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#00ff88]/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tool.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm text-gray-300 group-hover:text-[#00ff88] transition-colors font-mono">
                      {tool.command}
                    </div>
                    <div className="text-xs text-gray-500">{tool.description}</div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-gray-600 font-mono">
                  {tool.example}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'status' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-mono">
              System Status
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg">
                <span className="text-xs text-gray-500 font-mono">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                  <span className="text-xs text-[#00ff88] font-mono">ONLINE</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg">
                <span className="text-xs text-gray-500 font-mono">Version</span>
                <span className="text-xs text-gray-300 font-mono">{systemStatus.version}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg">
                <span className="text-xs text-gray-500 font-mono">Uptime</span>
                <span className="text-xs text-gray-300 font-mono">{systemStatus.uptime}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg">
                <span className="text-xs text-gray-500 font-mono">Latency</span>
                <span className="text-xs text-gray-300 font-mono">{systemStatus.latency}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg">
                <span className="text-xs text-gray-500 font-mono">API</span>
                <span className="text-xs text-[#00ff88] font-mono">{systemStatus.apiStatus}</span>
              </div>
            </div>

            {/* Connection Info */}
            <div className="mt-4 p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg">
              <div className="text-xs text-gray-500 mb-2 font-mono">CONNECTION</div>
              <div className="text-[10px] text-gray-600 font-mono space-y-1">
                <div>Protocol: HTTPS/SSL</div>
                <div>Encryption: TLS 1.3</div>
                <div>Mode: Direct Access</div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'logs' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-mono">
              System Logs
            </h3>
            <div className="space-y-2">
              {recentLogs.map((log, index) => (
                <div
                  key={index}
                  className="p-2 bg-[#1a1a1a] border border-gray-800 rounded text-xs font-mono"
                >
                  <span className="text-[#00ff88]">[{log.time}]</span>
                  <span className="text-gray-400 ml-2">{log.event}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg">
              <div className="text-xs text-gray-500 mb-2 font-mono">SESSION INFO</div>
              <div className="text-[10px] text-gray-600 font-mono space-y-1">
                <div>ID: {sessionStorage.getItem('worm_session_id')?.slice(0, 16)}...</div>
                <div>Device: {localStorage.getItem('worm_device_id')?.slice(0, 16)}...</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
