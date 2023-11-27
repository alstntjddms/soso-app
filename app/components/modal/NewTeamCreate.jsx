import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import sosoAPI from "../framework/api/sosoAPI";
import { HttpStatusCode } from "axios";

export default function NewTeamCreate() {
  const dispatch = useDispatch();
  const newTeamCreate = useSelector((state) => state.newTeamCreate);
  const [teamName, setTeamName] = useState("");

  const onClose = () => {
    dispatch({ type: "toggleNewTeamCreate" });
  };

  const createTeam = () => {
    sosoAPI
      .post("/domain/team", {
        teamName: teamName,
      })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          dispatch({
            type: "toggleCommonSuccess",
            data: "팀 생성을 성공했습니다.",
          });
          findTeamsByLoginId();
          setTeamName("");
        } else if (res.response.status === HttpStatusCode.BadRequest) {
          dispatch({ type: "toggleCommonError", data: res.response.data });
        }
      });
    onClose();
  };

  const findTeamsByLoginId = () => {
    sosoAPI.get("/domain/teams").then((res) => {
      if (res.status === HttpStatusCode.Ok) {
        console.log(res.data);
        dispatch({ type: "setTeams", data: res.data });
      } else if (res.response.status === HttpStatusCode.BadRequest) {
        dispatch({ type: "toggleCommonError", data: res.response.data });
      }
    });
  };

  return (
    <Modal
      size="xl"
      isOpen={newTeamCreate}
      onOpenChange={onClose}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              새로운 팀 생성
            </ModalHeader>
            <ModalBody>
              <Input
                tabIndex={-1}
                autoFocus
                label="팀명"
                placeholder="팀 이름을 입력하세요."
                variant="bordered"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                닫기
              </Button>
              <Button color="primary" onPress={createTeam}>
                팀 생성
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
