import {
    Button,
    useDisclosure,
    Text,
} from "@chakra-ui/react";
import { LucideLogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import VolidamModalShell from "../ui/VolidamModalShell";
import { volidamDangerButton, volidamGhostButton } from "../ui/volidamUi";

export default function LogoutModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logout } = useAuth();

    return (
        <>
            <Button
                aria-label="Chiqish"
                variant="ghost"
                borderRadius="full"
                p={2}
                minW={9}
                h={9}
                color="textSecondary"
                _hover={{ bg: "red.50", color: "red.500", _dark: { bg: "whiteAlpha.100" } }}
                onClick={onOpen}
            >
                <LucideLogOut size={20} />
            </Button>

            <VolidamModalShell
                isOpen={isOpen}
                onClose={onClose}
                tone="danger"
                title="Chiqishni tasdiqlang"
                subtitle="Tizimdan chiqasiz"
                footer={
                    <>
                        <Button {...volidamGhostButton} onClick={onClose}>
                            Bekor qilish
                        </Button>
                        <Button {...volidamDangerButton} onClick={logout}>
                            Chiqish
                        </Button>
                    </>
                }
            >
                <Text color="text">Haqiqatan ham tizimdan chiqmoqchimisiz?</Text>
            </VolidamModalShell>
        </>
    );
}
