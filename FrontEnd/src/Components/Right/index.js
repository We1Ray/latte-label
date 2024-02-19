import { useEffect, useState } from "react";

import { useDashboard } from "../../context";
import useRedraw from "../../context/useRedraw";
import styles from "./styles.module.css";
import CallApi from "resource/api/CallApi";
import { Col, Row, Label } from "reactstrap";
import PublicMethod from "resource/methods/PublicMethod";
import Select from "react-select";

export default function Right() {
  const { state, boxes, boxNames, dispatch } = useDashboard();
  const { selectedBox } = state;
  const file = state.files?.[state.fileIndex] || {};
  const labels = [
    ...new Set(Object.values(state.allBoxesNames).flatMap(Object.values)),
  ];

  const [type, setType] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  useEffect(() => {
    CallApi.ExecuteApi("/label_project/get_project_label_type", {
      project_id: state.project_id,
    })
      .then((res) => {
        if (res) {
          setType(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.project_id]);

  useEffect(() => {
    let options = [];
    for (let index = 0; index < type.length; index++) {
      const element = type[index];
      options.push({
        value: element.label_type_id,
        label: element.label_type_name,
      });
    }
    setTypeOptions(options);
  }, [JSON.stringify(type)]);

  useEffect(() => {
    if (
      state.selectedBox === boxes.length - 1 &&
      !boxNames[state.selectedBox]
    ) {
      dispatch({
        type: "rename-label",
        data: {
          index: state.selectedBox,
          value: PublicMethod.checkValue(typeOptions)
            ? typeOptions[0].value
            : "",
        },
      });
    }
  }, [state.selectedBox]);

  return (
    <div className={styles.right}>
      <p className={styles.title}>{file.name || "Box"}</p>
      <div className={styles.content}>
        <Row>
          <Label
            htmlFor="choices-single-no-search"
            className="form-label text-muted"
          >
            Labels
          </Label>
          {boxes.length === 0 ? (
            <i className={styles.notYet}>No boxes yet.</i>
          ) : (
            boxes
              .slice()
              .reverse()
              .map((box, index) => {
                const realIndex = boxes.length - 1 - index;
                const isActive = selectedBox === realIndex;

                return (
                  <Col lg={12}>
                    <Select
                      value={
                        PublicMethod.checkValue(typeOptions) &&
                        boxNames[realIndex]
                          ? typeOptions.find(
                              (element) => element.value === boxNames[realIndex]
                            )
                          : {}
                      }
                      className={`${styles.box} ${
                        isActive ? styles.active : ""
                      }`}
                      onChange={(select) => {
                        dispatch({
                          type: "rename-label",
                          data: { index: realIndex, value: select.value },
                        });
                        if (isActive) return;
                        dispatch({ type: "select-box", data: realIndex });
                      }}
                      options={typeOptions}
                      defaultValue={() => {
                        if (!isActive)
                          dispatch({ type: "select-box", data: realIndex });
                        return PublicMethod.checkValue(typeOptions)
                          ? typeOptions[0]
                          : {};
                      }}
                      menuPosition="fixed"
                    />
                  </Col>
                );
              })
          )}
        </Row>
        {labels.length > 0 && (
          <datalist id="labels">
            {labels.map((label) => (
              <option key={label} value={label} />
            ))}
          </datalist>
        )}
      </div>
      <p className={styles.title}>Files</p>
      <div className={styles.content}>
        {state.files?.length > 0 ? (
          state.files.map((file, index) => (
            <>
              <div
                key={index}
                onClick={() => {
                  dispatch({ type: "change-file", data: index });
                }}
                className={`${styles.box} ${
                  state.fileIndex === index ? styles.active : ""
                }`}
              >
                {file.name}
              </div>
              <div style={{ border: "1px solid #CCC" }} />
            </>
          ))
        ) : (
          <i className={styles.notYet}>No files yet.</i>
        )}
      </div>
    </div>
  );
}
