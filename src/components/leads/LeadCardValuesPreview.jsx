import { Fragment } from "react";
import { Flex } from "@chakra-ui/react";
import { getCompactLidValues, countFilledLidValues } from "../../utils/lidColumns";
import LeadValuePill from "./LeadValuePill";

const PREVIEW_LIMIT = 3;

/**
 * @param {boolean} [inline] — ota Flex ichida (telefon bilan bir qator)
 */
export default function LeadCardValuesPreview({ lid, inline = false }) {
    const preview = getCompactLidValues(lid, PREVIEW_LIMIT);
    const total = countFilledLidValues(lid);
    const more = total > preview.length ? total - preview.length : 0;

    if (total === 0) return null;

    const pills = (
        <>
            {preview.map((item, index) => (
                <LeadValuePill
                    key={item.key}
                    label={item.label}
                    value={item.value}
                    columnId={item.columnId}
                    index={index}
                />
            ))}
            {more > 0 ? (
                <LeadValuePill variant="more" value={`+${more} yana`} />
            ) : null}
        </>
    );

    if (inline) {
        return <Fragment>{pills}</Fragment>;
    }

    return (
        <Flex
            direction="row-reverse"
            flexWrap="wrap"
            justify="flex-start"
            align="flex-start"
            gap={1.5}
            minW={0}
        >
            {pills}
        </Flex>
    );
}
