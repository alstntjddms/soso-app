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
import { Editor } from "@/framework/novel";
import sosoAPI from "../framework/api/sosoAPI";
import { HttpStatusCode } from "axios";

export default function CreateData() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.createData);
  const datas = useSelector((state) => state.datas);
  const data = useSelector((state) => state.data);
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [fromMemberId, setFromMemberId] = useState(data.fromMemberId);

  const clickSaveBtn = async () => {
    // 서버로 데이터 전송
    console.log(
      "서버로 전송 데이터 : " +
        "title : " +
        title +
        "content : " +
        content +
        "fromMemberId : " +
        fromMemberId
    );
    await sosoAPI
      .post("/domain/data", {
        title: title,
        content: content,
        fromMemberId: fromMemberId,
      })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          console.log(res.data);
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
        }
      });

    // 모달 닫기, data 초기화
    onClose();
  };

  const onClose = () => {
    dispatch({ type: "toggleCreateData" });
    dispatch({
      type: "setData",
      data: {
        id: 0,
        dataIndex: 0,
        state: "",
        fromMemberId: 0,
        toMemberId: 0,
        teamId: 0,
        title: "",
        content: "",
        delYn: false,
        regDate: "",
        updDate: "",
      },
    });
    setTitle("");
    setContent("");
    setFromMemberId("");
    //로컬스토리지삭제
    localStorage.removeItem("minsu");
  };

  // useEffect(() => {
  //   setTitle(data.title);
  //   setContent(data.content);
  // }, [data.title, data.content]);

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
      hideCloseButton={true}
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
            tabIndex={-1}
            autoFocus
            label="타이틀"
            placeholder="제목을 입력하세요."
            variant="bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            tabIndex={-1}
            autoFocus
            label="받는 사람"
            placeholder="받는 사람을 입력하세요."
            variant="bordered"
            value={fromMemberId}
            onChange={(e) => setFromMemberId(e.target.value)}
          />
          <div>
            <Editor
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
            <Button
              tabIndex={-1}
              color="danger"
              variant="flat"
              onPress={onClose}
            >
              닫기
            </Button>
          </div>
          <Button
            tabIndex={-1}
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
