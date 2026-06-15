import type { BadgeVariant } from '../components/Badge';
import type { AdvisorySeverity, AdvisoryStatus, ProductStatus, ProjectEntry } from './types';

export function productStatusVariant(status: ProductStatus): BadgeVariant {
  switch (status) {
    case 'released':
      return 'emerald';
    case 'beta':
    case 'alpha':
      return 'warning';
    case 'planned':
      return 'muted';
    case 'archived':
      return 'chrome';
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function advisorySeverityVariant(severity: AdvisorySeverity): BadgeVariant {
  switch (severity) {
    case 'critical':
      return 'critical';
    case 'high':
      return 'warning';
    case 'medium':
      return 'chrome';
    case 'low':
    case 'informational':
      return 'muted';
    default: {
      const _exhaustive: never = severity;
      return _exhaustive;
    }
  }
}

export function projectStatusLabel(entry: ProjectEntry): string {
  if (entry.status !== undefined) {
    return entry.status;
  }
  return entry.disclosed ? 'active' : 'private';
}

export function formatPlatformLabel(platform: string): string {
  if (platform === 'ios') {
    return 'iOS';
  }
  if (platform === 'macos') {
    return 'macOS';
  }
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

export function advisoryStatusLabel(status: AdvisoryStatus): string {
  return status.replace('-', ' ');
}
