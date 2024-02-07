import { useEffect } from "react";
import extractFilesLabels from "../utils/extractFilesLabels";
import useZoom from "./useZoom";
import { useDashboard } from ".";
import CallApi from "resource/api/CallApi";
import SystemFunc from "resource/methods/SystemFunc";

const DELTA = 2;

export default function useMenu(backProject) {
  const { state, dispatch } = useDashboard();
  const onZoom = useZoom();
  const hasFiles = state.files.length > 0;
  const hasSelectedBox = state.selectedBox > -1;
  const isFirst = state.fileIndex === 0;
  const isLast = state.fileIndex === state.files.length - 1;
  const hasBoxes = Object.values(state.allBoxes).flat().length > 0;

  return [
    {
      label: "Back",
      icon: "⬅️",
      hotkey: (e) => e.key === "ArrowRight",
      action: () => backProject(),
    },
    {
      label: "Save",
      icon: "💾",
      hotkey: (e) => e.key === "s",
      disabled: !hasFiles || !hasBoxes,
      action: () => {
        dispatch({ type: "toggle-save-modal" });
      },
    },
    // {
    //   label: "Upload",
    //   icon: "📂",
    //   type: "input[file]",
    //   hotkey: (e) => e.key === "o",
    //   action: async (e) => {
    //     if (e.target.files.length > 0) {
    //       let data_id = [];
    //       for (let index = 0; index < e.target.files.length; index++) {
    //         data_id.push("ld-" + SystemFunc.uuid());
    //       }
    //       dispatch({
    //         type: "load",
    //         data: {
    //           value: await extractFilesLabels(
    //             [...e.target.files],
    //             state.files.length,
    //             null,
    //             null
    //           ),
    //           data_id: data_id,
    //         },
    //       });

    //       let insertData = [];
    //       let account_uid = SystemFunc.getUser_Token();

    //       for (let index = 0; index < e.target.files.length; index++) {
    //         const file = e.target.files[index];
    //         const reader = new FileReader();
    //         await new Promise((resolve) => {
    //           reader.onloadend = () => {
    //             const base64string = reader.result.split(",")[1];
    //             insertData.push({
    //               account_uid: account_uid,
    //               data_id: data_id[index],
    //               data_name: file.name,
    //               project_id: state.project_id,
    //               file: base64string,
    //             });
    //             resolve();
    //           };
    //           reader.readAsDataURL(file);
    //         });
    //       }
    //       CallApi.ExecuteApi(
    //         "http://localhost:8080/label_project/insert_label_data",
    //         insertData
    //       )
    //         .then((res) => {
    //           if (!res) {
    //             console.log(res);
    //           }
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     }
    //   },
    // },
    {
      label: "Prev",
      icon: "⇦",
      hotkey: (e) => e.key === "ArrowLeft",
      action: () => dispatch({ type: "prev" }),
      disabled: !hasFiles || isFirst,
    },
    {
      label: "Next",
      icon: "⇨",
      hotkey: (e) => e.key === "ArrowRight",
      action: () => dispatch({ type: "next" }),
      disabled: !hasFiles || isLast,
    },

    // {
    //   label: "Duplicate RectBox",
    //   icon: "📑",
    //   hotkey: (e) => e.key === "d",
    //   disabled: !hasFiles || !hasSelectedBox,
    //   action: () => dispatch({ type: "duplicate-box" }),
    // },
    {
      label: "Delete RectBox",
      icon: "❌",
      hotkey: (e) => e.key === "Backspace",
      disabled: !hasFiles || !hasSelectedBox,
      action: () => dispatch({ type: "remove-box" }),
    },
    {
      label: "Zoom in",
      icon: "🔍",
      hotkey: (e) => e.key === "+",
      disabled: !hasFiles,
      action: () => onZoom(DELTA),
    },
    {
      label: "Zoom out",
      icon: "🔍",
      disabled: !hasFiles,
      hotkey: (e) => e.key === "-",
      action: () => onZoom(-DELTA),
    },
  ];
}
