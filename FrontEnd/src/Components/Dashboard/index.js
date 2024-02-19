import Center from "../Center";
import Left from "../Left";
import Right from "../Right";
import { DashboardProvider } from "../../context";
import { useDashboard } from "../../context";
import styles from "./styles.module.css";
import { useEffect } from "react";
import extractFilesLabels from "utils/extractFilesLabels";
import CallApi from "resource/api/CallApi";

export default function Dashboard({
  project_id,
  backProject,
  images,
  data_id,
}) {
  return (
    <DashboardProvider>
      <DashboardInit
        project_id={project_id}
        backProject={backProject}
        images={images}
        data_id={data_id}
      />
    </DashboardProvider>
  );
}

function DashboardInit({ project_id, backProject, images, data_id }) {
  const { state, dispatch } = useDashboard();

  useEffect(() => {
    dispatch({
      type: "project_id",
      data: project_id,
    });

    let databox = [];

    CallApi.ExecuteApi(
      "/label_project/get_project_label_data_yolo",
      {
        project_id: project_id,
      }
    )
      .then(async (res) => {
        if (res) {
          databox = res;
          dispatch({
            type: "load",
            data: {
              value: await extractFilesLabels(
                [...images],
                state.files.length,
                data_id,
                databox
              ),
              data_id: data_id,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.left}>
        <Left backProject={backProject} />
      </div>
      <div className={styles.center}>
        <Center />
      </div>
      <div className={styles.right}>
        <Right />
      </div>
    </div>
  );
}
