export {
    filterFieldProps,
    searchFieldProps,
    volidamFormLabel,
    volidamPrimaryButton,
    volidamPrimaryButtonSm,
    volidamGhostButton,
    volidamOutlineButton,
    volidamDangerButton,
    volidamDangerIconButton,
    volidamSectionShadow,
} from "../ui/volidamUi";

/** Gorizontal scroll rejimida ustun kengligi */
export const LEADS_KANBAN_COL_WIDTH = { base: "340px", lg: "380px" };
/** Qiymatsiz lid kartochkalari */
export const LEAD_CARD_MIN_H_COMPACT = "76px";

/**
 * @param {boolean} useHorizontalScroll — statuslar limitdan oshganda
 */
export function leadsKanbanColumnLayout(useHorizontalScroll) {
    if (useHorizontalScroll) {
        const colW = LEADS_KANBAN_COL_WIDTH;
        return {
            flex: { base: `0 0 ${colW.base}`, lg: `0 0 ${colW.lg}` },
            minW: colW,
            maxW: colW,
            w: colW,
        };
    }

    return {
        flex: "1 1 0",
        minW: 0,
        maxW: "100%",
        w: undefined,
    };
}
