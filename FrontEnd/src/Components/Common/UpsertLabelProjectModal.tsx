import { Project } from "pages/Label/List";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { TextBox } from "./TextBox";
import CallApi from "resource/api/CallApi";
import SystemFunc from "resource/methods/SystemFunc";
import PublicMethod from "resource/methods/PublicMethod";
import Select from "react-select";

interface UpsertLabelProjectModalProps {
  show?: boolean;
  onActionClick?: (item: Project, lableType: any, group: any) => void;
  onCloseClick?: () => void;
  project?: Project;
  method: "create" | "edit" | "";
}

const UpsertLabelProjectModal: React.FC<UpsertLabelProjectModalProps> = ({
  show,
  onActionClick,
  onCloseClick,
  project,
  method,
}) => {
  const [project_name, setProject_name] = useState<string>();
  const [describe, setDescribe] = useState<string>();
  const [labelType, setLabelType] = useState([]);
  const [group, setGroup] = useState([]);
  const [errMsg, setErrMsg] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [editType, setEditType] = useState("");
  const [project_id, setProject_id] = useState("");

  const errProjectName = "請填寫專案名稱！";
  const errDescribe = "請填寫專案敘述！";
  const errLabelType = "類別不可為空值！";
  const errGroup = "群組不可為空！";

  useEffect(() => {
    setProject_id(
      method === "create" ? "lp-" + SystemFunc.uuid() : project.project_id
    );
  }, [JSON.stringify(project), method]);

  useEffect(() => {
    if (show) {
      CallApi.ExecuteApi(
        "/label_project/get_label_project_account_group",
        {
          project_id: project_id,
          account_uid: SystemFunc.getUser_Token(),
        }
      )
        .then((res: any) => {
          if (res) {
            setGroupList(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (method === "edit") {
        setProject_name(project.project_name);
        setDescribe(project.describe);

        CallApi.ExecuteApi(
          "/label_project/get_lable_project_group",
          {
            project_id: project_id,
            update_user: SystemFunc.getUser_Token(),
          }
        )
          .then((res: any) => {
            if (res) {
              setGroup(res);
            }
          })
          .catch((error) => {
            console.log(error);
          });

        CallApi.ExecuteApi(
          "/label_project/get_project_label_type",
          {
            project_id: project_id,
          }
        )
          .then((res: any) => {
            if (res) {
              setLabelType(res);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [project_id, show]);

  useEffect(() => {
    let msg = [];
    if (show) {
      if (!PublicMethod.checkValue(project_name)) {
        msg.push(errProjectName);
      }
      if (!PublicMethod.checkValue(describe)) {
        msg.push(errDescribe);
      }

      if (group.length <= 0) {
        msg.push(errGroup);
      }
      if (
        labelType.length == 0 ||
        !(labelType.filter((val) => val.label_type_name == "").length === 0)
      ) {
        msg.push(errLabelType);
      }

      setErrMsg(msg);
    } else {
      setErrMsg([]);
      setProject_name("");
      setDescribe("");
      setGroup([]);
      setGroupList([]);
      setLabelType([]);
      // setChangeType({});
    }
  }, [
    project_name,
    describe,
    JSON.stringify(labelType),
    JSON.stringify(group),
    show,
  ]);

  const customStyles = {
    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: "#3762ea",
      };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      backgroundColor: "#405189",
      color: "white",
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: "white",
      backgroundColor: "#405189",
      ":hover": {
        backgroundColor: "#405189",
        color: "white",
      },
    }),
  };

  const calculateMinWidth = (labelTypeName) => {
    // You can adjust the factor based on your preference
    const minWidth = labelTypeName.length * 10 + 30; // Adjust the factor as needed
    return minWidth + "px";
  };

  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <i className="ri-edit-2-line display-5 text-success" />
          <br />
          {errMsg.map((msg) => (
            <span style={{ color: "red" }}>
              {msg}
              <br />
            </span>
          ))}
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <p className="col-form-label">專案名稱</p>
            <TextBox
              defaultValue={project.project_name}
              result={(value) => {
                setProject_name(value);
              }}
            />
          </div>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <p className="col-form-label">專案敘述</p>
            <TextBox
              defaultValue={project.describe}
              result={(value) => {
                setDescribe(value);
              }}
            />
          </div>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h6 className="fw-semibold">群組</h6>
            <Select
              value={group}
              isMulti={true}
              onChange={(sortBy: any) => {
                setGroup(sortBy);
              }}
              options={[
                {
                  options: groupList,
                },
              ]}
              classNamePrefix="js-example-basic-multiple mb-0"
              styles={customStyles}
            />
          </div>

          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <p className="col-form-label">
              類別
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  width: "40px",
                }}
                onClick={() => {
                  setLabelType([
                    ...labelType,
                    {
                      label_type_id: "lt" + SystemFunc.uuid(),
                      label_type_name: "",
                      project_id: project_id,
                    },
                  ]);
                }}
              >
                <h3
                  className="avatar-title rounded-circle"
                  style={{ content: "新增類別" }}
                >
                  +
                </h3>
              </button>
            </p>
            {labelType.map((item) => (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: "5px",
                }}
              >
                {editType === item.label_type_id ? (
                  <TextBox
                    type="text"
                    style={{
                      padding: "5px 10px",
                      borderRadius: "10px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      fontWeight: "bold",
                      border: "none",
                      textAlign: "center",
                    }}
                    defaultValue={item.label_type_name}
                    result={(val) => {
                      if (show && val !== item.label_type_name) {
                        let x = [];

                        for (let index = 0; index < labelType.length; index++) {
                          if (
                            index ==
                            labelType.findIndex(
                              (e) => e.label_type_id === item.label_type_id
                            )
                          ) {
                            x.push({
                              label_type_id: item.label_type_id,
                              label_type_name: val,
                              project_id: project_id,
                              update_user: SystemFunc.getUser_Token(),
                            });
                          } else {
                            x.push(labelType[index]);
                          }
                        }
                        setLabelType(x);
                        setEditType("");
                      }
                    }}
                  />
                ) : (
                  <div
                    style={{
                      padding: "5px 30px",
                      borderRadius: "10px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      fontWeight: "bold",
                      border: "none",
                      textAlign: "center",
                      minHeight: "30px",
                      minWidth: calculateMinWidth(item.label_type_name),
                    }}
                    onClick={() => setEditType(item.label_type_id)}
                  >
                    {item.label_type_name}
                  </div>
                )}

                <button
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    color: "#878584",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    let x = labelType.filter((val) => val !== item);
                    setLabelType(x);
                  }}
                >
                  X
                </button>
              </div>
            ))}
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
              onActionClick(
                {
                  project_id: project_id,
                  describe: describe,
                  project_name: project_name,
                  update_user: SystemFunc.getUser_Token(),
                },
                labelType,
                group
              )
            }
            disabled={errMsg.length > 0}
          >
            Save
          </button>
        </div>
      </ModalBody>
    </Modal>
  ) as unknown as JSX.Element;
};

export default UpsertLabelProjectModal;
