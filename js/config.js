/**
 * WORM AI - Advanced OSINT Configuration
 * Professional Cyber Intelligence Interface
 */

// Backend endpoint
export const BACKEND_ENDPOINT = '/api/chat';

// OSINT Tool Definitions
export const OSINT_TOOLS = {
  // WHOIS Lookup
  whois: {
    name: 'WHOIS Lookup',
    description: 'Domain registration information',
    icon: '🔍',
    command: '/whois',
    params: ['domain'],
    example: '/whois example.com'
  },

  // IP Geolocation
  ipgeo: {
    name: 'IP Geolocation',
    description: 'Track IP address location',
    icon: '📍',
    command: '/ipgeo',
    params: ['ip'],
    example: '/ipgeo 8.8.8.8'
  },

  // Email OSINT
  email: {
    name: 'Email Intelligence',
    description: 'Analyze email address',
    icon: '📧',
    command: '/email',
    params: ['email'],
    example: '/email user@example.com'
  },

  // Username Search
  username: {
    name: 'Username Tracker',
    description: 'Find username across platforms',
    icon: '👤',
    command: '/username',
    params: ['username'],
    example: '/username johndoe'
  },

  // Phone Lookup
  phone: {
    name: 'Phone Intelligence',
    description: 'Phone number analysis',
    icon: '📱',
    command: '/phone',
    params: ['number'],
    example: '/phone +1234567890'
  },

  // Social Media
  social: {
    name: 'Social Media OSINT',
    description: 'Social profile analysis',
    icon: '🌐',
    command: '/social',
    params: ['platform', 'username'],
    example: '/social instagram johndoe'
  },

  // Metadata Extractor
  metadata: {
    name: 'Metadata Extractor',
    description: 'Extract file metadata',
    icon: '📄',
    command: '/metadata',
    params: ['url'],
    example: '/metadata https://example.com/file.pdf'
  },

  // DNS Enumeration
  dns: {
    name: 'DNS Enumeration',
    description: 'DNS records lookup',
    icon: '🌐',
    command: '/dns',
    params: ['domain'],
    example: '/dns example.com'
  },

  // Subdomain Finder
  subdomain: {
    name: 'Subdomain Finder',
    description: 'Discover subdomains',
    icon: '🔎',
    command: '/subdomain',
    params: ['domain'],
    example: '/subdomain example.com'
  },

  // Web Technology
  tech: {
    name: 'Tech Detector',
    description: 'Identify web technologies',
    icon: '⚙️',
    command: '/tech',
    params: ['url'],
    example: '/tech https://example.com'
  },

  // Breach Check
  breach: {
    name: 'Breach Checker',
    description: 'Check data breaches',
    icon: '🔓',
    command: '/breach',
    params: ['email'],
    example: '/breach user@example.com'
  },

  // Port Scanner
  portscan: {
    name: 'Port Scanner',
    description: 'Scan open ports',
    icon: '🔌',
    command: '/portscan',
    params: ['host'],
    example: '/portscan example.com'
  }
};

