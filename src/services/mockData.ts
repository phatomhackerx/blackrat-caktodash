// Mock Data Service - Centralized mock data for the entire application

export const mockNetworkDevices = [
  {
    id: '1',
    name: 'Router Principal',
    ip: '192.168.1.1',
    mac: '00:1A:2B:3C:4D:5E',
    vendor: 'Cisco',
    type: 'router',
    status: 'online',
    ports: [80, 443, 22],
    services: ['HTTP', 'HTTPS', 'SSH'],
    lastSeen: '2 min ago',
    risk: 'low'
  },
  {
    id: '2',
    name: 'Desktop-001',
    ip: '192.168.1.105',
    mac: '00:1A:2B:3C:4D:6F',
    vendor: 'Dell',
    type: 'desktop',
    status: 'online',
    ports: [3389, 135],
    services: ['RDP', 'RPC'],
    lastSeen: '5 min ago',
    risk: 'medium'
  },
  {
    id: '3',
    name: 'Server-DB',
    ip: '192.168.1.50',
    mac: '00:1A:2B:3C:4D:7A',
    vendor: 'HP',
    type: 'server',
    status: 'online',
    ports: [3306, 22, 80],
    services: ['MySQL', 'SSH', 'HTTP'],
    lastSeen: '1 min ago',
    risk: 'high'
  },
  {
    id: '4',
    name: 'IoT-Camera-01',
    ip: '192.168.1.200',
    mac: '00:1A:2B:3C:4D:8B',
    vendor: 'Hikvision',
    type: 'camera',
    status: 'offline',
    ports: [554, 80],
    services: ['RTSP', 'HTTP'],
    lastSeen: '2 hours ago',
    risk: 'medium'
  }
]

export const mockTargets = [
  {
    id: '1',
    name: 'example.com',
    ip: '93.184.216.34',
    description: 'Production web server',
    tags: ['web', 'production'],
    priority: 'high',
    status: 'online',
    risk: 'low',
    lastSeen: '1 min ago',
    ports: [80, 443, 22],
    services: ['HTTP/1.1 Apache', 'HTTPS TLS 1.3', 'OpenSSH 8.2'],
    notes: 'Primary production server. Monitor for unusual activity.'
  },
  {
    id: '2',
    name: 'staging.example.com',
    ip: '192.168.1.100',
    description: 'Staging environment',
    tags: ['web', 'staging'],
    priority: 'medium',
    status: 'online',
    risk: 'medium',
    lastSeen: '5 min ago',
    ports: [80, 443, 3306],
    services: ['HTTP/1.1 Nginx', 'HTTPS TLS 1.2', 'MySQL 8.0'],
    notes: 'Staging server with recent security patches applied.'
  },
  {
    id: '3',
    name: 'api.example.com',
    ip: '203.0.113.50',
    description: 'API gateway',
    tags: ['api', 'critical'],
    priority: 'critical',
    status: 'online',
    risk: 'high',
    lastSeen: 'just now',
    ports: [443, 8080, 6379],
    services: ['HTTPS/2', 'HTTP Alt', 'Redis 6.2'],
    notes: 'Critical API endpoint. High traffic. Requires immediate attention if compromised.'
  }
]

export const mockAlerts = [
  {
    id: '1',
    type: 'Port Scan Detected',
    severity: 'high',
    source: '203.0.113.42',
    message: 'Multiple port scans detected from external IP',
    time: '2 min ago',
    status: 'active'
  },
  {
    id: '2',
    type: 'Suspicious Login',
    severity: 'critical',
    source: 'auth-server',
    message: 'Failed SSH login attempts (15x) from unknown IP',
    time: '5 min ago',
    status: 'active'
  },
  {
    id: '3',
    type: 'High CPU Usage',
    severity: 'warning',
    source: 'server-01',
    message: 'CPU usage exceeded 85% threshold',
    time: '10 min ago',
    status: 'acknowledged'
  }
]

export const mockVulnerabilities = [
  {
    id: 'CVE-2024-1234',
    name: 'SQL Injection in Login Form',
    severity: 'critical',
    cvss: 9.8,
    affected: '/api/auth/login',
    description: 'SQL injection vulnerability allows unauthenticated attackers to bypass authentication',
    solution: 'Update authentication module to v2.1.0 or implement prepared statements',
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1234'],
    discovered: '2024-01-15'
  },
  {
    id: 'CVE-2024-5678',
    name: 'Cross-Site Scripting (XSS)',
    severity: 'high',
    cvss: 7.5,
    affected: '/dashboard/profile',
    description: 'Reflected XSS in user profile page allows script injection',
    solution: 'Sanitize all user inputs and implement Content Security Policy',
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-5678'],
    discovered: '2024-01-20'
  },
  {
    id: 'CVE-2024-9012',
    name: 'Insecure Direct Object Reference',
    severity: 'medium',
    cvss: 6.5,
    affected: '/api/files/{id}',
    description: 'Insufficient access controls allow users to access files of other users',
    solution: 'Implement proper authorization checks on file access endpoints',
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-9012'],
    discovered: '2024-01-25'
  }
]

export const mockExploits = [
  {
    id: 'EXP-001',
    name: 'Apache Struts RCE',
    category: 'Remote Code Execution',
    severity: 'critical',
    cve: 'CVE-2017-5638',
    platform: 'Linux/Windows',
    description: 'Remote code execution via Content-Type header',
    success_rate: '95%',
    disclosure_date: '2017-03-06'
  },
  {
    id: 'EXP-002',
    name: 'EternalBlue SMB',
    category: 'Network Exploit',
    severity: 'critical',
    cve: 'CVE-2017-0144',
    platform: 'Windows',
    description: 'SMBv1 buffer overflow leads to remote code execution',
    success_rate: '98%',
    disclosure_date: '2017-03-14'
  },
  {
    id: 'EXP-003',
    name: 'WordPress Plugin SQLi',
    category: 'Web Application',
    severity: 'high',
    cve: 'CVE-2023-1234',
    platform: 'Web',
    description: 'SQL injection in popular WordPress plugin',
    success_rate: '85%',
    disclosure_date: '2023-05-15'
  }
]

