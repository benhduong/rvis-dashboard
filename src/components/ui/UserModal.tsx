import {
  IconButton,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Avatar,
  Flex,
  Icon,
  ModalFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { PiTrashFill, PiXBold } from "react-icons/pi";
import { IoMdMail, IoMdPodium } from "react-icons/io";
import { User } from "../../pages/users/Users";

interface UserModalProps {
  user?: User;
  isOpen: boolean;
  deleteUser: (username: string) => void;
  onClose: () => void;
}

const UserModal = ({ user, isOpen, onClose, deleteUser }: UserModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        User Profile
        <IconButton
          variant="outline"
          onClick={onClose}
          aria-label="close menu"
          icon={<PiXBold />}
        />
      </ModalHeader>
      <ModalBody>
        <Flex
          flexDirection="column"
          alignItems="center"
          marginBottom={{ base: "8", md: "0" }}
        >
          <Avatar size="2xl" shadow="lg" name={user?.username} />
          <Text marginTop="2" marginBottom="0" fontSize="2xl" fontWeight="bold">
            {user?.username}
          </Text>
          <Text
            color="gray.600"
            fontWeight="semibold"
            fontSize="xl"
            marginTop="0"
            display="flex"
            alignItems="center"
          >
            <Icon mr={2} as={IoMdPodium} />
            {user?.points.toLocaleString()}
          </Text>
        </Flex>
        <Text display="flex" alignItems="center">
          <Icon mr={1} as={IoMdMail} /> Email:{" "}
          {user?.email ? user?.email : "unknown"}
        </Text>
      </ModalBody>
      <ModalFooter>
        <Popover>
          <PopoverTrigger>
            <Button border="none" colorScheme="red" leftIcon={<PiTrashFill />}>
              Delete
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton border="none" size="md" />
            <PopoverHeader fontWeight="bold">Are you sure?</PopoverHeader>
            <PopoverBody w="full">
              <Text margin="0" color="gray.600">
                Do you really want to delete this user? This process cannot be
                undone.
              </Text>
              <Button
                marginTop="4"
                border="none"
                colorScheme="red"
                leftIcon={<PiTrashFill />}
                onClick={() => {
                  if (user?.username) {
                    deleteUser(user?.username);
                  }
                }}
              >
                Delete {user?.username}!
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default UserModal;
