import {
    Box,
    Flex,
    Text,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
} from "@chakra-ui/react";
import { Phone, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { countFilledLidValues } from "../../utils/lidColumns";
import { LEAD_CARD_MIN_H_COMPACT } from "./leadStyles";
import LeadCardValuesPreview from "./LeadCardValuesPreview";

function LeadCardPhone({ phone, phoneColor }) {
    if (!phone) return null;
    return (
        <Flex
            align="center"
            gap={1.5}
            flexShrink={0}
            minW={0}
            maxW="100%"
        >
            <Icon as={Phone} boxSize={3} color={phoneColor} flexShrink={0} />
            <Text fontSize="xs" fontWeight="600" color="text" noOfLines={1}>
                {phone}
            </Text>
        </Flex>
    );
}

export default function LeadCard({ lid, onOpen, onEdit, onDelete, isDragging }) {
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
    const hoverBorder = useColorModeValue("blue.400", "blue.300");
    const cardBg = useColorModeValue("white", "whiteAlpha.50");
    const phoneColor = useColorModeValue("green.600", "green.300");

    const title = lid.fio?.trim() || "—";
    const phone = lid.telefon_raqam?.trim() || "";
    const hasValues = countFilledLidValues(lid) > 0;
    const hasFooter = hasValues || !!phone;

    return (
        <Box
            p={3}
            minH={hasFooter ? undefined : LEAD_CARD_MIN_H_COMPACT}
            w="100%"
            minW={0}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            bg={cardBg}
            opacity={isDragging ? 0.85 : 1}
            transition={
                isDragging
                    ? "none"
                    : "border-color 0.2s, box-shadow 0.2s, transform 0.15s"
            }
            boxShadow="sm"
            _hover={
                isDragging
                    ? undefined
                    : {
                          transform: "translateY(-1px)",
                          borderColor: hoverBorder,
                          boxShadow: "md",
                      }
            }
            cursor="grab"
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("lidId", lid.id);
                e.dataTransfer.setData("statusId", lid.status_id || "");
                e.dataTransfer.effectAllowed = "move";
            }}
            onClick={() => onOpen(lid)}
        >
            <Flex align="flex-start" gap={2} mb={hasFooter ? 2 : 0} minW={0}>
                <Text
                    fontWeight="800"
                    fontSize="sm"
                    lineHeight="short"
                    noOfLines={3}
                    letterSpacing="0.02em"
                    textTransform="uppercase"
                    flex={1}
                    minW={0}
                    pr={1}
                >
                    {title}
                </Text>

                <Menu placement="bottom-end" isLazy>
                    <MenuButton
                        as={IconButton}
                        aria-label="Lid amallari"
                        icon={<MoreVertical size={16} />}
                        size="xs"
                        variant="ghost"
                        borderRadius="md"
                        flexShrink={0}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                    <MenuList
                        minW="160px"
                        zIndex={30}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MenuItem
                            icon={<Pencil size={14} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.(lid);
                            }}
                        >
                            Tahrirlash
                        </MenuItem>
                        <MenuItem
                            icon={<Trash2 size={14} />}
                            color="red.500"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.(lid);
                            }}
                        >
                            O&apos;chirish
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            {hasFooter ? (
                <Flex
                    flexWrap="wrap-reverse"
                    justify={
                        phone && hasValues
                            ? "space-between"
                            : hasValues
                              ? "flex-end"
                              : "flex-start"
                    }
                    align="center"
                    alignContent="space-between"
                    columnGap={2}
                    rowGap={1.5}
                    w="100%"
                    minW={0}
                    mt="auto"
                >
                    <LeadCardPhone phone={phone} phoneColor={phoneColor} />
                    {hasValues ? (
                        <Flex
                            direction="row-reverse"
                            flexWrap="wrap"
                            justify="flex-end"
                            gap={1.5}
                            flex="0 1 auto"
                            minW={0}
                            maxW="100%"
                        >
                            <LeadCardValuesPreview lid={lid} inline />
                        </Flex>
                    ) : null}
                </Flex>
            ) : null}
        </Box>
    );
}
