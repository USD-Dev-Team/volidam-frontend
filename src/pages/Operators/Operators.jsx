import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  IconButton,
  HStack,
  useToast,
  Spinner,
  Center,
  Text,
  SimpleGrid,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  AddIcon,
  LockIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { apiUsers } from "../../Services/api/Users";
import {
  dataTableContainerProps,
  dataTableHeadRowProps,
  dataTableRowHoverProps,
  volidamPrimaryButton,
  volidamGhostButton,
  volidamEditIconButton,
  volidamLockIconButton,
  volidamDeleteIconButton,
  volidamModalCloseButton,
} from "../../components/ui/volidamUi";

const emptyForm = {
  full_name: "",
  username: "",
  password: "",
  role: "operator",
};

export default function Operators() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [resetId, setResetId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isResetOpen,
    onOpen: onResetOpen,
    onClose: onResetClose,
  } = useDisclosure();

  const toast = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiUsers.getUsers("operator");
      setUsers(res.data || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAdd = () => {
    setEditId(null);
    setFormData(emptyForm);
    onFormOpen();
  };

  const handleOpenEdit = (user) => {
    setEditId(user.id);
    setFormData({
      full_name: user.full_name,
      username: user.username,
      password: "",
      role: "operator",
    });
    onFormOpen();
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await apiUsers.Update(formData, editId);
      } else {
        await apiUsers.Add(formData);
      }
      onFormClose();
      setFormData(emptyForm);
      await fetchUsers();
    } catch {
      toast({ title: "Xatolik yuz berdi", status: "error", duration: 3000 });
    }
  };

  const handleDelete = async () => {
    try {
      await apiUsers.Delete(deleteId);
      onDeleteClose();
      fetchUsers();
    } catch {
      toast({ title: "Xatolik yuz berdi", status: "error", duration: 3000 });
    }
  };

  const handleResetPassword = async () => {
    try {
      await apiUsers.ResetPassword(resetId, { password: newPassword });
      onResetClose();
      setNewPassword("");
    } catch {
      toast({ title: "Xatolik yuz berdi", status: "error", duration: 3000 });
    }
  };

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <HStack spacing={2}>
          <IconButton
            // icon={<ArrowLeft size={18} />}
            variant="ghost"
            aria-label="Orqaga"
            onClick={() => navigate("/superadmin")}
          />
        </HStack>
        <Button
          leftIcon={<AddIcon />}
          {...volidamPrimaryButton}
          colorScheme="blue"
          onClick={handleOpenAdd}
        >
          Yaratish
        </Button>
      </HStack>

      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : users.length === 0 ? (
        <Center py={10}>
          <Text color="gray.400">Ma'lumot yo'q</Text>
        </Center>
      ) : (
        <Box {...dataTableContainerProps}>
          <Table variant="simple" size="md">
            <Thead {...dataTableHeadRowProps}>
              <Tr>
                <Th>#</Th>
                <Th>To'liq ism</Th>
                <Th>Username</Th>
                <Th>Amallar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.length === 0 ? (   
                <Tr>
                  <Td colSpan={4}>
                    <Center py={6}>
                      <Text color="textSecondary">Ma'lumot yo'q</Text>
                    </Center>
                  </Td>
                </Tr>
              ) : (
               users.map((user, index) => (
  <Tr key={user.id} {...dataTableRowHoverProps}>
    <Td>{index + 1}</Td>
    <Td fontWeight="500">{user.full_name}</Td>
    <Td color="textSecondary">{user.username}</Td>
    <Td>
      <HStack spacing={2}>
        <IconButton
          {...volidamEditIconButton}
          icon={<EditIcon />}
          aria-label="Tahrirlash"
          onClick={() => handleOpenEdit(user)}
        />
        <IconButton
          {...volidamLockIconButton}
          icon={<LockIcon />}
          aria-label="Parolni tiklash"
          onClick={() => {
            setResetId(user.id);
            onResetOpen();
          }}
        />
        <IconButton
          {...volidamDeleteIconButton}
          icon={<DeleteIcon />}
          aria-label="O'chirish"
          onClick={() => {
            setDeleteId(user.id);
            onDeleteOpen();
          }}
        />
      </HStack>
    </Td>
  </Tr>
))
              )}
            </Tbody>
          </Table>
        </Box>
      )}

      <Modal isOpen={isFormOpen} onClose={onFormClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editId ? "Operatorni tahrirlash" : "Operator qo'shish"}
          </ModalHeader>
          <ModalCloseButton {...volidamModalCloseButton} />
          <ModalBody display="flex" flexDirection="column" gap={3}>
            <FormControl>
              <FormLabel>To'liq ism</FormLabel>
              <Input
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder="John Doe"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="john"
              />
            </FormControl>
            {!editId && (
              <FormControl>
                <FormLabel>Parol</FormLabel>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter gap={2}>
            <Button {...volidamGhostButton} onClick={onFormClose}>
              Bekor qilish
            </Button>
            <Button {...volidamPrimaryButton} onClick={handleSubmit}>
              {editId ? "Saqlash" : "Qo'shish"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>O'chirishni tasdiqlang</ModalHeader>
          <ModalCloseButton {...volidamModalCloseButton} />
          <ModalBody>
            <Text>Haqiqatan ham bu operatorni o'chirmoqchimisiz?</Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghost" onClick={onDeleteClose}>
              Yo'q
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Ha, o'chirish
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isResetOpen} onClose={onResetClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Parolni tiklash</ModalHeader>
          <ModalCloseButton {...volidamModalCloseButton} />
          <ModalBody>
            <FormControl>
              <FormLabel>Yangi parol</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghost" onClick={onResetClose}>
              Bekor qilish
            </Button>
            <Button colorScheme="orange" onClick={handleResetPassword}>
              Saqlash
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
