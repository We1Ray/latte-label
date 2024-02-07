import { useEffect } from "react";
import swal from "sweetalert";
import getYoloLabels from "../../utils/getYoloLabels";
import useMenu from "../../context/useMenu";
import { useDashboard } from "../../context";
import styles from "./styles.module.css";
import CallApi from "resource/api/CallApi";

export default function Left({ backProject }) {
  const { state } = useDashboard();
  const hasBoxes = Object.values(state.allBoxes).flat().length > 0;
  const menu = useMenu(backProject).map(getItem);

  useEffect(() => {
    if (state.saved || !hasBoxes) return;

    function unload(e) {
      const msg =
        "Do you really want to close? Changes that you made may not be saved.";
      e.returnValue = msg;
      return msg;
    }

    window.addEventListener("beforeunload", unload);
    return () => window.removeEventListener("beforeunload", unload);
  }, [state.saved, hasBoxes]);

  return (
    <>
      {menu}
      <ZoomPercentage />
      <SaveModal />
    </>
  );
}

function Item({ label, icon, onAction, type, disabled }) {
  const onClick = type === "input[file]" || disabled ? undefined : onAction;
  const disabledClass = disabled ? styles.disabled : "";
  const inputFileElement = type === "input[file]" && (
    <input
      accept="image/*, .txt, .xml"
      multiple
      onChange={onAction}
      type="file"
    />
  );

  return (
    <div className={`${styles.item} ${disabledClass}`} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>
        {inputFileElement}
        {label}
      </div>
    </div>
  );
}

const getItem = (item) => (
  <Item
    icon={item.icon}
    key={item.label}
    label={item.label}
    disabled={item.disabled}
    onAction={item.action}
    type={item.type}
  />
);

function ZoomPercentage() {
  const { state, canvasRef } = useDashboard();

  if (!canvasRef.current) return "";

  const perOne = Math.pow(1.1, state.zoom);
  const perCent = (perOne * 100).toFixed(0) + "%";

  return (
    <div style={{ marginTop: 10 }} className={styles.label}>
      {perCent}
    </div>
  );
}

function SaveModal() {
  const { state, boxes, boxNames, dispatch } = useDashboard();

  useEffect(() => {
    if (state.isSaveModalOpen) {
      saveYoloData();
    }
  }, [state.isSaveModalOpen]);

  async function saveYoloData() {
    let boxesToDownload = state.files.map((_, i) => state.allBoxes[i]);

    let namesOfBoxes = state.files.map((_, i) => state.allBoxesNames[i]);

    let relatedFiles = state.files;

    let data_id = state.data_id;
    const nonNullIndices = boxesToDownload.reduce((acc, current, index) => {
      if (current !== undefined) {
        acc.push(index);
      }
      return acc;
    }, []);

    boxesToDownload = nonNullIndices.map((index) => boxesToDownload[index]);
    namesOfBoxes = nonNullIndices.map((index) => namesOfBoxes[index]);
    relatedFiles = nonNullIndices.map((index) => relatedFiles[index]);
    data_id = nonNullIndices.map((index) => data_id[index]);

    const labels = await getYoloLabels(
      boxesToDownload,
      relatedFiles,
      namesOfBoxes,
      data_id,
      false
    );

    CallApi.ExecuteApi(
      "http://localhost:8080/label_project/delete_label_data_yolo",
      data_id
    )
      .then((res) => {
        if (res) {
          CallApi.ExecuteApi(
            "http://localhost:8080/label_project/insert_label_data_yolo",
            labels
          )
            .then((res) => {
              if (!res) {
                console.log(res);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await swal("Success", "儲存成功!", "success");

    dispatch({ type: "toggle-save-modal" });
    dispatch({ type: "save" });
  }

  return <></>;
}
