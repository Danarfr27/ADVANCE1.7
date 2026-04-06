/**
 * WORM AI - API Client Utilities
 * Professional Cyber Intelligence Interface
 * Enhanced with OSINT Capabilities
 */

import { osintEngine } from '../js/osint-tools';

// Types
interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface ChatRequest {
  contents: ChatMessage[];
}

interface ChatResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  error?: string;
  message?: string;
}

interface OSINTResult {
  tool: string;
  title: string;
  fields: Array<{ label: string; value: string | number | null }>;
  cached?: boolean;
}

interface OSINTCommand {
  tool: string;
  command: string;
  params: Record<string, string | null>;
  raw: string;
}

/**
 * Send chat message to AI backend
 * Enhanced with OSINT command processing
 */
export async function sendChatMessage(
  messages: ChatMessage[]
): Promise<string> {
  try {
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage?.parts[0]?.text || '';

    // Check if input is an OSINT command
    const osintCommand = osintEngine.parseCommand(userInput);
    if (osintCommand) {
      return await processOSINTCommand(osintCommand);
    }

    // Regular chat message
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        contents: messages,
      } as ChatRequest),
    });

    let data: ChatResponse | null = null;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (!response.ok) {
      const errMsg =
        data && (data.error || data.message)
          ? data.error || data.message
          : `HTTP ${response.status}`;
      throw new Error(errMsg);
    }

    // Extract AI response
    if (data && data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Invalid response format from API');
  } catch (error) {
    const message =
      error && (error as any).message
        ? (error as any).message
        : 'Network error occurred';
    throw new Error(message);
  }
}

/**
 * Process OSINT command
 */
async function processOSINTCommand(command: OSINTCommand): Promise<string> {
  try {
    // Validate required parameters
    const missingParams = Object.entries(command.params)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingParams.length > 0) {
      return formatOSINTError(
        `Missing required parameters: ${missingParams.join(', ')}\n\n` +
        `Usage: ${osintEngine.getToolHelp(command.command)?.usage || command.command + ' [params]'}`
      );
    }

    // Execute OSINT tool
    const result = await osintEngine.execute(command);
    
    // Format result
    return formatOSINTResult(result);
  } catch (error) {
    return formatOSINTError(
      `OSINT Error: ${(error as Error).message}`
    );
  }
}

/**
 * Format OSINT result for display
 */
function formatOSINTResult(result: OSINTResult): string {
  const lines: string[] = [
    '',
    '```',
    `╔══════════════════════════════════════════════════════════════╗`,
    `║  🔍 ${result.title.padEnd(54)}║`,
    `╠══════════════════════════════════════════════════════════════╣`
  ];

  if (result.fields) {
    result.fields.forEach(field => {
      const value = String(field.value || 'N/A').substring(0, 45);
      const label = field.label.padEnd(15);
      const line = `║  ${label}: ${value.padEnd(41)}║`;
      lines.push(line);
    });
  }

  if (result.cached) {
    lines.push(`║  ${'(Cached Result)'.padEnd(60)}║`);
  }

  lines.push(
    `╚══════════════════════════════════════════════════════════════╝`,
    '```',
    ''
  );

  return lines.join('\n');
}

/**
 * Format OSINT error
 */
function formatOSINTError(errorMessage: string): string {
  return [
    '',
    '```',
    `╔══════════════════════════════════════════════════════════════╗`,
    `║  ⚠️  OSINT ERROR${''.padEnd(45)}║`,
    `╠══════════════════════════════════════════════════════════════╣`,
    ...errorMessage.split('\n').map(line => 
      `║  ${line.substring(0, 58).padEnd(58)}║`
    ),
    `╚══════════════════════════════════════════════════════════════╝`,
    '```',
    ''
  ].join('\n');
}

/**
 * Test API connectivity
 */
export async function testChatAPI(
  testMessage: string = 'Hello, test message'
): Promise<{ success: boolean; message: string }> {
  try {
    const testMessages: ChatMessage[] = [
      {
        role: 'user',
        parts: [{ text: testMessage }],
      },
    ];

    const response = await sendChatMessage(testMessages);

    return {
      success: true,
      message: `API responded: ${response.substring(0, 100)}...`,
    };
  } catch (error) {
    return {
      success: false,
      message: `API test failed: ${(error as any).message}`,
    };
  }
}

/**
 * Get OSINT tools list
 */
export function getOSINTToolsList(): Array<{
  key: string;
  name: string;
  description: string;
  icon: string;
  command: string;
  example: string;
}> {
  return osintEngine.getToolsList();
}

/**
 * Get OSINT tool help
 */
export function getOSINTToolHelp(command: string): {
  name: string;
  description: string;
  usage: string;
  parameters: string[];
} | null {
  return osintEngine.getToolHelp(command);
}

/**
 * Check if input is OSINT command
 */
export function isOSINTCommand(input: string): boolean {
  return osintEngine.parseCommand(input) !== null;
}

/**
 * Fetch session status (always returns authenticated in direct access mode)
 */
export async function getSessionStatus(): Promise<{
  authenticated: boolean;
  sessionId?: string;
}> {
  try {
    const sessionId = sessionStorage.getItem('worm_session_id');
    return { 
      authenticated: true,
      sessionId: sessionId || undefined
    };
  } catch (error) {
    return { authenticated: true };
  }
}

/**
 * Logout user (clears session)
 */
export async function logout(): Promise<boolean> {
  try {
    sessionStorage.clear();
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get system status
 */
export async function getSystemStatus(): Promise<{
  online: boolean;
  version: string;
  timestamp: string;
}> {
  return {
    online: true,
    version: '2.0.0',
    timestamp: new Date().toISOString()
  };
}

export default {
  sendChatMessage,
  testChatAPI,
  getOSINTToolsList,
  getOSINTToolHelp,
  isOSINTCommand,
  getSessionStatus,
  logout,
  getSystemStatus
};