export const mockPayloads = [
  {
    id: 'PAY-001',
    name: 'Reverse Shell - Linux',
    type: 'Shell',
    language: 'bash',
    size: '2 KB',
    description: 'Bash reverse shell for Linux systems',
    created: '2024-01-10'
  },
  {
    id: 'PAY-002',
    name: 'Windows Backdoor',
    type: 'Backdoor',
    language: 'powershell',
    size: '15 KB',
    description: 'PowerShell-based persistence backdoor',
    created: '2024-01-12'
  },
  {
    id: 'PAY-003',
    name: 'PHP Web Shell',
    type: 'Web Shell',
    language: 'php',
    size: '5 KB',
    description: 'Obfuscated PHP web shell with file manager',
    created: '2024-01-15'
  }
]

export const mockPhishingTemplates = [
  {
    id: 'PHISH-001',
    name: 'Office 365 Login',
    category: 'Credential Harvesting',
    success_rate: '85%',
    targets: 'Business Users',
    description: 'Fake Office 365 login page with MFA bypass',
    preview_url: '/templates/o365.html'
  },
  {
    id: 'PHISH-002',
    name: 'Password Reset',
    category: 'Social Engineering',
    success_rate: '78%',
    targets: 'All Users',
    description: 'Urgent password reset notification',
    preview_url: '/templates/reset.html'
  }
]

export const mockDNSRecords = {
  'example.com': [
    { type: 'A', value: '93.184.216.34', ttl: 3600 },
    { type: 'AAAA', value: '2606:2800:220:1:248:1893:25c8:1946', ttl: 3600 },
    { type: 'MX', value: 'mail.example.com', priority: 10, ttl: 3600 },
    { type: 'NS', value: 'ns1.example.com', ttl: 86400 },
    { type: 'NS', value: 'ns2.example.com', ttl: 86400 },
    { type: 'TXT', value: 'v=spf1 include:_spf.example.com ~all', ttl: 3600 }
  ]
}

export const mockWHOISData = {
  'example.com': {
    domain_name: 'example.com',
    registrar: 'Example Registrar Inc.',
    creation_date: '1995-08-14',
    expiration_date: '2025-08-13',
    updated_date: '2024-07-20',
    status: ['clientTransferProhibited', 'serverDeleteProhibited'],
    nameservers: ['ns1.example.com', 'ns2.example.com'],
    registrant: {
      name: 'Example Organization',
      organization: 'Example Corp',
      email: 'admin@example.com',
      country: 'US'
    },
    admin: {
      name: 'Admin Contact',
      email: 'admin@example.com'
    },
    tech: {
      name: 'Technical Contact',
      email: 'tech@example.com'
    }
  }
}

export const mockSubdomains = [
  { subdomain: 'www.example.com', ip: '93.184.216.34', status: 'online' },
  { subdomain: 'mail.example.com', ip: '93.184.216.35', status: 'online' },
  { subdomain: 'api.example.com', ip: '93.184.216.36', status: 'online' },
  { subdomain: 'staging.example.com', ip: '192.168.1.100', status: 'offline' },
  { subdomain: 'dev.example.com', ip: '192.168.1.101', status: 'online' }
]

export const mockEmails = [
  { email: 'contact@example.com', source: 'Website', verified: true },
  { email: 'admin@example.com', source: 'WHOIS', verified: true },
  { email: 'support@example.com', source: 'DNS', verified: false },
  { email: 'info@example.com', source: 'Social Media', verified: true },
  { email: 'sales@example.com', source: 'Website', verified: true }
]

export const mockHashResults = {
  'md5': {
    '5f4dcc3b5aa765d61d8327deb882cf99': 'password',
    '098f6bcd4621d373cade4e832627b4f6': 'test',
    'e10adc3949ba59abbe56e057f20f883e': '123456'
  },
  'sha1': {
    '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8': 'password',
    'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3': 'test'
  },
  'sha256': {
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8': 'password'
  }
}

export const mockPortScanResults = [
  { port: 22, service: 'SSH', state: 'open', version: 'OpenSSH 8.2p1', risk: 'low' },
  { port: 80, service: 'HTTP', state: 'open', version: 'Apache 2.4.41', risk: 'low' },
  { port: 443, service: 'HTTPS', state: 'open', version: 'Apache 2.4.41 + OpenSSL', risk: 'low' },
  { port: 3306, service: 'MySQL', state: 'open', version: 'MySQL 8.0.23', risk: 'high' },
  { port: 8080, service: 'HTTP-Proxy', state: 'open', version: 'Jetty 9.4', risk: 'medium' }
]

export const mockXSSPayloads = [
  { payload: '<script>alert(1)</script>', context: 'HTML', success: true },
  { payload: '"><script>alert(1)</script>', context: 'Attribute', success: true },
  { payload: 'javascript:alert(1)', context: 'URL', success: false },
  { payload: '<img src=x onerror=alert(1)>', context: 'HTML', success: true }
]

export const mockSQLInjectionPayloads = [
  { payload: "' OR '1'='1", technique: 'Boolean-based', success: true },
  { payload: "1' UNION SELECT NULL--", technique: 'Union-based', success: true },
  { payload: "1' AND SLEEP(5)--", technique: 'Time-based', success: true }
]