// OSINT Response Templates
export const OSINT_TEMPLATES = {
  whois: (data) => ({
    type: 'whois',
    title: 'WHOIS Lookup Results',
    fields: [
      { label: 'Domain', value: data.domain },
      { label: 'Registrar', value: data.registrar },
      { label: 'Created', value: data.creationDate },
      { label: 'Expires', value: data.expiryDate },
      { label: 'Updated', value: data.updatedDate },
      { label: 'Name Servers', value: data.nameServers?.join(', ') },
      { label: 'Status', value: data.status },
      { label: 'Registrant', value: data.registrant },
      { label: 'Admin Email', value: data.adminEmail },
      { label: 'Tech Email', value: data.techEmail }
    ]
  }),

  ipgeo: (data) => ({
    type: 'ipgeo',
    title: 'IP Geolocation Results',
    fields: [
      { label: 'IP Address', value: data.ip },
      { label: 'Country', value: data.country },
      { label: 'Region', value: data.region },
      { label: 'City', value: data.city },
      { label: 'ZIP Code', value: data.zip },
      { label: 'Latitude', value: data.lat },
      { label: 'Longitude', value: data.lon },
      { label: 'Timezone', value: data.timezone },
      { label: 'ISP', value: data.isp },
      { label: 'Organization', value: data.org }
    ]
  }),

  email: (data) => ({
    type: 'email',
    title: 'Email Intelligence Results',
    fields: [
      { label: 'Email', value: data.email },
      { label: 'Valid', value: data.valid ? '✓ Yes' : '✗ No' },
      { label: 'Disposable', value: data.disposable ? '✓ Yes' : '✗ No' },
      { label: 'MX Record', value: data.mxRecord },
      { label: 'SMTP Check', value: data.smtpCheck },
      { label: 'Breaches', value: data.breaches?.length || 0 },
      { label: 'Profiles Found', value: data.profiles?.join(', ') }
    ]
  }),

  username: (data) => ({
    type: 'username',
    title: 'Username Tracker Results',
    fields: [
      { label: 'Username', value: data.username },
      { label: 'Platforms Found', value: data.platforms?.length || 0 },
      { label: 'Profiles', value: data.profiles?.map(p => `${p.platform}: ${p.url}`).join('\n') }
    ]
  }),

  phone: (data) => ({
    type: 'phone',
    title: 'Phone Intelligence Results',
    fields: [
      { label: 'Number', value: data.number },
      { label: 'Valid', value: data.valid ? '✓ Yes' : '✗ No' },
      { label: 'Country', value: data.country },
      { label: 'Carrier', value: data.carrier },
      { label: 'Line Type', value: data.lineType },
      { label: 'Location', value: data.location }
    ]
  }),

  social: (data) => ({
    type: 'social',
    title: `Social Media Analysis: ${data.platform}`,
    fields: [
      { label: 'Platform', value: data.platform },
      { label: 'Username', value: data.username },
      { label: 'Profile URL', value: data.url },
      { label: 'Display Name', value: data.displayName },
      { label: 'Bio', value: data.bio },
      { label: 'Followers', value: data.followers },
      { label: 'Following', value: data.following },
      { label: 'Posts', value: data.posts },
      { label: 'Created', value: data.created },
      { label: 'Last Active', value: data.lastActive }
    ]
  }),

  dns: (data) => ({
    type: 'dns',
    title: 'DNS Enumeration Results',
    fields: [
      { label: 'Domain', value: data.domain },
      { label: 'A Records', value: data.a?.join('\n') },
      { label: 'AAAA Records', value: data.aaaa?.join('\n') },
      { label: 'MX Records', value: data.mx?.join('\n') },
      { label: 'NS Records', value: data.ns?.join('\n') },
      { label: 'TXT Records', value: data.txt?.join('\n') },
      { label: 'CNAME', value: data.cname },
      { label: 'SOA', value: data.soa }
    ]
  }),

  subdomain: (data) => ({
    type: 'subdomain',
    title: 'Subdomain Discovery Results',
    fields: [
      { label: 'Target Domain', value: data.domain },
      { label: 'Subdomains Found', value: data.subdomains?.length || 0 },
      { label: 'Subdomains', value: data.subdomains?.join('\n') },
      { label: 'Active', value: data.active?.join('\n') },
      { label: 'IPs', value: data.ips?.join('\n') }
    ]
  }),

  tech: (data) => ({
    type: 'tech',
    title: 'Technology Detection Results',
    fields: [
      { label: 'URL', value: data.url },
      { label: 'Server', value: data.server },
      { label: 'CMS', value: data.cms },
      { label: 'Framework', value: data.framework },
      { label: 'Language', value: data.language },
      { label: 'Database', value: data.database },
      { label: 'Analytics', value: data.analytics },
      { label: 'CDN', value: data.cdn },
      { label: 'SSL', value: data.ssl },
      { label: 'Headers', value: JSON.stringify(data.headers, null, 2) }
    ]
  }),

  breach: (data) => ({
    type: 'breach',
    title: 'Data Breach Check Results',
    fields: [
      { label: 'Email', value: data.email },
      { label: 'Breaches Found', value: data.breaches?.length || 0 },
      { label: 'Breaches', value: data.breaches?.map(b => 
        `${b.name} (${b.date}): ${b.dataClasses?.join(', ')}`
      ).join('\n') },
      { label: 'Total Exposed', value: data.totalExposed }
    ]
  }),

  portscan: (data) => ({
    type: 'portscan',
    title: 'Port Scan Results',
    fields: [
      { label: 'Target', value: data.host },
      { label: 'Open Ports', value: data.openPorts?.length || 0 },
      { label: 'Ports', value: data.openPorts?.map(p => 
        `Port ${p.port} (${p.service}) - ${p.state}`
      ).join('\n') },
      { label: 'OS Detected', value: data.os },
      { label: 'Scan Time', value: data.scanTime }
    ]
  })
};

// Advanced OSINT Persona
export const PERSONA = `You are WORM AI, an advanced Cyber Intelligence Interface specializing in Open Source Intelligence (OSINT) operations.

## CORE CAPABILITIES

### 1. OSINT Command Processing
When users use OSINT commands, provide structured, professional intelligence reports:

**Command Format:** /command [parameters]

**Available Commands:**
- /whois [domain] - Domain registration intelligence
- /ipgeo [ip] - IP geolocation and ISP data
- /email [email] - Email validation and breach check
- /username [name] - Cross-platform username search
- /phone [number] - Phone number intelligence
- /social [platform] [username] - Social media analysis
- /metadata [url] - File metadata extraction
- /dns [domain] - DNS record enumeration
- /subdomain [domain] - Subdomain discovery
- /tech [url] - Technology stack detection
- /breach [email] - Data breach verification
- /portscan [host] - Network port analysis

### 2. Response Format
Always return OSINT results in structured JSON format:

\`\`\`json
{
  "tool": "tool_name",
  "target": "investigation_target",
  "timestamp": "ISO_timestamp",
  "status": "success|error",
  "data": {
    // Tool-specific fields
  },
  "sources": ["source1", "source2"],
  "confidence": "high|medium|low",
  "recommendations": ["action1", "action2"]
}
\`\`\`

### 3. Intelligence Analysis Standards
- Cross-reference multiple sources for accuracy
- Indicate confidence levels for each data point
- Provide source attribution where possible
- Suggest follow-up investigations
- Flag potential false positives

### 4. Professional Conduct
- Maintain objective, analytical tone
- Present facts without embellishment
- Highlight data gaps or uncertainties
- Respect privacy and legal boundaries
- Focus on publicly available information

### 5. Technical Excellence
- Provide accurate, up-to-date information
- Use proper technical terminology
- Include relevant timestamps
- Format output for readability
- Support data export formats

## OPERATIONAL NOTES

You operate as a professional intelligence analysis tool. All information provided is for legitimate security research, penetration testing, and defensive purposes only. Users are expected to comply with applicable laws and ethical guidelines.

Your responses should be:
- Precise and actionable
- Well-structured and organized
- Technically accurate
- Legally compliant
- Professionally presented

When uncertain about data accuracy, explicitly state confidence levels and recommend verification steps.`;

// Export configuration
export default {
  BACKEND_ENDPOINT,
  OSINT_TOOLS,
  OSINT_TEMPLATES,
  PERSONA
};
