import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Row, Container, Button } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import "./DataTable.scss";
import Loading from "pages/Loading/Loading";
import CallApi from "resource/api/CallApi";
import SystemFunc from "resource/methods/SystemFunc";
import { Project } from "pages/Label/List";
import _ from "lodash";

interface DataTableProps {
  data: object[];
  Expand?: ({ row }: { row: any }) => JSX.Element;
  dialog?: {
    content: JSX.Element;
    style?: React.CSSProperties;
  };
  multipleSelection?: boolean;
  sizePerPageList?: object;
  changeData?: () => void;
  project: Project;
  setLabeling: React.Dispatch<React.SetStateAction<boolean>>;
  backList: Function;
}

interface SelectNode {
  mode?: string;
  hideSelectColumn?: boolean;
  clickToSelect?: boolean;
  bgColor?: string;
  selected?: object;
  onSelect?: (arg1: any, arg2: any) => void;
  onSelectAll?: (arg1: any, arg2: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  changeData,
  project,
  setLabeling,
  backList,
  ...props
}) => {
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Select, setSelect] = useState<SelectNode>({
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#98d6ea",
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  });
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    setLoading(true);
    let tabel = [];
    for (let index = 0; index < data.length; index++) {
      tabel.push({
        row_num_id: index + 1,
        data_id: data[index]["data_id"],
        data_name: data[index]["data_name"],
        data_path: data[index]["data_path"],
        url: data[index]["url"],
      });
    }
    setTableData(tabel);
  }, [JSON.stringify(data)]);

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
    });
  }, [JSON.stringify(selectedData)]);

  useEffect(() => {
    setSelectedData([]);
    setSelect({
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "#98d6ea",
      onSelect: handleOnSelect,
      onSelectAll: handleOnSelectAll,
    });
    setLoading(false);
  }, [JSON.stringify(tableData)]);

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

  async function handleClick(event: any) {
    await hiddenFileInput.current.click();
  }

  function handleOnSelectAll(isSelect: any, rows: any) {
    try {
      if (isSelect) {
        setSelectedData(tableData);
      } else {
        setSelectedData([]);
      }
    } catch (error) {
      console.log("EROOR:DataTable.handleOnSelectAll");
      console.log(error);
    }
  }

  async function delete_data() {
    setLoading(true);
    let del_success = false;
    const chunks = _.chunk(selectedData, 100);
    for (let index = 0; index < chunks.length; index++) {
      const element = chunks[index];
      let data_id = element.map((item) => item.data_id);
      let data_path = element.map((item) => item.data_path);
      await CallApi.ExecuteApi(
        "http://localhost:8080/label_project/delete_label_project_data",
        { data_path: data_path, data_id: data_id }
      )
        .then(async (res: any) => {
          if (res) {
            del_success = true;
          } else {
            del_success = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (del_success) {
      changeData();
    }
  }

  async function upload_data(files: FileList) {
    if (files.length > 0) {
      setLoading(true);
      let data_id = [];
      for (let index = 0; index < files.length; index++) {
        data_id.push("ld-" + SystemFunc.uuid());
      }

      let insertData = [];

      let account_uid = SystemFunc.getUser_Token();

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onloadend = () => {
            const base64string = String(reader.result).split(",")[1];
            insertData.push({
              account_uid: account_uid,
              data_id: data_id[index],
              data_name: file.name,
              project_id: project.project_id,
              file: base64string,
            });
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }

      const chunks = _.chunk(insertData, 100);
      let insert_success = false;
      for (let index = 0; index < chunks.length; index++) {
        await CallApi.ExecuteApi(
          "http://localhost:8080/label_project/insert_label_data",
          chunks[index]
        )
          .then((res) => {
            if (res) {
              insert_success = true;
            } else {
              insert_success = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (insert_success) {
        changeData();
      }
    }
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Container fluid>
          <Card>
            <CardBody>
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h1 className="card-title mb-0">{project.project_name}</h1>
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
                      <Button onClick={handleClick} title="Upload">
                        <em className={"far fa-file"} />
                        {"Upload"}
                        <input
                          type="file"
                          ref={hiddenFileInput}
                          multiple={true}
                          style={{ display: "none" }}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            upload_data(event.target.files);
                          }}
                        />
                      </Button>
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        disabled={data.length === 0}
                        onClick={() => {
                          setLabeling(true);
                        }}
                      >
                        Start Labeling
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
                      dataField: "data_id",
                      text: "id",
                      sort: true,
                      hidden: true,
                    },
                    {
                      dataField: "data_name",
                      text: "Image Name",
                      sort: true,
                    },
                    {
                      dataField: "file",
                      text: "Image",
                      sort: false,
                      formatter: (cellContent, row) => (
                        <div>
                          <img
                            src={row.url}
                            // src={`data:image/jpeg;base64,${row.file}`}
                            style={{ maxWidth: "500%", maxHeight: "100px" }}
                          />
                        </div>
                      ),
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
      )}
    </React.Fragment>
  );
};
export default DataTable;
