const VERSION = "v1";

export function leadsBoardScrollSessionKey(roleScope = "default") {
    return `volidam:leadsKanban:${VERSION}:${roleScope}`;
}

export function buildLeadsBoardFilterSig({ statusFilter = "", search = "" } = {}) {
    return [String(statusFilter ?? "").trim(), String(search ?? "").trim()].join("|");
}

export function readLeadsBoardScrollSession(key) {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;
        const o = JSON.parse(raw);
        return o && typeof o === "object" ? o : null;
    } catch {
        return null;
    }
}

export function writeLeadsBoardScrollSession(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify({ ...data, ts: Date.now() }));
    } catch {
        /* quota */
    }
}
