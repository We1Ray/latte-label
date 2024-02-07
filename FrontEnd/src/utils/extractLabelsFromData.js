import getImagesResolutions from "./getImagesResolutions";

export default async function extractLabelsFromData(
  images,
  data_id,
  databox,
  startIndex = 0
) {
  let currentIndex = startIndex;
  const boxes = {};
  const boxesNames = {};

  for (let imgIndx = 0; imgIndx < images.length; imgIndx += 1) {
    const image = images[imgIndx];

    const [{ w, h }] = await getImagesResolutions([image]);
    currentIndex = imgIndx + startIndex;
    if (
      databox.filter((item) => item.data_id == data_id[currentIndex]).length > 0
    ) {
      let data = [];
      let type_id = [];
      databox
        .filter((item) => item.data_id == data_id[currentIndex])
        .map((box, i) => {
          data.push([
            Math.round(box["x"] * w - (box["w"] * w) / 2),
            Math.round(box["y"] * h - (box["h"] * h) / 2),
            Math.round(box["x"] * w + (box["w"] * w) / 2),
            Math.round(box["y"] * h + (box["h"] * h) / 2),
          ]);
          type_id.push(box["label_type_id"]);
        });
      boxes[currentIndex] = data;
      boxesNames[currentIndex] = type_id;
    }
  }
  return { boxes, boxesNames, lastIndex: currentIndex };
}
