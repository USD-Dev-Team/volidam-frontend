export function parseLidColumnsResponse(res) {
    const root = res?.data ?? res;
    const inner = root?.data ?? root;

    let list = [];
    if (Array.isArray(inner)) list = inner;
    else if (Array.isArray(inner?.items)) list = inner.items;
    else if (Array.isArray(inner?.columns)) list = inner.columns;
    else if (Array.isArray(root?.items)) list = root.items;

    return list
        .map((c) => ({
            id: c.id,
            label: c.label ?? "",
            is_required: !!c.is_required,
            order: Number(c.order) || 0,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
        }))
        .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
}

export function formatLidValueText(val) {
    if (val == null) return "";
    if (typeof val === "object") {
        return String(val.text ?? val.label ?? val.value ?? "").trim();
    }
    return String(val).trim();
}

/** Kanban kartochkada ko‘rsatish uchun (bo‘sh qiymatlar chiqmaydi) */
export function getCompactLidValues(lid, limit = 4) {
    const values = Array.isArray(lid?.values) ? lid.values : [];
    return values
        .map((v) => {
            const text = formatLidValueText(v.value);
            if (!text) return null;
            return {
                key: v.id ?? v.column_id ?? v.column?.id,
                columnId: v.column_id ?? v.column?.id ?? "",
                label: v.column?.label ?? "",
                value: text,
                order: Number(v.column?.order) || 0,
            };
        })
        .filter(Boolean)
        .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
        .slice(0, limit);
}

export function countFilledLidValues(lid) {
    const values = Array.isArray(lid?.values) ? lid.values : [];
    return values.filter((v) => formatLidValueText(v.value)).length;
}

export function getNextColumnOrder(columns) {
    if (!columns?.length) return 0;
    return Math.max(...columns.map((c) => c.order ?? 0)) + 1;
}

export function resolveLidValueRows(lid, columns = []) {
    const byId = new Map(columns.map((c) => [c.id, c]));
    const values = Array.isArray(lid?.values) ? lid.values : [];

    return values.map((v, i) => {
        const columnId = v.column_id ?? v.column?.id ?? "";
        const col = byId.get(columnId) ?? v.column;
        return {
            key: columnId || `value-${i}`,
            label: col?.label ?? (columnId || `Maydon ${i + 1}`),
            value:
                typeof v.value === "object" && v.value !== null
                    ? JSON.stringify(v.value)
                    : String(v.value ?? "—"),
        };
    });
}

export function getLidValueForColumn(lid, columnId) {
    const values = Array.isArray(lid?.values) ? lid.values : [];
    const row = values.find(
        (v) => String(v.column_id ?? v.column?.id ?? "") === String(columnId)
    );
    if (!row) return "";
    return formatLidValueText(row.value);
}

/** Barcha columnlar uchun form state */
export function buildColumnValueFormState(lid, columns = []) {
    const state = {};
    for (const col of columns) {
        state[col.id] = getLidValueForColumn(lid, col.id);
    }
    return state;
}

/** PUT /lids/:id — values massivi */
export function buildLidValuesPayload(columns = [], formValues = {}) {
    return columns.map((col) => {
        const raw = formValues[col.id];
        const trimmed =
            raw == null ? "" : String(raw).trim();
        return {
            column_id: col.id,
            value: trimmed === "" ? null : trimmed,
        };
    });
}

export function normalizeLidValuesWithColumns(values, columns = []) {
    const byId = new Map(columns.map((c) => [c.id, c]));
    if (!Array.isArray(values)) return [];
    return values.map((v) => {
        const columnId = v.column_id ?? v.column?.id ?? "";
        const col = byId.get(columnId);
        return {
            ...v,
            column_id: columnId,
            column: col ? { id: col.id, label: col.label } : v.column,
        };
    });
}
