# PRAVAH FLOW - Firebase Security Architecture

This document serves as the foundation for the security rules that will be implemented for the Firebase infrastructure (Realtime Database, Firestore, and Storage).

## Overview

The application follows a strict **Principle of Least Privilege**. Users and services should only have access to the data necessary to perform their functions.

## Authentication & Authorization

All data access (except explicitly public configuration) requires a valid, authenticated user token.
Authorization relies on Custom Claims embedded in the JWT token or via a dedicated user roles collection.

### Role-Based Access Control (RBAC)

The system distinguishes between several roles:

*   **Super Admin:** Full read/write access to all system data.
*   **Fleet Admin:** Full read/write access to all data scoped to their specific `fleetId`.
*   **Dispatcher:** Read access to fleet data, limited write access (e.g., assigning routes).
*   **Driver/Vehicle (IoT Device):** Write access only to their specific telemetry/location nodes; read access to their assigned routes.
*   **Viewer (Customer/Client):** Read-only access to specific journeys or tracking links.

## 1. Realtime Database (RTDB) Rules Strategy

The Realtime Database is primarily used for high-frequency, ephemeral data (e.g., live vehicle locations).

**Planned Structure:**

```json
{
  "rules": {
    "live_locations": {
      "$fleetId": {
        // Fleet Admin: read/write
        // Dispatcher: read
        "$vehicleId": {
          // Driver: write
          // Viewer (with active tracking link): read
        }
      }
    }
  }
}
```

## 2. Firestore Rules Strategy

Firestore is the source of truth for persistent data (organizations, routes, historical logs, user profiles).

**Planned Structure:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Base helper functions
    function isAuthenticated() { return request.auth != null; }
    function getUserRole() { return request.auth.token.role; }
    function isFleetAdmin(fleetId) { return request.auth.token.fleetId == fleetId && getUserRole() == 'ADMIN'; }

    match /fleets/{fleetId} {
      // Allow read/write if isFleetAdmin(fleetId)

      match /vehicles/{vehicleId} {
        // Vehicle config. Admin write, Dispatcher read.
      }
    }
  }
}
```

## 3. Storage Rules Strategy

Firebase Storage handles assets like driver profile pictures, vehicle condition reports, or proof of delivery.

**Strategy:**
- Files scoped by `fleetId`.
- Uploads require valid MIME types and size limits.

## Next Steps

1.  **Define Custom Claims Strategy:** Finalize how roles and `fleetId` are injected into Firebase Auth tokens.
2.  **Implement Rules:** Translate the strategies above into actual `.rules` files in the respective feature modules.
3.  **Create Test Suite:** Build local emulator tests to verify security rules against unauthorized access attempts.
