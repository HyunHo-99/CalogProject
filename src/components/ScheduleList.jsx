import "./ScheduleList.css";
import ScheduleItem from "./ScheduleItem";
import ModalCreate from "./ModalCreate";
import ProjectSchedule from "./ProjectSchedule";
import Button from "./Button";
import { useContext, useState } from "react";
import { ScheduleStateContext } from "../pages/Calendar";
import ModalEdit from "./ModalEdit";
const ScheduleList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 입력창 여는 state
  const [isEditerOpen, setIsEditerOpen] = useState(false); // 모달 edit창 여는 state
  const [modalType, setModalType] = useState(""); // 해당 모달 타입으로 일정 타입 구분
  const schedule_data = useContext(ScheduleStateContext);
  const [findData, setFindData] = useState(null);
  const [isOpenList, setIsOpenList] = useState(true); // projcet 아이템 토글
  const [isOpenItem, setIsOpenItem] = useState(true); // 일일일정 토글
  // 슬라이드로 열고닫는 함수
  const toggleProject = () => {
    setIsOpenList(!isOpenList);
  };
  const toggleItem = () => {
    setIsOpenItem(!isOpenItem);
  };

  // 모달 열고닫는 함수
  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  // edit 모달 열고닫는 함수
  const editModalopen = (data) => {
    setIsEditerOpen(true);
    setFindData(data);
  };
  const editModalclose = () => {
    setIsEditerOpen(false);
    setModalType("");
  };

  return (
    <div className="ScheduleList">
      <div className="ScheduleList_Wirte">
        <h4>할일목록</h4>
      </div>
      <div className="ScheduleList_Contents">
        <div className="ScheduleList_Todo">
          <p>프로젝트 일정</p>
          <Button
            text={"+"}
            classtype={"Create"}
            onClick={() => openModal("project")}
          />
          <Button text={"👇"} onClick={toggleProject} />
        </div>
        <div className={`Todo-content ${isOpenList ? "open" : ""}`}>
          {schedule_data
            .filter((item) => item.type === "project")
            .map((item) => (
              <ProjectSchedule
                key={item.id}
                data={item}
                onItemClick={editModalopen}
              />
            ))}
        </div>
        <div className="ScheduleList_Todo">
          <p>일일 일정</p>
          <Button
            text={"+"}
            classtype={"Create"}
            onClick={() => openModal("item")}
          />
          <Button text={"👇"} onClick={toggleItem} />
        </div>
        <div className={`Todo-content ${isOpenItem ? "open" : ""}`}>
          {schedule_data
            .filter((item) => item.type === "item")
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .map((item) => (
              <ScheduleItem
                key={item.id}
                data={item}
                onItemClick={editModalopen}
              />
            ))}
        </div>
      </div>
      <ModalCreate
        isOpen={isModalOpen}
        onModal={closeModal}
        modalType={modalType}
      />
      <ModalEdit
        isOpen={isEditerOpen}
        onModal={editModalclose}
        modalType={modalType}
        data={findData}
      />
    </div>
  );
};

export default ScheduleList;
