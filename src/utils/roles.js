/** API dan keladigan rollar */
export const ROLES = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    OPERATOR: "operator",
};

export const ROLE_LABELS = {
    [ROLES.SUPER_ADMIN]: "Super Admin",
    [ROLES.ADMIN]: "Admin",
    [ROLES.OPERATOR]: "Operator",
};

export function getRoleLabel(role) {
    return ROLE_LABELS[role] || role || "";
}

export function normalizeRole(role) {
    return String(role ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
}

export function isOperator(role) {
    const r = normalizeRole(role);
    return r === ROLES.OPERATOR || r === "operator";
}

export function isSuperAdmin(role) {
    const r = normalizeRole(role);
    return r === ROLES.SUPER_ADMIN || r === "superadmin";
}

export function isAdmin(role) {
    const r = normalizeRole(role);
    return r === ROLES.ADMIN || r === "admin";
}

export function hasRole(userRole, requiredRole) {
    if (!requiredRole) return true;
    if (requiredRole === ROLES.SUPER_ADMIN || requiredRole === "SUPER_ADMIN") {
        return isSuperAdmin(userRole);
    }
    if (requiredRole === ROLES.ADMIN || requiredRole === "ADMIN") {
        return isAdmin(userRole);
    }
    if (requiredRole === ROLES.OPERATOR || requiredRole === "OPERATOR") {
        return isOperator(userRole);
    }
    return userRole === requiredRole;
}
