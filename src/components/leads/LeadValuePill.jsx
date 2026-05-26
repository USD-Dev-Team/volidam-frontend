import { Box, Text } from "@chakra-ui/react";
import {
    LEAD_VALUE_TAG_PALETTES,
    getLeadValueTagPaletteIndex,
} from "./leadValueTagStyles";

const TAG_RADIUS = "md";

export default function LeadValuePill({
    label,
    value,
    columnId,
    index = 0,
    variant = "value",
    fullWidth = false,
}) {
    const paletteIndex =
        variant === "more"
            ? -1
            : getLeadValueTagPaletteIndex(columnId, index);

    const palette =
        variant === "more"
            ? {
                  bg: { default: "neutral.100", _dark: "whiteAlpha.150" },
                  color: { default: "neutral.600", _dark: "neutral.300" },
                  border: { default: "neutral.200", _dark: "whiteAlpha.250" },
              }
            : LEAD_VALUE_TAG_PALETTES[paletteIndex];

    if (variant === "more") {
        const moreText = String(value ?? label ?? "").trim();
        if (!moreText) return null;
        return (
            <TagShell palette={palette} title={moreText} fullWidth={fullWidth}>
                <Text
                    fontSize="9px"
                    fontWeight="800"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    noOfLines={1}
                >
                    {moreText}
                </Text>
            </TagShell>
        );
    }

    const labelText = String(label ?? "").trim();
    const valueText = String(value ?? "").trim();
    if (!labelText && !valueText) return null;

    const title =
        labelText && valueText ? `${labelText}: ${valueText}` : labelText || valueText;

    return (
        <TagShell palette={palette} title={title} fullWidth={fullWidth}>
            {labelText ? (
                <Text
                    fontSize="8px"
                    fontWeight="700"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    opacity={0.85}
                    noOfLines={1}
                    lineHeight="1.1"
                >
                    {labelText}
                </Text>
            ) : null}
            {valueText ? (
                <Text
                    fontSize="9px"
                    fontWeight="800"
                    letterSpacing="0.04em"
                    textTransform="uppercase"
                    noOfLines={1}
                    lineHeight="1.2"
                    mt={labelText ? 0.5 : 0}
                >
                    {valueText}
                </Text>
            ) : null}
        </TagShell>
    );
}

function TagShell({ palette, title, children, fullWidth }) {
    return (
        <Box
            display="block"
            px={2}
            py={1}
            minH="24px"
            maxW="100%"
            w={fullWidth ? "100%" : "max-content"}
            borderRadius={TAG_RADIUS}
            borderWidth="1px"
            bg={palette.bg}
            color={palette.color}
            borderColor={palette.border}
            title={title}
            textAlign="left"
        >
            {children}
        </Box>
    );
}
