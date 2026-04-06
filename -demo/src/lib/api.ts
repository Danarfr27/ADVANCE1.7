/**
 * WORM AI - API Client with OSINT Support
 */

interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

// OSINT Tool Definitions
export const OSINT_TOOLS = {
  whois: {
    name: 'WHOIS Lookup',
    description: 'Domain registration information',
    icon: '🔍',
    command: '/whois',
    params: ['domain'],
    example: '/whois example.com'
  },
  ipgeo: {
    name: 'IP Geolocation',
    description: 'Track IP address location',
    icon: '📍',
    command: '/ipgeo',
    params: ['ip'],
    example: '/ipgeo 8.8.8.8'
  },
  email: {
    name: 'Email Intelligence',
    description: 'Analyze email address',
    icon: '📧',
    command: '/email',
    params: ['email'],
    example: '/email user@example.com'
  },
  username: {
    name: 'Username Tracker',
    description: 'Find username across platforms',
    icon: '👤',
    command: '/username',
    params: ['username'],
    example: '/username johndoe'
  },
  phone: {
    name: 'Phone Intelligence',
    description: 'Phone number analysis',
    icon: '📱',
    command: '/phone',
    params: ['number'],
    example: '/phone +1234567890'
  },
  social: {
    name: 'Social Media OSINT',
    description: 'Social profile analysis',
    icon: '🌐',
    command: '/social',
    params: ['platform', 'username'],
    example: '/social instagram johndoe'
  },
  dns: {
    name: 'DNS Enumeration',
    description: 'DNS records lookup',
    icon: '🌐',
    command: '/dns',
    params: ['domain'],
    example: '/dns example.com'
  },
  subdomain: {
    name: 'Subdomain Finder',
    description: 'Discover subdomains',
    icon: '🔎',
    command: '/subdomain',
    params: ['domain'],
    example: '/subdomain example.com'
  },
  tech: {
    name: 'Tech Detector',
    description: 'Identify web technologies',
    icon: '⚙️',
    command: '/tech',
    params: ['url'],
    example: '/tech https://example.com'
  },
  breach: {
    name: 'Breach Checker',
    description: 'Check data breaches',
    icon: '🔓',
    command: '/breach',
    params: ['email'],
    example: '/breach user@example.com'
  },
  portscan: {
    name: 'Port Scanner',
    description: 'Scan open ports',
    icon: '🔌',
    command: '/portscan',
    params: ['host'],
    example: '/portscan example.com'
  }
};

// Parse OSINT command
export const parseOSINTCommand = (input: string): { tool: string; params: string[] } | null => {
  const trimmed = input.trim();
  if (!trimmed.startsWith('/')) return null;

  const parts = trimmed.split(' ');
  const command = parts[0].toLowerCase();
  const params = parts.slice(1).filter(Boolean);

  const toolKey = Object.keys(OSINT_TOOLS).find(
    key => OSINT_TOOLS[key as keyof typeof OSINT_TOOLS].command === command
  );

  if (!toolKey) return null;

  return { tool: toolKey, params };
};

// Check if input is OSINT command
export const isOSINTCommand = (input: string): boolean => {
  return parseOSINTCommand(input) !== null;
};

// Get OSINT tools list
export const getOSINTToolsList = () => {
  return Object.entries(OSINT_TOOLS).map(([key, tool]) => ({
    key,
    ...tool
  }));
};

