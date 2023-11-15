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
// import { Editor as NovelEditor } from "novel";
// import { Editor as NovelEditor } from "../framework/novel/dist";
import { Editor as NovelEditor } from "@/framework/novel";

export default function ShowData(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const datas = useSelector((state) => state.datas);
  const isOpen = useSelector((state) => state.showData);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  const updateData = props.updateData;

  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
    localStorage.setItem("minsu", data.content);
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

  const clickSaveBtn = () => {
    const updatedData = {
      seq: data.seq,
      title: title,
      content: localStorage.getItem("minsu"),
      index: data.index,
    };

    const updatedDatas = updateDatasBySeq(updatedData, datas);
    // dispatch({ type: "setDatas", data: updatedDatas });
    updateData(updatedDatas);
    onClose();
  };

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
          요청 보기
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
              defaultValue={() => {
                return JSON.parse(data.content);
              }}
              className="overflow-auto w-full min-h-[300px] max-h-[500px] sm:rounded-lg sm:border sm:shadow-lg"
              // completionApi="http://localhost:8081/api/kace"
            />
          </div>
          {/* <div className="flex py-2 px-1 justify-between">qwe</div> */}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
            // className="bg-stone-200"
          >
            닫기
          </Button>
          <Button
            color="primary"
            variant="flat"
            onPress={clickSaveBtn}
            isDisabled={saveStatus !== "Saved"}
            className="bg-stone-200"
          >
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const updateDatasBySeq = (newData, datas) => {
  const updatedDatas = { ...datas };
  for (const key in updatedDatas) {
    const keyArray = updatedDatas[key];
    updatedDatas[key] = keyArray.map((data) => {
      if (data.seq === newData.seq) {
        return { ...data, ...newData };
      }
      return data;
    });
  }
  return updatedDatas;
};
