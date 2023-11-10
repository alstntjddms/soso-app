"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ShowData() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const isOpen = useSelector((state) => state.showData);

  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
  }, [data.title, data.content]);

  const onClose = () => {
    dispatch({ type: "toggleShowData" });
    dispatch({
      type: "setData",
      data: {
        seq: 0,
        title: "",
        content: "",
        index: 0,
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">요청 보기</ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            label="타이틀"
            placeholder="제목을 입력하세요."
            variant="bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="내용"
            placeholder="내용을 입력하세요."
            variant="bordered"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex py-2 px-1 justify-between">qwe</div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            닫기
          </Button>
          {/* <Button color="primary" onPress={onClose}>
            저장
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
