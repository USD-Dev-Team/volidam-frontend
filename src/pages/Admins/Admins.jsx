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
  Badge,
  SimpleGrid,
  Avatar,
  Flex,
  Grid,
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
  role: "admin",
};

const roleColor = (role) => {
  switch (role) {
    case "admin":
      return "red";
    case "manager":
      return "blue";
    default:
      return "gray";
  }
};

export default function Admins() {
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
      const res = await apiUsers.getUsers("admin");
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
      role: user.role,
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

    const roleColor = (role) => {
        switch (role) {
            case "admin": return "red";
            case "manager": return "pink";
            default: return "gray";
        }
    };

    return (
        <Box p={6}>
            <HStack justify="space-between" mb={4}>
                <Heading size="lg" color="text">Adminlar</Heading>
                <Button leftIcon={<AddIcon />} {...volidamPrimaryButton} onClick={handleOpenAdd}>
                    Yaratish
                </Button>
            </HStack>

            {loading ? (
                <Center py={10}><Spinner size="xl" /></Center>
            ) : (
                <Box {...dataTableContainerProps}>
                    <Table variant="simple" size="md">
                        <Thead {...dataTableHeadRowProps}>
                            <Tr>
                                <Th>#</Th>
                                <Th>To'liq ism</Th>
                                <Th>Username</Th>
                                <Th>Role</Th>
                                <Th>Amallar</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.length === 0 ? (
                                <Tr>
                                    <Td colSpan={5}>
                                        <Center py={6}><Text color="textSecondary">Ma'lumot yo'q</Text></Center>
                                    </Td>
                                </Tr>
                            ) : (
                                users.map((user, index) => (
                                    <Tr key={user.id} {...dataTableRowHoverProps}>
                                        <Td>{index + 1}</Td>
                                        <Td fontWeight="500">{user.full_name}</Td>
                                        <Td color="textSecondary">{user.username}</Td>
                                        <Td>
                                            <Badge colorScheme={roleColor(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </Td>
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

                <Flex
                  align="center"
                  gap={1}
                  flexShrink={0}
                  borderLeft="1px solid"
                  borderColor="border"
                  pl={3}
                >
                  <IconButton
                    size="xs"
                    icon={<EditIcon />}
                    colorScheme="blue"
                    variant="ghost"
                    aria-label="Tahrirlash"
                    onClick={() => handleOpenEdit(user)}
                  />
                  <IconButton
                    size="xs"
                    icon={<LockIcon />}
                    colorScheme="orange"
                    variant="ghost"
                    aria-label="Parolni tiklash"
                    onClick={() => {
                      setResetId(user.id);
                      onResetOpen();
                    }}
                  />
                  <IconButton
                    size="xs"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="ghost"
                    aria-label="O'chirish"
                    onClick={() => {
                      setDeleteId(user.id);
                      onDeleteOpen();
                    }}
                  />
                </Flex>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}

      <Modal isOpen={isFormOpen} onClose={onFormClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editId ? "Adminni tahrirlash" : "Admin qo'shish"}
          </ModalHeader>
          <ModalCloseButton />
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
            <Button variant="ghost" onClick={onFormClose}>
              Bekor qilish
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {editId ? "Saqlash" : "Qo'shish"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>O'chirishni tasdiqlang</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Haqiqatan ham bu foydalanuvchini o'chirmoqchimisiz?</Text>
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

            {/* Add / Edit Modal */}
            <Modal isOpen={isFormOpen} onClose={onFormClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{editId ? "Adminni tahrirlash" : "Admin qo'shish"}</ModalHeader>
                    <ModalCloseButton {...volidamModalCloseButton} />
                   <ModalBody display="flex" flexDirection="column" gap={3}>
    <FormControl>
        <FormLabel>To'liq ism</FormLabel>
        <Input
            value={formData.full_name}
            onChange={e => setFormData({ ...formData, full_name: e.target.value })}
            placeholder="John Doe"
        />
    </FormControl>
    <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
            placeholder="john"
        />
    </FormControl>
    {!editId && (
        <FormControl>
            <FormLabel>Parol</FormLabel>
            <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
            />
        </FormControl>
    )}
</ModalBody>
                    <ModalFooter gap={2}>
                        <Button {...volidamGhostButton} onClick={onFormClose}>Bekor qilish</Button>
                        <Button {...volidamPrimaryButton} onClick={handleSubmit}>
                            {editId ? "Saqlash" : "Qo'shish"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Delete Confirm Modal */}
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered size="sm">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>O'chirishni tasdiqlang</ModalHeader>
                    <ModalCloseButton {...volidamModalCloseButton} />
                    <ModalBody>
                        <Text>Haqiqatan ham bu foydalanuvchini o'chirmoqchimisiz?</Text>
                    </ModalBody>
                    <ModalFooter gap={2}>
                        <Button variant="ghost" onClick={onDeleteClose}>Yo'q</Button>
                        <Button colorScheme="red" onClick={handleDelete}>Ha, o'chirish</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Reset Password Modal */}
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
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter gap={2}>
                        <Button variant="ghost" onClick={onResetClose}>Bekor qilish</Button>
                        <Button colorScheme="orange" onClick={handleResetPassword}>Saqlash</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}   
