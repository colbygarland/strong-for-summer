import { Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FormBlock, Label } from './forms/shared';

export const DatePickerModal = ({
  isOpen,
  onClose,
  date,
  setDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  setDate: (date: string) => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change the date</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormBlock>
            <Label>Date</Label>
            <Input
              value={date}
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
                onClose();
              }}
            />
          </FormBlock>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
