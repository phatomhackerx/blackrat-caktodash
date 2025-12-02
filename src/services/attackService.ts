// Attack Service - Simulates various attack techniques

import { mockXSSPayloads, mockSQLInjectionPayloads, mockHashResults } from './mockData'

export const attackService = {
  // SQL Injection testing
  async testSQLInjection(
    url: string,
    parameter: string,
    technique: string,
    dbms: string
  ): Promise<{
    vulnerable: boolean
    payloads: typeof mockSQLInjectionPayloads
    tables?: string[]
    data?: any[]
  }> {
    await new Promise(resolve => setTimeout(resolve, 2500))

    const vulnerable = Math.random() > 0.3

    if (vulnerable) {
      return {
        vulnerable: true,
        payloads: mockSQLInjectionPayloads,
        tables: ['users', 'products', 'orders', 'sessions'],
        data: [
          { id: 1, username: 'admin', email: 'admin@example.com', password_hash: '***' },
          { id: 2, username: 'user1', email: 'user1@example.com', password_hash: '***' }
        ]
      }
    }

    return {
      vulnerable: false,
      payloads: []
    }
  },

  // XSS testing
  async testXSS(
    url: string,
    xssType: string,
    testForms: boolean,
    testParams: boolean
  ): Promise<{
    vulnerable: boolean
    findings: Array<{
      url: string
      parameter: string
      payload: string
      severity: string
      context: string
    }>
    tested_payloads: typeof mockXSSPayloads
  }> {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const vulnerable = Math.random() > 0.4

    if (vulnerable) {
      return {
        vulnerable: true,
        findings: [
          {
            url: `${url}/search`,
            parameter: 'q',
            payload: '<script>alert(1)</script>',
            severity: 'high',
            context: 'HTML'
          },
          {
            url: `${url}/profile`,
            parameter: 'name',
            payload: '"><script>alert(1)</script>',
            severity: 'medium',
            context: 'Attribute'
          }
        ],
        tested_payloads: mockXSSPayloads
      }
    }

    return {
      vulnerable: false,
      findings: [],
      tested_payloads: mockXSSPayloads
    }
  },

  // Hash cracking
  async crackHash(
    hash: string,
    hashType: string,
    attackMode: string,
    wordlist: string,
    onProgress?: (progress: { percentage: number; attempts: number }) => void
  ): Promise<{
    success: boolean
    plaintext?: string
    attempts: number
    time: number
  }> {
    const startTime = Date.now()
    const totalAttempts = Math.floor(Math.random() * 1000000) + 50000

    // Simulate cracking progress
    for (let i = 0; i <= 100; i += 5) {
      if (onProgress) {
        onProgress({
          percentage: i,
          attempts: Math.floor((totalAttempts * i) / 100)
        })
      }
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    const time = Date.now() - startTime

    // Check if hash exists in mock database
    const hashDb = mockHashResults[hashType as keyof typeof mockHashResults] || {}
    const plaintext = hashDb[hash as keyof typeof hashDb]

    if (plaintext) {
      return {
        success: true,
        plaintext,
        attempts: totalAttempts,
        time
      }
    }

    return {
      success: false,
      attempts: totalAttempts,
      time
    }
  },

  // Brute force attack
  async bruteForce(
    target: string,
    service: string,
    username: string,
    wordlist: string,
    onProgress?: (progress: { current: number; total: number }) => void
  ): Promise<{
    success: boolean
    password?: string
    attempts: number
  }> {
    const wordlistSize = 10000
    
    for (let i = 0; i < wordlistSize; i += 100) {
      if (onProgress) {
        onProgress({ current: i, total: wordlistSize })
      }
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    const success = Math.random() > 0.7

    if (success) {
      const passwords = ['password123', 'admin', 'letmein', 'Welcome1', 'P@ssw0rd']
      return {
        success: true,
        password: passwords[Math.floor(Math.random() * passwords.length)],
        attempts: Math.floor(Math.random() * wordlistSize)
      }
    }

    return {
      success: false,
      attempts: wordlistSize
    }
  }
}
