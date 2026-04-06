/**
 * WORM AI - Advanced OSINT Tools Module
 * Professional Cyber Intelligence Toolkit
 */

import { OSINT_TOOLS, OSINT_TEMPLATES } from './config.js';

/**
 * OSINT Engine - Core intelligence processing
 */
class OSINTEngine {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    this.requestQueue = [];
    this.isProcessing = false;
  }

  /**
   * Parse OSINT command from user input
   * @param {string} input - User input
   * @returns {Object|null} Parsed command or null
   */
  parseCommand(input) {
    const trimmed = input.trim();
    if (!trimmed.startsWith('/')) return null;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).filter(Boolean);

    // Find matching tool
    const toolKey = Object.keys(OSINT_TOOLS).find(
      key => OSINT_TOOLS[key].command === command
    );

    if (!toolKey) return null;

    const tool = OSINT_TOOLS[toolKey];
    
    return {
      tool: toolKey,
      command: tool.command,
      params: this.parseParams(tool, args),
      raw: trimmed
    };
  }

  /**
   * Parse parameters based on tool definition
   */
  parseParams(tool, args) {
    const params = {};
    tool.params.forEach((param, index) => {
      params[param] = args[index] || null;
    });
    return params;
  }

  /**
   * Check cache for existing results
   */
  getCached(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  /**
   * Store result in cache
   */
  setCached(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Generate cache key
   */
  generateCacheKey(tool, params) {
    return `${tool}_${Object.values(params).join('_')}`;
  }

  /**
   * Execute OSINT command
   */
  async execute(commandData) {
    const { tool, params } = commandData;
    const cacheKey = this.generateCacheKey(tool, params);
    
    // Check cache
    const cached = this.getCached(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }

    // Execute based on tool type
    let result;
    switch (tool) {
      case 'whois':
        result = await this.whoisLookup(params.domain);
        break;
      case 'ipgeo':
        result = await this.ipGeolocation(params.ip);
        break;
      case 'email':
        result = await this.emailIntelligence(params.email);
        break;
      case 'username':
        result = await this.usernameSearch(params.username);
        break;
      case 'phone':
        result = await this.phoneLookup(params.number);
        break;
      case 'social':
        result = await this.socialAnalysis(params.platform, params.username);
        break;
      case 'dns':
        result = await this.dnsEnumeration(params.domain);
        break;
      case 'subdomain':
        result = await this.subdomainDiscovery(params.domain);
        break;
      case 'tech':
        result = await this.techDetection(params.url);
        break;
      case 'breach':
        result = await this.breachCheck(params.email);
        break;
      case 'portscan':
        result = await this.portScan(params.host);
        break;
      default:
        throw new Error(`Unknown tool: ${tool}`);
    }

    // Cache result
    this.setCached(cacheKey, result);
    
    return result;
  }

  /**
   * WHOIS Lookup
   */
  async whoisLookup(domain) {
    if (!domain) throw new Error('Domain required');
    
    // Simulate WHOIS data (replace with actual API)
    const mockData = {
      domain,
      registrar: 'Example Registrar, LLC',
      creationDate: '2020-01-15',
      expiryDate: '2025-01-15',
      updatedDate: '2024-01-10',
      nameServers: ['ns1.example.com', 'ns2.example.com'],
      status: 'clientTransferProhibited',
      registrant: 'REDACTED FOR PRIVACY',
      adminEmail: 'admin@example.com',
      techEmail: 'tech@example.com'
    };

    return OSINT_TEMPLATES.whois(mockData);
  }

  /**
   * IP Geolocation
   */
  async ipGeolocation(ip) {
    if (!ip) throw new Error('IP address required');
    
    // Validate IP format
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    if (!ipv4Regex.test(ip) && !ipv6Regex.test(ip)) {
      throw new Error('Invalid IP address format');
    }

    const mockData = {
      ip,
      country: 'United States',
      region: 'California',
      city: 'San Francisco',
      zip: '94102',
      lat: '37.7749',
      lon: '-122.4194',
      timezone: 'America/Los_Angeles',
      isp: 'Google LLC',
      org: 'Google Cloud'
    };

    return OSINT_TEMPLATES.ipgeo(mockData);
  }

  /**
   * Email Intelligence
   */
  async emailIntelligence(email) {
    if (!email) throw new Error('Email required');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    const mockData = {
      email,
      valid: true,
      disposable: false,
      mxRecord: 'mail.example.com',
      smtpCheck: 'Valid',
      breaches: [],
      profiles: ['github', 'twitter', 'linkedin']
    };

    return OSINT_TEMPLATES.email(mockData);
  }

  /**
   * Username Search
   */
  async usernameSearch(username) {
    if (!username) throw new Error('Username required');

    const platforms = [
      'github', 'twitter', 'instagram', 'facebook', 'linkedin',
      'reddit', 'youtube', 'tiktok', 'pinterest', 'tumblr'
    ];

    const mockData = {
      username,
      platforms: platforms.slice(0, 5),
      profiles: platforms.slice(0, 5).map(p => ({
        platform: p,
        url: `https://${p}.com/${username}`,
        exists: Math.random() > 0.3
      }))
    };

    return OSINT_TEMPLATES.username(mockData);
  }

  /**
   * Phone Lookup
   */
  async phoneLookup(number) {
    if (!number) throw new Error('Phone number required');

    const mockData = {
      number,
      valid: true,
      country: 'United States',
      carrier: 'Verizon Wireless',
      lineType: 'Mobile',
      location: 'New York, NY'
    };

    return OSINT_TEMPLATES.phone(mockData);
  }

  /**
   * Social Media Analysis
   */
  async socialAnalysis(platform, username) {
    if (!platform || !username) {
      throw new Error('Platform and username required');
    }

    const mockData = {
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      username,
      url: `https://${platform}.com/${username}`,
      displayName: username,
      bio: 'User bio would appear here...',
      followers: Math.floor(Math.random() * 10000),
      following: Math.floor(Math.random() * 1000),
      posts: Math.floor(Math.random() * 500),
      created: '2020-01-01',
      lastActive: '2024-01-15'
    };

    return OSINT_TEMPLATES.social(mockData);
  }

  /**
   * DNS Enumeration
   */
  async dnsEnumeration(domain) {
    if (!domain) throw new Error('Domain required');

    const mockData = {
      domain,
      a: ['192.168.1.1', '192.168.1.2'],
      aaaa: ['2001:db8::1'],
      mx: ['10 mail.example.com', '20 mail2.example.com'],
      ns: ['ns1.example.com', 'ns2.example.com'],
      txt: ['v=spf1 include:_spf.example.com ~all'],
      cname: 'www.example.com',
      soa: 'ns1.example.com admin.example.com 2024010101'
    };

    return OSINT_TEMPLATES.dns(mockData);
  }

  /**
   * Subdomain Discovery
   */
  async subdomainDiscovery(domain) {
    if (!domain) throw new Error('Domain required');

    const commonSubdomains = [
      'www', 'mail', 'ftp', 'admin', 'api', 'blog',
      'shop', 'support', 'dev', 'staging', 'cdn'
    ];

    const mockData = {
      domain,
      subdomains: commonSubdomains.map(s => `${s}.${domain}`),
      active: commonSubdomains.slice(0, 5).map(s => `${s}.${domain}`),
      ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3']
    };

    return OSINT_TEMPLATES.subdomain(mockData);
  }

  /**
   * Technology Detection
   */
  async techDetection(url) {
    if (!url) throw new Error('URL required');

    const mockData = {
      url,
      server: 'nginx/1.20.1',
      cms: 'WordPress 6.4',
      framework: 'React 18.2',
      language: 'PHP 8.1',
      database: 'MySQL 8.0',
      analytics: 'Google Analytics 4',
      cdn: 'Cloudflare',
      ssl: 'TLS 1.3',
      headers: {
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Content-Security-Policy': "default-src 'self'"
      }
    };

    return OSINT_TEMPLATES.tech(mockData);
  }

  /**
   * Breach Check
   */
  async breachCheck(email) {
    if (!email) throw new Error('Email required');

    const mockData = {
      email,
      breaches: [
        {
          name: 'Example Breach 2023',
          date: '2023-06-15',
          dataClasses: ['Email', 'Password', 'Username']
        }
      ],
      totalExposed: 1
    };

    return OSINT_TEMPLATES.breach(mockData);
  }

  /**
   * Port Scan
   */
  async portScan(host) {
    if (!host) throw new Error('Host required');

    const commonPorts = [
      { port: 22, service: 'SSH', state: 'open' },
      { port: 80, service: 'HTTP', state: 'open' },
      { port: 443, service: 'HTTPS', state: 'open' },
      { port: 21, service: 'FTP', state: 'filtered' },
      { port: 25, service: 'SMTP', state: 'closed' }
    ];

    const mockData = {
      host,
      openPorts: commonPorts.filter(p => p.state === 'open'),
      os: 'Linux 5.15',
      scanTime: '2.34s'
    };

    return OSINT_TEMPLATES.portscan(mockData);
  }

  /**
   * Format result for display
   */
  formatResult(result) {
    if (!result) return 'No results found';

    const lines = [
      `╔══════════════════════════════════════════════════════════════╗`,
      `║  ${result.title?.padEnd(58)}║`,
      `╠══════════════════════════════════════════════════════════════╣`
    ];

    if (result.fields) {
      result.fields.forEach(field => {
        const value = String(field.value || 'N/A').substring(0, 45);
        const line = `║  ${field.label.padEnd(15)}: ${value.padEnd(41)}║`;
        lines.push(line);
      });
    }

    lines.push(`╚══════════════════════════════════════════════════════════════╝`);
    
    return lines.join('\n');
  }

  /**
   * Get available tools list
   */
  getToolsList() {
    return Object.entries(OSINT_TOOLS).map(([key, tool]) => ({
      key,
      ...tool
    }));
  }

  /**
   * Get tool help
   */
  getToolHelp(command) {
    const tool = Object.values(OSINT_TOOLS).find(t => t.command === command);
    if (!tool) return null;

    return {
      name: tool.name,
      description: tool.description,
      usage: tool.example,
      parameters: tool.params
    };
  }
}

// Create singleton instance
const osintEngine = new OSINTEngine();

// Export for use
export { OSINTEngine, osintEngine };
export default osintEngine;
