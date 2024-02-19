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
import LabelForm from "pages/LabelForm";
import DeleteLabelProjectModal from "Components/Common/DeleteLabelProjectModal";
import UpsertLabelProjectModal from "Components/Common/UpsertLabelProjectModal";
import { TextBox } from "Components/Common/TextBox";

interface Project {
  project_id?: string;
  project_name?: string;
  describe?: string;
  update_user?: string;
  update_date?: string;
}

const List = () => {
  const [project, setProject] = useState<Project>({});
  const [projectLists, setProjectLists] = useState<Project[]>([]);
  const [projectListsType, setProjectListsType] = useState([]);
  const [clickProject, setClickProject] = useState<Project>({});
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpsertModal, setOpenUpsertModal] = useState<boolean>(false);
  const [modalMethod, setModalMethod] = useState<"create" | "edit" | "">("");
  const [queryText, setQueryText] = useState("");
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
      CallApi.ExecuteApi("/label_project/get_account_available_label_project", {
        account_uid: SystemFunc.getUser_Token(),
      })
        .then(async (res: any) => {
          if (res) {
            setProjectLists(res);
            let val = [];
            for (let index = 0; index < res.length; index++) {
              const element = res[index];
              await CallApi.ExecuteApi(
                "/label_project/get_project_label_type",
                {
                  project_id: element.project_id,
                }
              )
                .then((res: any) => {
                  if (res) {
                    val.push(res);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }

            setProjectListsType(val);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setReload(false);
    }
  }, [reload]);

  const onClickUpsertData = (
    method: "create" | "edit" | "",
    item?: Project
  ) => {
    if (method === "edit") setClickProject(item);
    setModalMethod(method);
    setOpenUpsertModal(true);
  };

  // delete
  const onClickDeleteData = (item: Project) => {
    setClickProject(item);
    setOpenDeleteModal(true);
  };

  const onUpsertProject = (item: Project, type: any, group: any) => {
    CallApi.ExecuteApi("/label_project/upsert_label_project", {
      project: item,
      type: type,
      group: group,
    })
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

  const onDeleteProject = (item: Project) => {
    CallApi.ExecuteApi("/label_project/delete_label_project", {
      project_id: item.project_id,
    })
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
    setProject({});
  }

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UpsertLabelProjectModal
        project={clickProject}
        show={openUpsertModal}
        onActionClick={(item: Project, type: any, group: any) => {
          if (clickProject) {
            onUpsertProject(item, type, group);
            setClickProject({});
            setOpenUpsertModal(false);
            setReload(true);
          }
        }}
        onCloseClick={() => {
          setOpenUpsertModal(false);
          setClickProject({});
        }}
        method={modalMethod}
      />
      <DeleteLabelProjectModal
        project={clickProject}
        show={openDeleteModal}
        onDeleteClick={() => {
          if (clickProject) {
            onDeleteProject(clickProject);
            setClickProject({});
            setOpenDeleteModal(false);
          }
        }}
        onCloseClick={() => {
          setOpenDeleteModal(false);
          setClickProject({});
        }}
      />
      {PublicMethod.checkValue(project) ? (
        <>
          <LabelForm project={project} backList={goProjectList} />
        </>
      ) : (
        <>
          <Card>
            <CardBody>
              <Row className="g-2">
                <div className="col-lg-3 col-auto">
                  <div className="search-box">
                    <TextBox
                      className="form-control search"
                      placeholder="Search for Project ..."
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
                      Project
                    </button>
                  </div>
                </div>
              </Row>
            </CardBody>
          </Card>
          <div className="row">
            {projectLists
              .filter((item) => item.project_name.includes(queryText))
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
                                {item.project_name}
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
                                    <DropdownItem
                                      onClick={() => onClickDeleteData(item)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#removeProjectModal"
                                    >
                                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                      Remove
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
                          onClick={(e) => setProject(item)}
                        >
                          <Row className="gy-3">
                            <Col xs={6}>
                              <div>
                                <p className="text-muted mb-1">Type</p>
                                {projectListsType[index] ? (
                                  projectListsType[index].map(
                                    (element: any) => (
                                      <>
                                        <div className="fs-12 badge text-warning">
                                          {element.label_type_name}
                                        </div>
                                        <a> </a>
                                      </>
                                    )
                                  )
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Col>
                            <Col xs={6}>
                              <div>
                                <p className="text-muted mb-1">Describe</p>
                                <h5 className="fs-14">{item.describe}</h5>
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
        </>
      )}
    </React.Fragment>
  );
};

export default List;
export type { Project };
