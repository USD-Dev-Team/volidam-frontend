import {
    Box,
    Text,
    Button,
    HStack,
    VStack,
    Badge,
    IconButton,
    Spinner,
    useDisclosure,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { apiLidColumns } from "../../Services/api/LidColumns";
import { getNextColumnOrder } from "../../utils/lidColumns";
import { getApiErrorMessage } from "../../utils/lidStatus";
import { toastService } from "../../utils/toast";
import ConfirmDelModal from "../common/ConfirmDelModal";
import LidColumnFormModal from "./LidColumnFormModal";
import LeadDetailSection from "./LeadDetailSection";
import { volidamPrimaryButtonSm } from "./leadStyles";

export default function LidColumnsManageSection({
    columns = [],
    loading = false,
    onRefresh,
    canManage = false,
    canEditColumn = false,
}) {
    const [actionLoading, setActionLoading] = useState(false);
    const [formMode, setFormMode] = useState("create");
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const formModal = useDisclosure();
    const rowHover = useColorModeValue("neutral.50", "whiteAlpha.100");

    const showEdit = canManage || canEditColumn;
    const showFormModal = canManage || canEditColumn;

    const openCreate = () => {
        if (!canManage) return;
        setFormMode("create");
        setSelectedColumn(null);
        formModal.onOpen();
    };

    const openEdit = (col) => {
        if (!showEdit) return;
        setFormMode("edit");
        setSelectedColumn(col);
        formModal.onOpen();
    };

    const handleSubmit = async (data) => {
        if (formMode === "create" && !canManage) return;
        setActionLoading(true);
        try {
            if (formMode === "create") {
                await apiLidColumns.create(data);
            } else if (selectedColumn?.id) {
                await apiLidColumns.update(selectedColumn.id, data);
            }
            formModal.onClose();
            await onRefresh?.();
        } catch (err) {
            toastService.error(getApiErrorMessage(err) || "Saqlanmadi");
        } finally {
            setActionLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteTarget?.id || !canManage) return;
        setActionLoading(true);
        try {
            await apiLidColumns.delete(deleteTarget.id);
            setDeleteTarget(null);
            await onRefresh?.();
        } catch (err) {
            toastService.error(getApiErrorMessage(err) || "O'chirilmadi");
        } finally {
            setActionLoading(false);
        }
    };

    const sectionSubtitle = canManage
        ? "Lidlar uchun qo'shimcha maydonlar"
        : "Ro'yxat (faqat ko'rish)";

    const createBtn = canManage ? (
        <Button
            {...volidamPrimaryButtonSm}
            leftIcon={<Plus size={14} />}
            onClick={openCreate}
        >
            Yaratish
        </Button>
    ) : null;

    return (
        <>
            <LeadDetailSection
                title="Columnlar"
                subtitle={sectionSubtitle}
                action={createBtn}
            >
                {loading ? (
                    <HStack justify="center" py={6}>
                        <Spinner size="sm" />
                    </HStack>
                ) : columns.length === 0 ? (
                    <Text fontSize="sm" color="textSecondary" py={2}>
                        Columnlar hozircha yo&apos;q
                    </Text>
                ) : (
                    <VStack align="stretch" spacing={2}>
                        {columns.map((col) => (
                            <HStack
                                key={col.id}
                                px={3}
                                py={2.5}
                                borderRadius="lg"
                                borderWidth="1px"
                                borderColor="border"
                                bg="surface"
                                _hover={{ bg: rowHover }}
                                justify="space-between"
                            >
                                <Box minW={0} flex={1}>
                                    <Text fontSize="sm" fontWeight="700" noOfLines={1}>
                                        {col.label}
                                    </Text>
                                    {col.is_required ? (
                                        <Badge
                                            colorScheme="orange"
                                            fontSize="10px"
                                            mt={1}
                                        >
                                            Majburiy
                                        </Badge>
                                    ) : null}
                                </Box>
                                {showEdit ? (
                                    <HStack spacing={1} flexShrink={0}>
                                        <IconButton
                                            aria-label="Tahrirlash"
                                            icon={<Pencil size={14} />}
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => openEdit(col)}
                                        />
                                        {canManage ? (
                                            <IconButton
                                                aria-label="O'chirish"
                                                icon={<Trash2 size={14} />}
                                                size="sm"
                                                variant="ghost"
                                                colorScheme="red"
                                                onClick={() => setDeleteTarget(col)}
                                            />
                                        ) : null}
                                    </HStack>
                                ) : null}
                            </HStack>
                        ))}
                    </VStack>
                )}
            </LeadDetailSection>

            {showFormModal ? (
                <LidColumnFormModal
                    isOpen={formModal.isOpen}
                    onClose={formModal.onClose}
                    mode={formMode}
                    initialData={selectedColumn}
                    onSubmit={handleSubmit}
                    loading={actionLoading}
                    nextOrder={getNextColumnOrder(columns)}
                />
            ) : null}

            {canManage ? (
                <ConfirmDelModal
                    isOpen={Boolean(deleteTarget)}
                    onClose={() => {
                        if (!actionLoading) setDeleteTarget(null);
                    }}
                    onConfirm={confirmDelete}
                    itemName={deleteTarget?.label}
                    loading={actionLoading}
                    typeItem="column"
                />
            ) : null}
        </>
    );
}
