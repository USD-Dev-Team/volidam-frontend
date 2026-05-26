/** Rol bo‘yicha lidlar ro‘yxati bazaviy yo‘li */
export function getLeadsBasePath(pathname = "") {
    const p = String(pathname ?? "");
    if (p.startsWith("/operator")) return "/operator/leads";
    if (p.startsWith("/admin")) return "/admin/leads";
    if (p.startsWith("/superadmin")) return "/superadmin/leads";
    return "/superadmin/leads";
}

export function getLeadDetailPath(basePath, lidId) {
    const id = String(lidId ?? "").trim();
    return id ? `${basePath}/${id}` : basePath;
}
