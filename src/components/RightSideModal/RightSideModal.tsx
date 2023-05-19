import {
  Modal,
  Button,
  Stack,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  CircularProgress,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";

export interface RightSideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  _footer: {
    text: string;
    hide?: boolean;
    formId?: string;
    disabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
  };
}

export const RightSideModal: React.FC<RightSideModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  _footer,
}) => {
  const bg = useColorModeValue("#FFF", "rgb(24, 26, 27)");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant={"right-align"}
      motionPreset={"slideInRight"}
      size={{ base: "3xl", md: "lg" }}
    >
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent>
        <ModalHeader bg={bg}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          bg={bg}
          zIndex={1}
          borderBottomRadius={"12px"}
          boxShadow={
            "2px 4px 4px rgba(0, 0, 0, 0.05), 0px 4px 15px rgba(0, 0, 0, 0.05)"
          }
        >
          {children}
        </ModalBody>

        {!_footer.hide && (
          <ModalFooter>
            {_footer.isLoading ? (
              <Stack>
                <CircularProgress size={30} isIndeterminate color="#000" />
              </Stack>
            ) : (
              <Button
                color="#FFF"
                type="submit"
                width={"full"}
                height={"full"}
                variant="unstyled"
                form={_footer.formId}
                onClick={_footer.onClick}
                disabled={_footer.disabled}
              >
                {_footer.text}
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
