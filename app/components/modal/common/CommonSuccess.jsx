import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";

export default function CommonSuccess() {
  const dispatch = useDispatch();
  const commonSuccess = useSelector((state) => state.commonSuccess);
  const commonSuccessInfo = useSelector((state) => state.commonSuccessInfo);

  const onClose = () => {
    dispatch({ type: "toggleCommonSuccess" });
  };

  return (
    <Modal
      size="md"
      isOpen={commonSuccess}
      onOpenChange={onClose}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">알림</ModalHeader>
            <ModalBody>
              <h1>{commonSuccessInfo.message}</h1>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                닫기
              </Button>
              {/* <Button color="primary" onPress={onClose}>
                팀 생성
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
