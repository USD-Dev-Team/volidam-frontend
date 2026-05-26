/** Kanban kartochkadagi value pill ranglari (rasmdagi uslub) */
export const LEAD_VALUE_TAG_PALETTES = [
    {
        bg: { default: "#E8E4F8", _dark: "rgba(139, 124, 214, 0.22)" },
        color: { default: "#4A3F8C", _dark: "#C4B5FD" },
        border: { default: "#D4CEF0", _dark: "rgba(167, 154, 230, 0.45)" },
    },
    {
        bg: { default: "#FCE8D8", _dark: "rgba(234, 160, 110, 0.2)" },
        color: { default: "#7A3E1E", _dark: "#FDBA74" },
        border: { default: "#F5D0BC", _dark: "rgba(251, 191, 136, 0.4)" },
    },
    {
        bg: { default: "#F5F0E6", _dark: "rgba(214, 198, 160, 0.18)" },
        color: { default: "#6B5A3E", _dark: "#E7D5B7" },
        border: { default: "#E8DFD0", _dark: "rgba(214, 198, 160, 0.4)" },
    },
    {
        bg: { default: "#D8F5E4", _dark: "rgba(74, 180, 120, 0.2)" },
        color: { default: "#1F5C38", _dark: "#86EFAC" },
        border: { default: "#B8E8CE", _dark: "rgba(134, 239, 172, 0.4)" },
    },
    {
        bg: { default: "#E0F2FE", _dark: "rgba(56, 189, 248, 0.18)" },
        color: { default: "#0C4A6E", _dark: "#7DD3FC" },
        border: { default: "#BAE6FD", _dark: "rgba(125, 211, 252, 0.4)" },
    },
    {
        bg: { default: "#FCE7F3", _dark: "rgba(236, 72, 153, 0.18)" },
        color: { default: "#831843", _dark: "#F9A8D4" },
        border: { default: "#FBCFE8", _dark: "rgba(249, 168, 212, 0.4)" },
    },
];

export function getLeadValueTagPaletteIndex(columnId, fallbackIndex = 0) {
    if (!columnId) return fallbackIndex % LEAD_VALUE_TAG_PALETTES.length;
    let hash = 0;
    for (let i = 0; i < columnId.length; i += 1) {
        hash = (hash + columnId.charCodeAt(i)) % LEAD_VALUE_TAG_PALETTES.length;
    }
    return hash;
}
