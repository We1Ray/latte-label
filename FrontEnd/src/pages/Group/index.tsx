import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
//Import Icons
import FeatherIcon from "feather-icons-react";
import CallApi from "resource/api/CallApi";
import SystemFunc from "resource/methods/SystemFunc";
import PublicMethod from "resource/methods/PublicMethod";
import DataTable from "./DataTable";
import UpsertLabelGroupModal from "Components/Common/UpsertLabelGroupModal";
import { TextBox } from "Components/Common/TextBox";

interface Group {
  group_id?: string;
  group_name?: string;
  group_enabled?: string;
  update_user?: string;
  update_date?: string;
}

const Group = () => {
  const [group, setGroup] = useState<Group>({});
  const [groupLists, setGroupLists] = useState([]);
  const [groupMember, setGroupMember] = useState([]);
  const [clickGroup, setClickGroup] = useState<Group>({});
  const [openUpsertModal, setOpenUpsertModal] = useState<boolean>(false);
  const [modalMethod, setModalMethod] = useState<"create" | "edit" | "">("");
  const [queryText, setQueryText] = useState("");
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
      CallApi.ExecuteApi(
        "http://localhost:8080/label_project/get_account_label_group",
        {
          account_uid: SystemFunc.getUser_Token(),
        }
      )
        .then((res: any) => {
          if (res) {
            setGroupLists(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    CallApi.ExecuteApi(
      "http://localhost:8080/label_project/get_label_group_member",
      {
        group_id: group.group_id,
      }
    )
      .then(async (res: any) => {
        if (res) {
          setGroupMember(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [JSON.stringify(group)]);

  const onClickUpsertData = (method: "create" | "edit" | "", item?: Group) => {
    if (method === "edit") setClickGroup(item);
    setModalMethod(method);
    setOpenUpsertModal(true);
  };

  const onUpsertGroup = (item: Group) => {
    CallApi.ExecuteApi(
      "http://localhost:8080/label_project/upsert_label_group",
      item
    )
      .then(async (res: any) => {
        if (res) {
          setReload(true);
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function goProjectList() {
    setGroup({});
  }

  return (
    <React.Fragment>
      <UpsertLabelGroupModal
        group={clickGroup}
        show={openUpsertModal}
        onActionClick={(item: Group) => {
          onUpsertGroup(item);
          setClickGroup({});
          setOpenUpsertModal(false);
        }}
        onCloseClick={() => {
          setOpenUpsertModal(false);
          setClickGroup({});
        }}
        method={modalMethod}
      />
      <ToastContainer closeButton={false} />
      {PublicMethod.checkValue(group) ? (
        <DataTable data={groupMember} group={group} backList={goProjectList} />
      ) : (
        <>
          <Card>
            <CardBody>
              <Row className="g-2">
                <div className="col-lg-3 col-auto">
                  <div className="search-box">
                    <TextBox
                      className="form-control search"
                      placeholder="Search for Group ..."
                      result={(val) => {
                        setQueryText(val);
                      }}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
                <div className="col-auto ms-sm-auto">
                  <div className="avatar-group" id="newMembar">
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#createboardModal"
                      onClick={() => {
                        onClickUpsertData("create");
                      }}
                    >
                      <i className="ri-add-line align-bottom me-1" />
                      Group
                    </button>
                  </div>
                </div>
              </Row>
            </CardBody>
          </Card>
          <div className="content-wrapper">
            <div className="row">
              {groupLists
                .filter((item) => item.group_name.includes(queryText))
                .map((item: any, index: any) => (
                  <React.Fragment key={index}>
                    <Col xxl={3} sm={6} className="project-card">
                      <Card>
                        <CardBody>
                          <div
                            className={`p-3 mt-n3 mx-n3 bg-info-subtle rounded-top`}
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                <h5 className="mb-0 fs-14">
                                  {item.group_name}
                                </h5>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="d-flex gap-1 align-items-center my-n2">
                                  <UncontrolledDropdown direction="start">
                                    <DropdownToggle
                                      tag="button"
                                      className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15"
                                    >
                                      <FeatherIcon
                                        icon="more-horizontal"
                                        className="icon-sm"
                                      />
                                    </DropdownToggle>

                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem
                                        onClick={() =>
                                          onClickUpsertData("edit", item)
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#removeProjectModal"
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="py-3"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => setGroup(item)}
                          >
                            <Row className="gy-3">
                              <Col xs={6}>
                                <div>
                                  <p className="text-muted mb-1">Create Date</p>
                                  <h5 className="fs-14">{item.update_date}</h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </React.Fragment>
                ))}
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Group;
