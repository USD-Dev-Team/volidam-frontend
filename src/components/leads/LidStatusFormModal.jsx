import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    Checkbox,
    NumberInput,
    NumberInputField,
    Switch,
    Text,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdTasksModalShell from "../../pages/ADtasks/_components/AdTasksModalShell";
import { ROLES } from "../../utils/roles";
import { normalizeStatusRoles } from "../../utils/lidStatus";
import { filterFieldProps } from "./leadStyles";

const ROLE_OPTIONS = [
    { value: ROLES.OPERATOR, label: "Operator" },
    { value: ROLES.ADMIN, label: "Admin" },
    { value: ROLES.SUPER_ADMIN, label: "Super Admin" },
];

const empty = {
    name: "",
    roles: [ROLES.OPERATOR, ROLES.ADMIN],
    color: "#888780",
    order: 0,
    is_default: false,
};

function normalizeHex(v) {
    const s = String(v ?? "").trim();
    if (/^#[0-9a-f]{6}$/i.test(s)) return s;
    return "#888780";
}

export default function LidStatusFormModal({
    isOpen,
    onClose,
    mode = "create",
    initialData,
    onSubmit,
    loading,
    nextOrder = 0,
}) {
    const [form, setForm] = useState(empty);
    const [roleError, setRoleError] = useState("");

    useEffect(() => {
        if (!isOpen) return;
        if (mode === "edit" && initialData) {
            setForm({
                name: initialData.name || "",
                roles: normalizeStatusRoles(initialData.roles),
                color: initialData.color || "#888780",
                order: initialData.order ?? 0,
                is_default: !!initialData.is_default,
            });
        } else {
            setForm({ ...empty, order: nextOrder });
        }
        setRoleError("");
    }, [isOpen, mode, initialData, nextOrder]);

    const toggleRole = (role) => {
        setRoleError("");
        setForm((p) => ({
            ...p,
            roles: p.roles.includes(role)
                ? p.roles.filter((r) => r !== role)
                : [...p.roles, role],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        if (form.roles.length === 0) {
            setRoleError("Kamida bitta rol tanlang");
            return;
        }
        await onSubmit({
            name: form.name.trim(),
            roles: form.roles,
            color: normalizeHex(form.color),
            order: Number(form.order),
            is_default: form.is_default,
        });
    };

    return (
        <AdTasksModalShell
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "create" ? "Yangi status" : "Statusni tahrirlash"}
            subtitle="Status nomi, rangi va ko'rinish huquqlari"
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} isDisabled={loading}>
                        Bekor qilish
                    </Button>
                    <Button
                        colorScheme="blue"
                        borderRadius="xl"
                        isLoading={loading}
                        onClick={handleSubmit}
                    >
                        {mode === "create" ? "Yaratish" : "Saqlash"}
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel fontSize="sm">Nom</FormLabel>
                        <Input
                            {...filterFieldProps}
                            value={form.name}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, name: e.target.value }))
                            }
                            placeholder="Masalan: YANGI"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize="sm">Rang</FormLabel>
                        <HStack>
                            <Input
                                type="color"
                                value={normalizeHex(form.color)}
                                onChange={(e) =>
                                    setForm((p) => ({ ...p, color: e.target.value }))
                                }
                                w="56px"
                                h="40px"
                                p={1}
                                borderRadius="lg"
                                cursor="pointer"
                            />
                            <Input
                                {...filterFieldProps}
                                value={form.color}
                                onChange={(e) =>
                                    setForm((p) => ({ ...p, color: e.target.value }))
                                }
                                fontFamily="mono"
                                size="sm"
                            />
                        </HStack>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize="sm">Tartib (order)</FormLabel>
                        <NumberInput
                            value={form.order}
                            min={0}
                            onChange={(_, n) =>
                                setForm((p) => ({
                                    ...p,
                                    order: Number.isNaN(n) ? 0 : n,
                                }))
                            }
                        >
                            <NumberInputField {...filterFieldProps} />
                        </NumberInput>
                    </FormControl>

                    <FormControl isInvalid={!!roleError}>
                        <FormLabel fontSize="sm" mb={2}>
                            Ko&apos;rinish huquqi (rollar)
                        </FormLabel>
                        <VStack align="stretch" spacing={2}>
                            {ROLE_OPTIONS.map((r) => (
                                <Checkbox
                                    key={r.value}
                                    isChecked={form.roles.includes(r.value)}
                                    onChange={() => toggleRole(r.value)}
                                    colorScheme="blue"
                                >
                                    <Text fontSize="sm">{r.label}</Text>
                                </Checkbox>
                            ))}
                        </VStack>
                        <FormErrorMessage>{roleError}</FormErrorMessage>
                    </FormControl>

                    <FormControl display="flex" alignItems="center" gap={3}>
                        <Switch
                            isChecked={form.is_default}
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    is_default: e.target.checked,
                                }))
                            }
                            colorScheme="blue"
                        />
                        <FormLabel mb={0} fontSize="sm">
                            Default status
                        </FormLabel>
                    </FormControl>
                </VStack>
            </form>
        </AdTasksModalShell>
    );
}
