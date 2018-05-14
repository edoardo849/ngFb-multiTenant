export interface Roles {
  isSubscriber?: boolean; // Venture Builder
  isEditor?: boolean; // Venture Lead
  isAdmin?: boolean; // Portfolio Manager
  isSuperAdmin?: boolean; // Staff
}

export interface NewUser {
  email: string;
  displayName: string;
  roles: Roles;
  passwordRequiresReset: boolean;
}

export interface LoggedInUser {
  signedIn: any; // holds timestamp for login actions - in auth.service
}

export interface User extends NewUser, LoggedInUser {
  uid: string; // This should be organizationId-userId
  // The fcmTokens will be mapped to the user document.
  // The resulting document looks like this in plain JS
  // Each token represents a different device to which the user has granted messaging permission.
  // https://angularfirebase.com/lessons/push-messages-with-firestore/
  fcmTokens?: { [token: string]: true };
}
