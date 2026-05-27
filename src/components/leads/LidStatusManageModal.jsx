import {
    Button,
    VStack,
    HStack,
    Text,
    IconButton,
    Badge,
    Box,
    useColorModeValue,
} from "@chakra-ui/react";
import { ChevronUp, ChevronDown, Plus } from "lucide-react";
import VolidamModalShell from "../ui/VolidamModalShell";
import { normalizeStatusRoles } from "../../utils/lidStatus";
import {
    volidamGhostButton,
    volidamOutlineButton,
    volidamPrimaryButton,
} from "./leadStyles";

export default function LidStatusManageModal({
    isOpen,
    onClose,
    statuses,
    onAdd,
    onEdit,
    onDelete,
    onMoveUp,
    onMoveDown,
    onSaveOrder,
    loading,
}) {
    const rowBg = useColorModeValue("rgba(255,255,255,0.75)", "whiteAlpha.50");

    return (
        <VolidamModalShell
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            scrollBody
            title="Statuslarni boshqarish"
            subtitle="Faqat Super Admin status yaratishi va tartiblashi mumkin"
            footer={
                <>
                    <Button
                        {...volidamPrimaryButton}
                        leftIcon={<Plus size={16} />}
                        onClick={onAdd}
                    >
                        Yangi status
                    </Button>
                    <Button
                        {...volidamOutlineButton}
                        onClick={onSaveOrder}
                        isLoading={loading}
                    >
                        Tartibni saqlash
                    </Button>
                    <Button {...volidamGhostButton} onClick={onClose} ml="auto">
                        Yopish
                    </Button>
                </>
            }
        >
            <VStack align="stretch" spacing={2}>
                {statuses.map((s, idx) => {
                    const roleKeys = s.roleKeys || normalizeStatusRoles(s.roles);
                    return (
                        <HStack
                            key={s.id}
                            px={3}
                            py={3}
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor="border"
                            bg={rowBg}
                            justify="space-between"
                        >
                            <HStack spacing={3} minW={0} flex={1}>
                                <Box
                                    w={3}
                                    h={3}
                                    borderRadius="full"
                                    bg={s.color || "#e91e63"}
                                    flexShrink={0}
                                />
                                <Box minW={0}>
                                    <Text fontWeight="700" fontSize="sm" noOfLines={1}>
                                        {s.name}
                                    </Text>
                                    <HStack spacing={1} mt={1} flexWrap="wrap">
                                        {roleKeys.map((r) => (
                                            <Badge
                                                key={r}
                                                fontSize="9px"
                                                borderRadius="full"
                                                colorScheme="pink"
                                                variant="subtle"
                                            >
                                                {r}
                                            </Badge>
                                        ))}
                                    </HStack>
                                </Box>
                            </HStack>
                            <HStack spacing={1} flexShrink={0}>
                                <IconButton
                                    size="xs"
                                    variant="ghost"
                                    aria-label="Yuqoriga"
                                    icon={<ChevronUp size={14} />}
                                    isDisabled={idx === 0}
                                    onClick={() => onMoveUp?.(idx)}
                                />
                                <IconButton
                                    size="xs"
                                    variant="ghost"
                                    aria-label="Pastga"
                                    icon={<ChevronDown size={14} />}
                                    isDisabled={idx === statuses.length - 1}
                                    onClick={() => onMoveDown?.(idx)}
                                />
                                <Button size="xs" variant="ghost" onClick={() => onEdit?.(s)}>
                                    Tahrirlash
                                </Button>
                                <Button
                                    size="xs"
                                    variant="ghost"
                                    colorScheme="red"
                                    onClick={() => onDelete?.(s)}
                                >
                                    O&apos;chirish
                                </Button>
                            </HStack>
                        </HStack>
                    );
                })}
            </VStack>
        </VolidamModalShell>
    );
}
