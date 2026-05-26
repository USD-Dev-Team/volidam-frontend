import { Skeleton, Td, Tr, useColorModeValue } from "@chakra-ui/react";

export default function TableSkeleton({
    rows = 5,
    columns = 4,
    rowHeight = "20px",
    cellRadius = "md",
    withBorder = true,
    columnWidths = [],
    isZebra = false,
}) {
    const zebraBg = useColorModeValue("neutral.50", "whiteAlpha.50");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

    return (
        <>
            {Array(rows)
                .fill(0)
                .map((_, rowIndex) => (
                    <Tr
                        key={rowIndex}
                        bg={isZebra && rowIndex % 2 === 0 ? zebraBg : "transparent"}
                    >
                        {Array(columns)
                            .fill(0)
                            .map((_, colIndex) => (
                                <Td
                                    key={colIndex}
                                    borderBottom={withBorder ? "1px solid" : "none"}
                                    borderColor={borderColor}
                                >
                                    <Skeleton
                                        height={rowHeight}
                                        borderRadius={cellRadius}
                                        width={
                                            columnWidths[colIndex]
                                                ? columnWidths[colIndex]
                                                : "100%"
                                        }
                                    />
                                </Td>
                            ))}
                    </Tr>
                ))}
        </>
    );
}
