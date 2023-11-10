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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../dnd/reorder";

export default function CreateData() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.createData);
  const datas = useSelector((state) => state.datas);
  const data = useSelector((state) => state.data);

  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  // 테스트 seq
  const [seq, setSeq] = useState(14);

  useEffect(() => {
    // 테스트 seq
    const intervalId = setInterval(() => {
      setSeq((prevSeq) => prevSeq + 1);
      console.log("seq 올라감");
    }, 10000); // 10000 milliseconds = 10 seconds
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const clickSaveBtn = () => {
    // 서버로 데이터 전송
    console.log(
      "서버로 전송 데이터 : " + "title : " + title + "content : " + content
    );

    const result = addData(datas, "요청", {
      //   seq: 14,
      seq: seq,
      title: title,
      content: content,
      index: 0,
    });
    dispatch({ type: "setDatas", data: result });

    // 모달 닫기, data 초기화
    onClose();
  };

  const onClose = () => {
    console.log("aaaa");
    dispatch({ type: "toggleCreateData" });
    dispatch({
      type: "setData",
      data: {
        seq: 0,
        title: "",
        content: "",
        index: 0,
      },
    });
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
  }, [data.title, data.content]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">요청 작성</ModalHeader>
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
          <div className="flex py-2 px-1 justify-between">
            {/* <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link> */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            닫기
          </Button>
          <Button color="primary" onPress={clickSaveBtn}>
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
