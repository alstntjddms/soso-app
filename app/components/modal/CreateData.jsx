"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@/framework/novel";
import sosoAPI from "../framework/api/sosoAPI";
import { HttpStatusCode } from "axios";

export default function CreateData(props) {
  const dispatch = useDispatch();

  const findDatasByLoginMember = props.findDatasByLoginMember;

  const isOpen = useSelector((state) => state.createData);
  const teamMembers = useSelector((state) => state.teamMembers);

  const [saveStatus, setSaveStatus] = useState("Saved");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [teamMember, setTeamMember] = useState(new Set([]));

  const clickSaveBtn = () => {
    sosoAPI
      .post("/data/data", {
        title: title,
        content: content,
        toMemberId: teamMembers[Array.from(teamMember)[0]].memberId,
      })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          console.log(res.data);
          findDatasByLoginMember();
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
        }
      });

    // 모달 닫기, data 초기화
    onClose();
  };

  const onClose = () => {
    dispatch({ type: "toggleCreateData" });
    setTitle("");
    setContent("");
    setTeamMember(new Set([]));
    //로컬스토리지삭제
    localStorage.removeItem("minsu");
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
            autoFocus
            label="타이틀"
            placeholder="제목을 입력하세요."
            variant="bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select
            label="팀 멤버"
            variant="bordered"
            placeholder="팀멤버를 선택하시오."
            className="w-full"
            fullWidth
            selectedKeys={teamMember}
            onSelectionChange={setTeamMember}
          >
            {teamMembers.map((tm, index) => (
              <SelectItem key={index} value={tm.memberId}>
                {tm.memberName}
              </SelectItem>
            ))}
          </Select>

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
