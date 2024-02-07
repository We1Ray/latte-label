import extractLabelsFromTxtFiles from "./extractLabelsFromTxtFiles";
import extractLabelsFromXmlFiles from "./extractLabelsFromXmlFiles";
import extractLabelsFromData from "./extractLabelsFromData";
import PublicMethod from "resource/methods/PublicMethod";

export default async function extractFilesLabels(
  files,
  startIndex,
  data_id,
  databox
) {
  let images = [];
  // let txts = [];
  // let txtsContent = [];
  // let xmls = [];
  // let xmlsContent = [];

  for (let file of files) {
    if (file.type.startsWith("image")) {
      images.push(file);
      continue;
    }
    // if (file.type === "text/plain") {
    //   txts.push(file);
    //   txtsContent.push(await extractFileContent(file));
    //   continue;
    // }
    // if (file.type === "text/xml") {
    //   xmls.push(file);
    //   xmlsContent.push(await extractFileContent(file));
    // }
  }

  // const fromTxt = await extractLabelsFromTxtFiles(
  //   images,
  //   txts,
  //   txtsContent,
  //   startIndex
  // );

  // const fromXml = extractLabelsFromXmlFiles(
  //   images,
  //   xmls,
  //   xmlsContent,
  //   fromTxt.lastIndex
  // );
  let fromData = { boxes: {}, boxesNames: {} };
  if (PublicMethod.checkValue(data_id) && PublicMethod.checkValue(databox)) {
    fromData = await extractLabelsFromData(
      images,
      data_id,
      databox,
      startIndex
    );
  }
  return {
    images,
    // allBoxes: { ...fromTxt.boxes, ...fromXml.boxes },
    // allBoxesNames: { ...fromTxt.boxesNames, ...fromXml.boxesNames },
    allBoxes: { ...fromData.boxes },
    allBoxesNames: { ...fromData.boxesNames },
  };
}

export async function extractFileContent(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsText(file);
  });
}
