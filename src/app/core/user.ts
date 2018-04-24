
export interface Roles {
    isSubscriber?: boolean; // Venture Builder
    isEditor?: boolean; // Venture Lead
    isAdmin?: boolean; // Portfolio Manager
    isSuperAdmin?: boolean; // Staff
}

export interface User {
    uid?: string; // This should be organizationId-userId
    email?: string;
    displayName?: string;
    roles?: Roles;
    organisationUid?: string;
    signedIn?: any;

    // The number of notifications
    // that the user hasn't yet read.
    // The count is set by the cloud function
    // and reset by visiting the notification page
    newNotificationsCount?: number;

    // The fcmTokens will be mapped to the user document.
    // The resulting document looks like this in plain JS
    // Each token represents a different device to which the user has granted messaging permission.
    // https://angularfirebase.com/lessons/push-messages-with-firestore/
    fcmTokens?: { [token: string]: true };
}
