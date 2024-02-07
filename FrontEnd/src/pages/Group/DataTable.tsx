import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Container,
  Modal,
  ModalBody,
  Button,
} from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import "./DataTable.scss";
import Loading from "pages/Loading/Loading";
import CallApi from "resource/api/CallApi";
import SystemFunc from "resource/methods/SystemFunc";
import Group from "pages/Group";
import Select from "react-select";

interface DataTableProps {
  data?: any[];
  Expand?: ({ row }: { row: any }) => JSX.Element;
  dialog?: {
    content: JSX.Element;
    style?: React.CSSProperties;
  };
  multipleSelection?: boolean;
  sizePerPageList?: object;
  // changeData?: (data: any) => void;
  group: Group;
  backList: Function;
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SelectNode {
  mode?: string;
  hideSelectColumn?: boolean;
  clickToSelect?: boolean;
  nonSelectable?: any;
  bgColor?: string;
  selected?: object;
  onSelect?: (arg1: any, arg2: any) => void;
  onSelectAll?: (arg1: any, arg2: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  // changeData,
  group,
  backList,
  // setLoading,
  ...props
}) => {
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [Select, setSelect] = useState<SelectNode>({
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#98d6ea",
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let tabel = [];
    for (let index = 0; index < data.length; index++) {
      tabel.push({
        row_num_id: index + 1,
        account_uid: data[index]["account_uid"],
        name: data[index]["name"],
        group_id: group.group_id,
      });
    }
    setTableData(tabel);

    setSelect({
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "#98d6ea",
      onSelect: handleOnSelect,
      onSelectAll: handleOnSelectAll,
      nonSelectable: [
        data.findIndex(
          (val) => val.account_uid === SystemFunc.getUser_Token()
        ) + 1,
      ],
    });
  }, [JSON.stringify(data)]);

  useEffect(() => {
    setSelectedData([]);
  }, [JSON.stringify(tableData)]);

  useEffect(() => {
    let data_index = [];
    for (let index = 0; index < selectedData.length; index++) {
      data_index.push(selectedData[index]["row_num_id"]);
    }
    setSelect({
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "#98d6ea",

      onSelect: handleOnSelect,
      onSelectAll: handleOnSelectAll,
      selected: data_index,
      nonSelectable: [
        data.findIndex(
          (val) => val.account_uid === SystemFunc.getUser_Token()
        ) + 1,
      ],
    });
  }, [JSON.stringify(selectedData)]);

  useEffect(() => {
    if (reload) {
      CallApi.ExecuteApi(
        "http://localhost:8080/label_project/get_label_group_member",
        {
          group_id: group.group_id,
        }
      )
        .then(async (res: any) => {
          if (res) {
            let tabel = [];
            for (let index = 0; index < res.length; index++) {
              tabel.push({
                row_num_id: index + 1,
                account_uid: res[index]["account_uid"],
                name: res[index]["name"],
                group_id: group.group_id,
              });
            }
            setTableData(tabel);
            setSelect({
              mode: "checkbox",
              clickToSelect: true,
              bgColor: "#98d6ea",
              onSelect: handleOnSelect,
              onSelectAll: handleOnSelectAll,
              nonSelectable: [
                data.findIndex(
                  (val) => val.account_uid === SystemFunc.getUser_Token()
                ) + 1,
              ],
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setReload(false);
    }
  }, [reload]);

  function handleOnSelect(row: any, isSelect: any) {
    try {
      if (isSelect) {
        const index = selectedData.findIndex((item) => item === row);
        if (index === -1) {
          // 不存在，則新增
          setSelectedData([...selectedData, row]);
        }
      } else {
        const index = selectedData.findIndex((item) => item === row);
        if (index !== -1) {
          // 存在，則移除
          setSelectedData([
            ...selectedData.slice(0, index),
            ...selectedData.slice(index + 1),
          ]);
        }
      }
    } catch (error) {
      console.log("EROOR: DataTable.handleOnSelect");
      console.log(error);
    }
  }

  function handleOnSelectAll(isSelect: any, rows: any) {
    try {
      if (isSelect) {
        setSelectedData(data);
      } else {
        setSelectedData([]);
      }
    } catch (error) {
      console.log("EROOR:DataTable.handleOnSelectAll");
      console.log(error);
    }
  }

  function delete_data() {
    CallApi.ExecuteApi(
      "http://localhost:8080/label_project/delete_label_group_member",
      selectedData.filter(
        (val) => val.account_uid !== SystemFunc.getUser_Token()
      )
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
  }

  function add(selectMembers: any) {
    console.log(selectMembers);
    CallApi.ExecuteApi(
      "http://localhost:8080/label_project/insert_label_group_member",
      selectMembers
    )
      .then(async (res: any) => {
        if (res) {
          setOpenAddModal(false);
          setReload(true);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setReload(true);
  }

  return (
    <Container fluid>
      <AddModal
        group={group}
        show={openAddModal}
        onActionClick={(selectMembers: any) => {
          add(selectMembers);
        }}
        onCloseClick={() => setOpenAddModal(false)}
      />
      <Card>
        <CardBody>
          <CardHeader className="card-header border-0">
            <Row className="align-items-center gy-3">
              <div className="col-sm">
                <h1 className="card-title mb-0">{group.group_name}</h1>
              </div>
              <div className="col-sm-auto">
                <div className="d-flex gap-1 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      backList();
                    }}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    className="btn btn-success add-btn"
                    onClick={() => setOpenAddModal(true)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger add-btn"
                    onClick={async () => {
                      delete_data();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Row>
          </CardHeader>
          <div className="cardbox-body">
            <BootstrapTable
              keyField="row_num_id"
              data={tableData}
              columns={[
                {
                  dataField: "account_uid",
                  text: "id",
                  sort: true,
                  hidden: true,
                },
                {
                  dataField: "name",
                  text: "Group Name",
                  sort: true,
                },
              ]}
              pagination={paginationFactory({
                pageStartIndex: 1,
                sizePerPage: 5,
                sizePerPageList: [5, 10, 20, 50, 100],
                pageNumber: 1,
                alwaysShowAllBtns: true,
              })}
              selectRow={Select}
              noDataIndication={"No Information Found"}
              {...props}
            />
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

function AddModal({ group, show, onActionClick, onCloseClick }) {
  const [members, setMembers] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (show) {
      CallApi.ExecuteApi(
        "http://localhost:8080/label_project/get_member_not_in_group",
        {
          group_id: group.group_id,
          update_user: SystemFunc.getUser_Token(),
        }
      )
        .then((res: any) => {
          if (res) {
            setMemberList(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [JSON.stringify(group), show]);

  useEffect(() => {
    if (show) {
      if (members.length > 0) {
        setErrMsg("");
      } else {
        setErrMsg("不可為空！");
      }
    } else {
      setMembers([]);
      setMemberList([]);
    }
  }, [JSON.stringify(members), show]);

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

  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <i className="ri-edit-2-line display-5 text-success" />
          <br />

          <span style={{ color: "red" }}>
            {errMsg}
            <br />
          </span>

          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h6 className="fw-semibold">成員</h6>
            <Select
              value={members}
              isMulti={true}
              onChange={(sortBy: any) => {
                setMembers(sortBy);
              }}
              options={[
                {
                  options: memberList,
                },
              ]}
              classNamePrefix="js-example-basic-multiple mb-0"
              styles={customStyles}
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
            onClick={() => onActionClick(members)}
            disabled={errMsg.length > 0}
          >
            Save
          </button>
        </div>
      </ModalBody>
    </Modal>
  ) as unknown as JSX.Element;
}
export default DataTable;