// Generate mock OSINT result
const generateOSINTResult = (tool: string, params: string[]): string => {
  const target = params[0] || 'unknown';
  
  switch (tool) {
    case 'whois':
      return `╔══════════════════════════════════════════════════════════════╗
║  🔍 WHOIS Lookup Results                                     ║
╠══════════════════════════════════════════════════════════════╣
║  Domain        : ${target.padEnd(45)}║
║  Registrar     : MarkMonitor Inc.                            ║
║  Created       : 1997-09-15                                  ║
║  Expires       : 2028-09-14                                  ║
║  Updated       : 2024-01-10                                  ║
║  Name Servers  : ns1.google.com, ns2.google.com              ║
║  Status        : clientTransferProhibited                    ║
║  Registrant    : REDACTED FOR PRIVACY                        ║
╚══════════════════════════════════════════════════════════════╝`;

    case 'ipgeo':
      return `╔══════════════════════════════════════════════════════════════╗
║  📍 IP Geolocation Results                                   ║
╠══════════════════════════════════════════════════════════════╣
║  IP Address    : ${target.padEnd(45)}║
║  Country       : United States                               ║
║  Region        : California                                  ║
║  City          : Mountain View                               ║
║  ZIP Code      : 94043                                       ║
║  Latitude      : 37.4220                                     ║
║  Longitude     : -122.0841                                   ║
║  Timezone      : America/Los_Angeles                         ║
║  ISP           : Google LLC                                  ║
║  Organization  : Google Cloud                                ║
╚══════════════════════════════════════════════════════════════╝`;

    case 'email':
      return `╔══════════════════════════════════════════════════════════════╗
║  📧 Email Intelligence Results                               ║
╠══════════════════════════════════════════════════════════════╣
║  Email         : ${target.padEnd(45)}║
║  Valid         : ✓ Yes                                       ║
║  Disposable    : ✗ No                                        ║
║  MX Record     : gmail-smtp-in.l.google.com                  ║
║  SMTP Check    : Valid                                       ║
║  Breaches      : 0                                           ║
║  Profiles      : github, linkedin, twitter                   ║
╚══════════════════════════════════════════════════════════════╝`;

    case 'username':
      return `╔══════════════════════════════════════════════════════════════╗
║  👤 Username Tracker Results                                 ║
╠══════════════════════════════════════════════════════════════╣
║  Username      : ${target.padEnd(45)}║
║  Platforms     : 5 found                                     ║
║                                                              ║
║  github.com/${target.padEnd(54)}║
║  twitter.com/${target.padEnd(54)}║
║  instagram.com/${target.padEnd(52)}║
║  linkedin.com/in/${target.padEnd(50)}║
║  reddit.com/u/${target.padEnd(53)}║
╚══════════════════════════════════════════════════════════════╝`;

    case 'phone':
      return `╔══════════════════════════════════════════════════════════════╗
║  📱 Phone Intelligence Results                               ║
╠══════════════════════════════════════════════════════════════╣
║  Number        : ${target.padEnd(45)}║
║  Valid         : ✓ Yes                                       ║
║  Country       : United States                               ║
║  Carrier       : Verizon Wireless                            ║
║  Line Type     : Mobile                                      ║
║  Location      : New York, NY                                ║
╚══════════════════════════════════════════════════════════════╝`;

    case 'dns':
      return `╔══════════════════════════════════════════════════════════════╗
║  🌐 DNS Enumeration Results                                  ║
╠══════════════════════════════════════════════════════════════╣
║  Domain        : ${target.padEnd(45)}║
║  A Records     : 142.250.80.46                               ║
║  AAAA Records  : 2607:f8b0:4004:815::200e                    ║
║  MX Records    : 10 smtp.google.com                          ║
║  NS Records    : ns1.google.com                              ║
║                 : ns2.google.com                             ║
║  TXT Records   : v=spf1 include:_spf.google.com ~all         ║
╚══════════════════════════════════════════════════════════════╝`;

    case 'subdomain':
      return `╔══════════════════════════════════════════════════════════════╗
║  🔎 Subdomain Discovery Results                              ║
╠══════════════════════════════════════════════════════════════╣
║  Target        : ${target.padEnd(45)}║
║  Found         : 8 subdomains                                ║
║                                                              ║
║  www.${target.padEnd(52)}║
║  mail.${target.padEnd(51)}║
║  api.${target.padEnd(52)}║
║  blog.${target.padEnd(51)}║
║  shop.${target.padEnd(51)}║
║  admin.${target.padEnd(50)}║
║  support.${target.padEnd(48)}║
║  cdn.${target.padEnd(52)}║
╚══════════════════════════════════════════════════════════════╝`;

    case 'tech':
      return `╔══════════════════════════════════════════════════════════════╗
║  ⚙️  Technology Detection Results                            ║
╠══════════════════════════════════════════════════════════════╣
║  URL           : ${target.padEnd(45)}║
║  Server        : nginx/1.20.1                                ║
║  CMS           : WordPress 6.4                               ║
║  Framework     : React 18.2                                  ║
║  Language      : PHP 8.1                                     ║
║  Analytics     : Google Analytics 4                          ║
║  CDN           : Cloudflare                                  ║
║  SSL           : TLS 1.3                                     ║
╚══════════════════════════════════════════════════════════════╝`;

    case 'breach':
      return `╔══════════════════════════════════════════════════════════════╗
║  🔓 Data Breach Check Results                                ║
╠══════════════════════════════════════════════════════════════╣
║  Email         : ${target.padEnd(45)}║
║  Breaches      : 0 found                                     ║
║  Status        : ✓ No breaches detected                      ║
║                                                              ║
║  Recommendation: Continue monitoring for new breaches        ║
╚══════════════════════════════════════════════════════════════╝`;

    case 'portscan':
      return `╔══════════════════════════════════════════════════════════════╗
║  🔌 Port Scan Results                                        ║
╠══════════════════════════════════════════════════════════════╣
║  Target        : ${target.padEnd(45)}║
║  Open Ports    : 3                                           ║
║                                                              ║
║  Port 80   (HTTP)    - Open                                  ║
║  Port 443  (HTTPS)   - Open                                  ║
║  Port 22   (SSH)     - Filtered                              ║
╚══════════════════════════════════════════════════════════════╝`;

    default:
      return `╔══════════════════════════════════════════════════════════════╗
║  OSINT Result                                                ║
╠══════════════════════════════════════════════════════════════╣
║  Tool          : ${tool.padEnd(45)}║
║  Target        : ${target.padEnd(45)}║
║  Status        : Query executed successfully                 ║
╚══════════════════════════════════════════════════════════════╝`;
  }
};

