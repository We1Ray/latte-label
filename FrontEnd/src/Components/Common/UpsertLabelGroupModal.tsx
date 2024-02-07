import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { TextBox } from "./TextBox";
import SystemFunc from "resource/methods/SystemFunc";
import PublicMethod from "resource/methods/PublicMethod";
import Group from "pages/Group";
import { CheckBox } from "./CheckBox";

interface UpsertLabelGroupModalProps {
  show?: boolean;
  onActionClick?: (item: Group) => void;
  onCloseClick?: () => void;
  group?: Group;
  method: "create" | "edit" | "";
}

const UpsertLabelGroupModal: React.FC<UpsertLabelGroupModalProps> = ({
  show,
  onActionClick,
  onCloseClick,
  group,
  method,
}) => {
  const [group_name, setGroup_name] = useState<string>();
  const [group_enabled, setGroup_enabled] = useState<string>();
  const [errMsg, setErrMsg] = useState("");

  const group_id =
    method === "create" ? "lg-" + SystemFunc.uuid() : group.group_id;

  useEffect(() => {
    if (show) {
      if (method === "edit") {
        setGroup_name(group.group_name);
        setGroup_enabled(group.group_enabled);
      } else {
        setGroup_enabled("Y");
      }
    }
  }, [JSON.stringify(group), show]);

  useEffect(() => {
    let msg = [];
    if (show) {
      if (!PublicMethod.checkValue(group_name)) {
        setErrMsg("請填寫群組名稱！");
      } else {
        setErrMsg("");
      }
    } else {
      setErrMsg("");
      setGroup_name("");
      setGroup_enabled("");
    }
  }, [group_name, show]);

  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <i className="ri-edit-2-line display-5 text-success" />
          <br />
          <span style={{ color: "red" }}>{errMsg}</span>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <p className="col-form-label">群組名稱</p>
            <TextBox
              defaultValue={group.group_name}
              result={(value) => {
                setGroup_name(value);
              }}
            />
          </div>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <p className="col-form-label">是否啟用</p>
            <CheckBox
              checkedText={""}
              notCheckedText={""}
              checkedValue={"Y"}
              notCheckedValue={"N"}
              defaultValue={group_enabled}
              result={(value, text) => {
                setGroup_enabled(value);
              }}
            />
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn w-sm btn-success "
            id="delete-record"
            onClick={() =>
              onActionClick({
                group_id: group_id,
                group_name: group_name,
                group_enabled: group_enabled,
                update_user: SystemFunc.getUser_Token(),
              })
            }
            disabled={errMsg !== ""}
          >
            Save
          </button>
        </div>
      </ModalBody>
    </Modal>
  ) as unknown as JSX.Element;
};

export default UpsertLabelGroupModal;
