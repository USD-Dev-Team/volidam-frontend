/** API: roles — string[] yoki { role: string }[] */
export function normalizeStatusRoles(roles) {
    if (!Array.isArray(roles)) return [];
    return roles.map((r) => (typeof r === "string" ? r : r?.role)).filter(Boolean);
}

export function unwrapStatuses(payload) {
    if (Array.isArray(payload)) return payload;
    const root = payload?.data ?? payload;
    if (Array.isArray(root)) return root;
    return root?.items ?? root?.statuses ?? root?.data ?? [];
}

export function normalizeStatusFromApi(status) {
    const roleKeys = normalizeStatusRoles(status?.roles);
    return { ...status, roleKeys };
}

export function sortStatuses(list) {
    return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function buildStatusPayload(form) {
    return {
        name: form.name.trim(),
        roles: form.roles,
        color: form.color,
        order: Number(form.order),
        is_default: !!form.is_default,
    };
}

export function getApiErrorMessage(err) {
    const data = err?.response?.data;
    if (!data) return err?.message || "Xatolik yuz berdi";
    if (Array.isArray(data.message)) return data.message.join(", ");
    if (typeof data.message === "string") return data.message;
    if (Array.isArray(data)) return data.map((e) => e.message || e).join(", ");
    return data.error || "Xatolik yuz berdi";
}
