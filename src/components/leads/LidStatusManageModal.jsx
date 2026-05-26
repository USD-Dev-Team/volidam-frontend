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
import AdTasksModalShell from "../../pages/ADtasks/_components/AdTasksModalShell";
import { normalizeStatusRoles } from "../../utils/lidStatus";

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
    const rowBg = useColorModeValue("gray.50", "whiteAlpha.50");
    const borderCol = useColorModeValue("gray.200", "whiteAlpha.200");

    return (
        <AdTasksModalShell
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            title="Statuslarni boshqarish"
            subtitle="Faqat Super Admin status yaratishi va tartiblashi mumkin"
            footer={
                <>
                    <Button
                        leftIcon={<Plus size={16} />}
                        colorScheme="blue"
                        borderRadius="xl"
                        onClick={onAdd}
                    >
                        Yangi status
                    </Button>
                    <Button
                        variant="outline"
                        colorScheme="blue"
                        borderRadius="xl"
                        onClick={onSaveOrder}
                        isLoading={loading}
                    >
                        Tartibni saqlash
                    </Button>
                    <Button variant="ghost" onClick={onClose} ml="auto">
                        Yopish
                    </Button>
                </>
            }
        >
            <VStack spacing={2} align="stretch">
                {statuses.map((s, index) => {
                    const roleKeys = s.roleKeys || normalizeStatusRoles(s.roles);
                    const accent = s.color || "#888780";
                    return (
                        <HStack
                            key={s.id}
                            p={3}
                            bg={rowBg}
                            borderRadius="lg"
                            borderWidth="1px"
                            borderColor={borderCol}
                            borderLeftWidth="4px"
                            borderLeftColor={accent}
                            justify="space-between"
                            align="flex-start"
                        >
                            <Box flex={1} minW={0}>
                                <Text fontWeight="700" color={accent}>
                                    {s.name}
                                </Text>
                                <HStack mt={1} spacing={1} flexWrap="wrap">
                                    {roleKeys.map((r) => (
                                        <Badge
                                            key={`${s.id}-${r}`}
                                            variant="subtle"
                                            colorScheme="gray"
                                            borderRadius="full"
                                        >
                                            {r}
                                        </Badge>
                                    ))}
                                    {s.is_default && (
                                        <Badge colorScheme="green" variant="subtle" borderRadius="full">
                                            default
                                        </Badge>
                                    )}
                                </HStack>
                            </Box>
                            <HStack flexShrink={0}>
                                <IconButton
                                    size="sm"
                                    variant="ghost"
                                    icon={<ChevronUp size={16} />}
                                    aria-label="Yuqoriga"
                                    isDisabled={index === 0}
                                    onClick={() => onMoveUp(index)}
                                />
                                <IconButton
                                    size="sm"
                                    variant="ghost"
                                    icon={<ChevronDown size={16} />}
                                    aria-label="Pastga"
                                    isDisabled={index === statuses.length - 1}
                                    onClick={() => onMoveDown(index)}
                                />
                                <Button size="sm" variant="outline" onClick={() => onEdit(s)}>
                                    Tahrir
                                </Button>
                                <Button
                                    size="sm"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => onDelete(s)}
                                >
                                    O&apos;chir
                                </Button>
                            </HStack>
                        </HStack>
                    );
                })}
                {statuses.length === 0 && (
                    <Text color="gray.500" textAlign="center" py={6}>
                        Statuslar yo&apos;q. Yangi qo&apos;shing.
                    </Text>
                )}
            </VStack>
        </AdTasksModalShell>
    );
}
