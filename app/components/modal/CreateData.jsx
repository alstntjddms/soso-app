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
// import { Editor as NovelEditor } from "novel";
// import { Editor as NovelEditor } from "../framework/novel/dist";
import { Editor as NovelEditor } from "@/framework/novel";

export default function CreateData() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.createData);
  const datas = useSelector((state) => state.datas);
  const data = useSelector((state) => state.data);
  const [saveStatus, setSaveStatus] = useState("Saved");
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

    //로컬스토리지삭제
    localStorage.removeItem("minsu");
  };

  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
  }, [data.title, data.content]);

  const contentSave = () => {
    setContent(localStorage.getItem("minsu"));
    setSaveStatus("Saved");
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="top-center"
      size="5xl"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          요청 작성
          <div className="absolute right-10 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
            {saveStatus}
          </div>
        </ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            label="타이틀"
            placeholder="제목을 입력하세요."
            variant="bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <NovelEditor
              storageKey="minsu"
              onUpdate={() => {
                setSaveStatus("Unsaved");
              }}
              onDebouncedUpdate={() => {
                setSaveStatus("Saving...");
                // Simulate a delay in saving.
                setTimeout(() => {
                  contentSave();
                }, 500);
              }}
              defaultValue=""
              className="overflow-auto w-full min-h-[300px] max-h-[500px] sm:rounded-lg sm:border sm:shadow-lg"
              // completionApi="http://localhost:8081/api/kace"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <Button color="danger" variant="flat" onPress={onClose}>
              닫기
            </Button>
          </div>
          <Button
            color="primary"
            variant="flat"
            onPress={clickSaveBtn}
            isDisabled={saveStatus !== "Saved"}
          >
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
