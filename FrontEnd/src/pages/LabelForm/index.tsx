import React, { useState, useEffect } from "react";
import CallApi from "resource/api/CallApi";
import Dashboard from "Components/Dashboard";
import { Project } from "pages/Label/List";
import DataTable from "pages/LabelForm/DataTable";
import Loading from "pages/Loading/Loading";

type Props = {
  project: Project;
  backList: Function;
};

const LabelForm: React.FC<Props> = ({ project, backList }) => {
  const [labeling, setLabeling] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data_id, setData_id] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      if (data_id.length > 0 && images.length > 0) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    } else {
      setLoading(false);
    }
  }, [data.length, data_id.length, images.length]);

  function changeData() {
    CallApi.ExecuteApi(
      "http://localhost:8080/label_project/get_project_label_data",
      {
        project_id: project.project_id,
      }
    )
      .then(async (res: any) => {
        if (res) {
          setData(res);

          let images = [];
          let data_id = [];
          for (let index = 0; index < res.length; index++) {
            const response = await fetch(res[index]["url"]);
            const blob = await response.blob();

            const file = new File([blob], res[index]["data_name"], {
              type: "image/jpeg",
            });

            images.push(file);
            data_id.push(res[index]["data_id"]);
          }
          setImages(images);
          setData_id(res.map((item: any) => item.data_id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function backProject() {
    setLabeling(false);
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : labeling && data_id.length > 0 && images.length > 0 ? (
        <Dashboard
          project_id={project.project_id}
          backProject={backProject}
          images={images}
          data_id={data_id}
        />
      ) : (
        <DataTable
          data={data}
          changeData={changeData}
          project={project}
          setLabeling={setLabeling}
          backList={backList}
        />
      )}
    </React.Fragment>
  );
};

export default LabelForm;
