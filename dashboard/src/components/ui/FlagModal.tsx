import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { User } from "../../pages/users/Users";
import { PiXBold } from "react-icons/pi";
import { useState } from "react";

interface FlagModalProps {
  user?: User;
  isOpen: boolean;
  setFlag: (username: string, reason: string) => void;
  deleteFlag: (username: string) => void;
  onClose: () => void;
}

const FlagModal = ({
  user,
  isOpen,
  setFlag,
  deleteFlag,
  onClose,
}: FlagModalProps) => {
  const [reason, setReason] = useState("");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Flag User
          <IconButton
            variant="outline"
            onClick={onClose}
            aria-label="close menu"
            icon={<PiXBold />}
          />
        </ModalHeader>
        <ModalBody>
          <Text mt={4} fontSize="lg" fontWeight="semibold" marginBottom="2">
            {user?.username}
          </Text>
          {user?.flag ? (
            <Text mt={4} fontSize="lg" marginBottom="4">
              Current flag: {user?.flag}
            </Text>
          ) : null}
          <Input
            placeholder="New flag"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              if (user?.username && reason !== "") {
                setFlag(user?.username, reason);
                setReason("");
                onClose();
              } else {
                alert("Please enter a reason");
              }
            }}
          >
            Flag
          </Button>
          <Button
            onClick={() => {
              if (user?.username) {
                deleteFlag(user?.username);
              }
              setReason("");
              onClose();
            }}
          >
            Remove Flag
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FlagModal;
