/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
  action: () => void;
}

/**
 * Check if keyboard event matches shortcut
 */
export function matchesShortcut(
  event: KeyboardEvent,
  shortcut: KeyboardShortcut
): boolean {
  const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
  const ctrlMatches = !!event.ctrlKey === !!shortcut.ctrlKey;
  const shiftMatches = !!event.shiftKey === !!shortcut.shiftKey;
  const altMatches = !!event.altKey === !!shortcut.altKey;
  const metaMatches = !!event.metaKey === !!shortcut.metaKey;

  return keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches;
}

/**
 * Format shortcut for display
 */
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const parts: string[] = [];
  
  // Use Cmd on Mac, Ctrl on others
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  
  if (shortcut.ctrlKey || shortcut.metaKey) {
    parts.push(isMac ? '⌘' : 'Ctrl');
  }
  if (shortcut.shiftKey) {
    parts.push('Shift');
  }
  if (shortcut.altKey) {
    parts.push(isMac ? '⌥' : 'Alt');
  }
  
  parts.push(shortcut.key.toUpperCase());
  
  return parts.join(' + ');
}

/**
 * Get modifier key based on platform
 */
export function getModifierKey(): 'ctrlKey' | 'metaKey' {
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  return isMac ? 'metaKey' : 'ctrlKey';
}
