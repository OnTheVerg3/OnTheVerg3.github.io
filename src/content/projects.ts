import type { ProjectEntry } from './types';

/**
 * Non-SnakeWorks project portfolio.
 *
 * Curated to surface the bigger applications the operator has built:
 * security suites, system-level modifiers, kernel research, red-team
 * infrastructure, and substantial native or full-stack utilities. Game
 * modifications, game-internal frameworks, and anti-cheat research are
 * intentionally excluded from this surface.
 *
 * Disclosure posture:
 *
 *   All entries below are `disclosed: true`. The renderer surfaces
 *   `privateName`, `description`, `tech`, and (if present) `links`.
 *   Flip an individual entry to `disclosed: false` if it should be
 *   gated; the schema preserves the publicName + summary + year + tags
 *   surface for gated entries.
 *
 *   No `links` field is populated on any entry: source repositories
 *   for these projects are private and source-code URLs are not
 *   surfaced on the public site.
 */
export const projects: readonly ProjectEntry[] = [
  {
    slug: 'jarvis',
    disclosed: true,
    publicName: 'Jarvis',
    privateName: 'Jarvis',
    summary:
      'Unified command-and-control framework: Go WebSocket relay server, staged ' +
      '.NET delivery chain, Electron + React operator dashboard, and a feature-complete ' +
      'post-exploitation implant.',
    description:
      'Six-component C2 platform. The Go server (WebSocket + REST API, token auth, ' +
      'TLS, profile-driven traffic shaping) brokers communication between operator ' +
      'and agent. The Stage 0 to Stage 4 delivery chain culminates in a fully managed ' +
      '.NET implant with HVNC (hidden desktop capture + input), per-call dynamic ' +
      'invocation, sleep obfuscation, AMSI / ETW patching, persistence, elevation, ' +
      'process management, file management, and a screenshot pipeline. Operator ' +
      'dashboard is an Electron + React 19 application with a frameless custom title ' +
      'bar, 17 components, and panels for terminal, file explorer, process manager, ' +
      'payload builder, HVNC viewer, screenshot gallery, tunnel manager, and Cloudflare ' +
      'redirector configuration. DLL proxy persistence is provided via a version.dll ' +
      'shim; Donut converts .NET assemblies to shellcode for stage delivery.',
    year: '2024-2026',
    tags: ['c2', 'red-team', 'windows'],
    tech: ['Go', 'C#', '.NET', 'React', 'Electron', 'Python', 'WebSocket', 'TLS'],
    status: 'active',
  },
  {
    slug: 'spectre',
    disclosed: true,
    publicName: 'Spectre',
    privateName: 'Spectre',
    summary:
      'UEFI firmware-level hardware identity suite. DXE-phase driver rewrites SMBIOS, ' +
      'disk, network, ACPI, PCI, USB, and EDID descriptors before the operating system ' +
      'boots, paired with a WPF management dashboard and a modular system cleaner engine.',
    description:
      'Four-component platform. The UEFI driver (SpectreSmbios.efi) is a DXE-phase ' +
      'firmware driver written in C against the EDK2 toolkit; it reads spoof profiles ' +
      'from NVRAM variables and patches firmware tables across seven hardware surfaces ' +
      '(motherboard / BIOS / system / baseboard serial / UUID, ATA IDENTIFY responses, ' +
      'NIC MAC addresses, ACPI / DSDT tables, PCI device + subsystem IDs, USB device ' +
      'descriptors, monitor EDID serial + name). A post-boot verification driver ' +
      'confirms the spoofs landed. The WPF dashboard (.NET 8) manages encrypted ' +
      'hardware profile vaults, writes them to NVRAM, registers the driver on the EFI ' +
      'System Partition, and falls back to registry-based spoofing on non-UEFI targets. ' +
      'A modular cleaner engine implements an ICleanerModule interface with separate ' +
      'system trace cleaners and 3-pass secure deletion. PowerShell tooling handles ' +
      'QEMU-based testing, self-signed UEFI certificate chain generation, and EFI ' +
      'System Partition deployment.',
    year: '2024-2026',
    tags: ['uefi', 'kernel', 'privacy', 'security-research'],
    tech: ['C', 'EDK2 / UEFI', 'C#', '.NET 8', 'WPF', 'PowerShell', 'NVRAM'],
    status: 'active',
  },
  {
    slug: 'cloak',
    disclosed: true,
    publicName: 'Cloak',
    privateName: 'Cloak',
    summary:
      'Browser plus network anti-fingerprint suite. Chrome MV3 extension, .NET 8 core ' +
      'library, REST service, Electron operator dashboard, and a Windows Filtering ' +
      'Platform callout driver for kernel-level traffic normalization.',
    description:
      'Five-component privacy stack. The Chrome MV3 extension overrides nine browser ' +
      'subsystems (WebRTC SDP sanitization with smart srflx / mDNS filtering, complete ' +
      'Date and Intl timezone override with DST-aware refresh, navigator language plus ' +
      'Accept-Language header rewriting, seeded canvas / WebGL / audio noise, ' +
      'deterministic geolocation with seeded accuracy jitter, Cloudflare bot-probe ' +
      'hardening, navigator normalization) with native function toString masking so ' +
      'detection scripts cannot tell the API surface has been patched. The C# .NET 8 ' +
      'core library provides location profile models, a driver IOCTL bridge, system ' +
      'DNS configuration, and proxy management. The minimal-API service exposes 18+ ' +
      'REST endpoints on localhost for profile CRUD, GeoIP enrichment, leak testing, ' +
      'and a kill switch. The Electron + React 19 dashboard has five pages with a ' +
      'glassmorphism design system and end-to-end leak test orchestration. The WFP ' +
      'callout driver registers three callouts (MSS clamping, TTL normalization, ' +
      'whitelist-based DNS firewall) and accepts IOCTLs for live configuration.',
    year: '2025-2026',
    tags: ['privacy', 'browser-extension', 'network', 'kernel'],
    tech: ['JavaScript', 'Chrome MV3', 'C#', '.NET 8', 'React', 'Electron', 'C', 'WDK / WFP'],
    status: 'active',
  },
  {
    slug: 'piercer',
    disclosed: true,
    publicName: 'Piercer',
    privateName: 'Piercer',
    summary:
      'Cloudflare origin IP discovery and direct-connection bypass toolkit. Fourteen ' +
      'discovery methods feed a five-check validation pipeline; confirmed origins are ' +
      'reachable via TLS-fingerprint-spoofed direct sessions.',
    description:
      'Python 3.12+ command-line toolkit with eight commands (scan, detect, discover, ' +
      'validate, connect, parse-email, monitor, config) built on Click with Rich ' +
      'formatting. Discovery surface aggregates fourteen methods across DNS history ' +
      '(SecurityTrails, ViewDNS.info), certificate transparency (crt.sh, Censys), ' +
      'brute-force subdomain enumeration with a 300+ wordlist, MX / SPF / DKIM / DMARC ' +
      'analysis, email header parsing, Shodan host + favicon hash search, Censys host ' +
      'search, WHOIS correlation, and outbound trigger guidance. The validator runs ' +
      'five checks (HTTP response match, SSL cert match, server headers, timing ' +
      'analysis, multi-path verification) and emits a confidence verdict ' +
      '(CONFIRMED / LIKELY / POSSIBLE / UNLIKELY / FAILED). Direct connection sessions ' +
      'use httpx with Host header injection plus curl_cffi browser TLS profiles ' +
      '(Chrome / Firefox / Safari) and HTTP/2 fingerprint matching; intelligent request ' +
      'pacing applies jitter and exponential backoff to evade Turnstile + rate limits. ' +
      'Windows hosts file management is administrator-elevated with backup / restore ' +
      'and Piercer-tagged entries for clean rollback.',
    year: 2025,
    tags: ['osint', 'network', 'cloudflare', 'security-research'],
    tech: [
      'Python 3.12+',
      'Click',
      'Rich',
      'httpx',
      'curl_cffi',
      'dnspython',
      'Shodan API',
      'Censys API',
    ],
    status: 'active',
  },
  {
    slug: 'vanguard',
    disclosed: true,
    publicName: 'Vanguard',
    privateName: 'Vanguard',
    summary:
      'Pre-exploitation red team platform. Multi-component scaffold spanning a fast ' +
      'network scanner, a vulnerability detection engine, a web application scanner, ' +
      'a protocol fuzzer, and an exploitation framework.',
    description:
      'Polyglot architecture deliberately picking the right language per component: ' +
      'Go for the high-throughput scanner, Python for the vulnerability analysis and ' +
      'detection engine, React + TypeScript for the operator console, and C for the ' +
      'low-level network primitives. Currently at the scaffolded stage; each component ' +
      'has its scope, surface, and integration contract defined but implementation is ' +
      'incrementally landing module by module.',
    year: 2026,
    tags: ['red-team', 'security-research', 'scanner'],
    tech: ['Go', 'Python', 'React', 'TypeScript', 'C'],
    status: 'active',
  },
  {
    slug: 'applocker',
    disclosed: true,
    publicName: 'AppLocker',
    privateName: 'AppLocker',
    summary:
      'PIN-locked application launcher with system tray UI. Blocks process launches ' +
      'until the correct PIN is entered, with per-app timer countdowns and global ' +
      'Lock-All / Unlock-All controls.',
    description:
      'Three-tier C# desktop application: Core (lock state logic and PIN validation), ' +
      'Interceptor (process blocking via the Windows API), Tray (system tray UI with ' +
      'dynamic per-app status indicators and timer countdowns). Designed for ' +
      'self-imposed focus enforcement: lock distracting applications behind a PIN with ' +
      'optional time-locked countdowns so the unlock cannot be bypassed by impulse. ' +
      'Recovery key escrow guards against permanent lockout.',
    year: '2023-2024',
    tags: ['windows', 'utility', 'productivity'],
    tech: ['C#', '.NET', 'WinForms', 'Win32 API'],
    status: 'shipped',
  },
  {
    slug: 'projectledger',
    disclosed: true,
    publicName: 'ProjectLedger',
    privateName: 'ProjectLedger',
    summary:
      'Personal finance management web application. Blazor WebAssembly frontend, ' +
      'ASP.NET Core Web API backend, Entity Framework Core persistence with full ' +
      'migration history.',
    description:
      'Full-stack C# application built as a three-project solution: Blazor WASM client ' +
      '(Razor pages, components, layouts), ASP.NET Core Web API server (controller + ' +
      'service + repository pattern with EF Core), and a shared project for DTOs and ' +
      'data models. EF Core migrations are tracked in version control so the database ' +
      'schema evolves alongside the code. A single launcher script brings up both the ' +
      'API server and the WASM client in development.',
    year: '2023-2024',
    tags: ['web', 'fullstack', 'finance'],
    tech: ['C#', 'Blazor WebAssembly', 'ASP.NET Core', 'Entity Framework Core', 'SQL'],
    status: 'shipped',
  },
  {
    slug: 'alertforge',
    disclosed: true,
    publicName: 'AlertForge',
    privateName: 'AlertForge',
    summary:
      'Multi-device emergency alert system for Android. Two paired apps (command ' +
      'center plus distributed panic button) communicate over MQTT with sub-second ' +
      'latency.',
    description:
      'Kotlin + Jetpack Compose Android system with two coordinating applications. ' +
      'The Primary app runs on the operator phone as a foreground service: MQTT ' +
      'listener over TLS via HiveMQ Cloud (QoS 1, 50 to 200 ms round-trip), ' +
      'configurable alarm sounds with volume override and DND bypass, alert history ' +
      'persisted to Room, user management, QR-code generation for pairing, and ' +
      'auto-start on boot. The Secondary app (distributed to trusted contacts) is a ' +
      'large panic button with two-second long-press safety, QR-code scanner for ' +
      'pairing, cooldown timer, and acknowledgment display. Multi-module Gradle build ' +
      'with app-primary, app-secondary, and a shared module for the MQTT client and ' +
      'common models. Material 3, MVVM + Hilt dependency injection, CameraX + ML Kit ' +
      'for QR scanning. Security: per-device credentials, topic isolation, revocation.',
    year: 2025,
    tags: ['android', 'iot', 'safety'],
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'MQTT', 'Room', 'Hilt', 'CameraX', 'ML Kit'],
    status: 'active',
  },
];
