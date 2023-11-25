import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";

export default function CommonError() {
  const dispatch = useDispatch();
  const commonError = useSelector((state) => state.commonError);
  const commonErrorInfo = useSelector((state) => state.commonErrorInfo);

  const onClose = () => {
    dispatch({ type: "toggleCommonError" });
  };

  return (
    <Modal
      size="md"
      isOpen={commonError}
      onOpenChange={onClose}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {commonErrorInfo.name}
            </ModalHeader>
            <ModalBody>
              <h1>{commonErrorInfo.message}</h1>
              <p>{commonErrorInfo.errorDate}</p>
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