// Send chat message with OSINT support
export const sendChatMessage = async (messages: ChatMessage[]): Promise<string> => {
  const lastMessage = messages[messages.length - 1];
  const userInput = lastMessage?.parts[0]?.text || '';

  // Check for help command
  if (userInput.trim() === '/help') {
    return `╔══════════════════════════════════════════════════════════════╗
║  WORM AI - OSINT Commands Help                               ║
╠══════════════════════════════════════════════════════════════╣
║  /whois [domain]      - Domain registration info             ║
║  /ipgeo [ip]          - IP geolocation data                  ║
║  /email [email]       - Email intelligence                   ║
║  /username [name]     - Username search                      ║
║  /phone [number]      - Phone lookup                         ║
║  /social [plat] [usr] - Social media analysis                ║
║  /dns [domain]        - DNS enumeration                      ║
║  /subdomain [domain]  - Subdomain discovery                  ║
║  /tech [url]          - Technology detection                 ║
║  /breach [email]      - Data breach check                    ║
║  /portscan [host]     - Port scanning                        ║
╚══════════════════════════════════════════════════════════════╝`;
  }

  // Check if it's an OSINT command
  const osintCommand = parseOSINTCommand(userInput);
  if (osintCommand) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateOSINTResult(osintCommand.tool, osintCommand.params);
  }

  // Regular chat - simulate AI response
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = [
    'I understand. How can I assist you further with your investigation?',
    'Acknowledged. What specific OSINT tool would you like to use?',
    'Copy that. Ready to process your request.',
    'Understood. I\'m standing by for your next command.',
    'Roger. The system is ready for your input.',
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export default {
  sendChatMessage,
  isOSINTCommand,
  getOSINTToolsList,
  parseOSINTCommand
};
