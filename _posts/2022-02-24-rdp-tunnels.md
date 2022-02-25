---
layout: post
title: "RDP Tunnels"
date: 2022-02-24T20:27:51-08:00
---


### Rationale

I love the persistence of a host machine! I'm too cheap to get a VPS. I really like the windows 11 OS but really love mac laptops. I left `3389` open on my router (with DDNS) and found myself getting brute forced. I saw [this post](https://orth.uk/ssh-over-cloudflare/) around the same time, and realized tunnelling could be a great alternative.

### Assumptions

#### General Assumptions

I wrote this for my situation. While setting it up, I found there was not a central guide, so I made one. If it doesn't perfectly fit your situation, hopefully a part of it will help.

#### Assumptions About You

- You have administrator access to both machines
- You are comfortable with the command line on both systems
- You have VSCode installed on both machines
- You're aware of the concept of SSH
- You have a cloudflare account and a website there
- You're using [brew](https://brew.sh)

#### Assumptions About This Guide

- I've got `example.com` on my cloudflare account (I don't, *obvs*)
- My tunnel is named `wormhole`
- My tunnel id is 123455677890asdf
- My macOS username is `me`

### Host Setup
#### Windows Setup

1.  get pwsh (i used `winget`)

    ```
    PS> winget install Microsoft.PowerShell
    ```
    - At the time of writing, should be v7.2
    
2.  install chocolatey at [https://chocolatey.org/]()
    
    ```
    PS> Set-ExecutionPolicy Bypass -Scope Process -Force [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    ```
    
3.  install cloudflared via chocolatey
    
    ```
    PS> choco install cloudflared
    ```
    
4.  login
    ```
    PS> cloudflared login
    ```
    - you may need to manually open the link in the
    output and select the site you'd like to add the tunnel to
    
5.  create a tunnel
    `PS> cloudflared tunnel create wormhole`
    
6.  setup cloudflared as a service
    ```
    PS> cloudflared service install
    PS> mkdir C:\Windows\System32\config\systemprofile\.cloudflared
    ```
    
7.  create a config
    ```
    PS> code C:\Windows\System32\config\systemprofile\.cloudflared\config.yml
    ```
    - eaxmple: 
    
    ```yml
    tunnel: 123455677890asdf
    credentials-file: C:\Windows\System32\config\systemprofile\.cloudflared\123455677890asdf.json
    
    ingress:
        - hostname: wormhole.example.com
        service: ssh://localhost:22
        - service: http_status:404
    ```
    
8.  set service as automatic

    ```
    PS> Set-Service -Name Cloudflared -StartupType "Automatic"
    PS> Set-ItemProperty HKLM:\SYSTEM\CurrentControlSet\Services\Cloudflared\ -Name ImagePath -Value "C:\ProgramData\chocolatey\lib\cloudflared\tools\cloudflared.exe --config=C:\Windows\System32\config\systemprofile\.cloudflared\config.yml tunnel run"
    PS> cloudflared tunnel route dns  wormhole.example
    ```
    
9.  add a non-admin user (for ssh only). enter a paasword when prompted
    
    ```
    PS> New-LocalUser -Name me-ssh
    ```

10. set pwsh as your default shell

    ```
    PS> New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Program Files\PowerShell\7\pwsh.exe" -PropertyType String -Force
    ```
    
11. create external user .ssh directory to house authorized_keys
    
    ```
    PS> mkdir C:\Users\me-ssh\.ssh
    ```
    
12. modify sshd_config
    
    ```
    PS> code C:\ProgramData\ssh\sshd_config
    ```
    
    - enable publickey authentication, uncomment this line
    
    ```yml
    PubkeyAuthentication yes
    ```
    
13. setup sshd & ssh-agent as automatic services, and start them
    
    ```
    PS> Set-Service -Name sshd -StartupType "Automatic"; Set-Service -Name ssh-agent -StartupType "Automatic"; Start-Service sshd; Start-Service ssh-agent
    ```
    

### Client Config

#### MacOS

1.  make sure developer tools are up to date
    
    ```
    $> brew install cloudflare/cloudflare/cloudflared
    ```
    
    - to confirm install
    
    ```
    $> cloudflared -v
    ```
2.  Login (just like on the host setup)
    ```
    $> cloudflared login
    ```
    - A browser window should have opened.
    
    
    - If the browser failed to open, please visit the output URL directly in your browser.
    
2. Select the site you want to to log in to
    - after selecting you'll see in the terminal
    
    ```
    You have successfully logged in.
    If you wish to copy your credentials to a server, they have been saved to:
    /Users/yourusername/.cloudflared/cert.pem
    ```
    
3.  next, update your hosts file
    ```
    $> code ~/.ssh/config
    ```
    

    - add the following

    ```
    Host *.example.com
        ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
    ```

4. now you can ssh into the box directly
    ```
    $> ssh me-ext@wormhole.example.com
    ```

5. But let's take this further for RDP and setup local forwarding

    ```
    $> ssh -L 56789:127.0.0.1:3389 me-ext@wormhole.example.com
    ```

6. Setup pub key and add to host
    ```
    cat ./.ssh/id_rsa.pub | ssh -l me-ext wormhole.example.com "echo | Out-File -FilePath ~/.ssh authorized_keys -Append"
    ```

### Further thoughts

Connect to the tunnel from the client machine on startup
https://mpharrigan.com/2016/05/17/background-ssh.html

Remove the password from the newly created user
Change default ports (ssh, RDP)
Restrict RDP access to 127.0.0.1 only
Create a host and client scripts to just take care of all of this