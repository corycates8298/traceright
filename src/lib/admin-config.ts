// src/lib/admin-config.ts

/**
 * This file can be used to store administrator-level configurations,
 * such as lists of admin UIDs, system-wide settings, or other
 * sensitive configurations that should be managed carefully.
 */

// Example: Define a list of super-admin UIDs
export const SUPER_ADMIN_UIDS = [
  'hWg5L0Cin3duMKe04jYbrY7Lyik1', // Example UID, replace with actual admin UIDs
  // Add other super-admin UIDs here
];

// Example: Configuration for a system feature
export const SYSTEM_SETTINGS = {
  maintenanceMode: false,
  apiRateLimit: 100, // requests per minute
};
