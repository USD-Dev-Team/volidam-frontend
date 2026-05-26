export function parsePaginatedResponse(payload) {
    const root = payload?.data ?? payload;

    if (Array.isArray(root)) {
        return {
            items: root,
            total: root.length,
            page: 1,
            limit: root.length || 20,
            totalPages: 1,
        };
    }

    const items =
        root?.items ??
        root?.data ??
        root?.lids ??
        root?.content ??
        root?.results ??
        [];

    const total =
        root?.total ??
        root?.totalElements ??
        root?.totalCount ??
        root?.meta?.total ??
        items.length;

    const limit =
        root?.limit ?? root?.pageSize ?? root?.size ?? root?.meta?.limit ?? 20;

    const page = root?.page ?? root?.currentPage ?? root?.meta?.page ?? 1;

    const totalPages =
        root?.totalPages ??
        root?.meta?.totalPages ??
        Math.max(1, Math.ceil(total / limit));

    return { items, total, page, limit, totalPages };
}

export function unwrapEntity(payload) {
    return payload?.data ?? payload?.lid ?? payload;
}
