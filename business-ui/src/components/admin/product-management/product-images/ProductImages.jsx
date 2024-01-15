import React, { useEffect } from "react";
import ImagesDropzone from "./ImagesDropzone";
import ImageElement from "./ImageElement";

export default function ProductImages({ imageList, setImageList }) {
  const changeImageField = (index, parameter, value) => {
    const newArray = [...imageList];
    newArray[index][parameter] = value;
    console.log("newArray[index][parameter]", newArray[index][parameter]);
    if(newArray.length > 6){
      var images = newArray.slice(0, 6);
      setImageList(images);
      return;
    }
    setImageList(newArray);
  };

  const handleChangeOrderUp = (index) => {
    // If first, ignore
    if (index !== 0) {
      const newArray = [...imageList];
      const intermediate = newArray[index - 1];
      newArray[index - 1] = newArray[index];
      newArray[index] = intermediate;
      setImageList(newArray);
    }
  };

  const handleChangeOrderDown = (index) => {
    // If last, ignore
    if (index < imageList.length - 1) {
      const newArray = [...imageList];
      const intermediate = newArray[index + 1];
      newArray[index + 1] = newArray[index];
      newArray[index] = intermediate;
      setImageList(newArray);
    }
  };


  const handleDeleteImage = (index) => {
        const newArray = [...imageList];
        newArray.splice(index, 1);
        setImageList(newArray);
  };

  useEffect(() => {
    imageList.forEach((image, index) => {
      if (image.status === "FINISH") return;
      // changeImageField(index, "status", "UPLOADING");
      const uploadTask = image.storageRef.put(image.file);
      uploadTask.on(
        "state_changed",
        null,
        // (snapshot) => {
        //   //
        //   const progress = Math.round(
        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //   );
        //   console.log("progress", progress);
        // },
        function error(err) {
          console.log("Error Image Upload:", err);
        },
        async function complete() {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          changeImageField(index, "downloadURL", downloadURL);
          changeImageField(index, "status", "FINISH");
        }
      );
    });
  });

  return (
    <div className="align-items-around">
      <div className="">
        {imageList.length > 0 ? (
          <div className="row">
            {imageList.map((image, index) => {
              return (
                <ImageElement
                  key={index}
                  imageURL={image.downloadURL}
                  index={index}
                  isFirstElement={index === 0}
                  isLastElement={index === imageList.length - 1}
                  handleChangeOrderUp={handleChangeOrderUp}
                  handleChangeOrderDown={handleChangeOrderDown}
                  handleDeleteImage={handleDeleteImage}
                  changeImageField={changeImageField}
                />
              );
            })}

            <>
              {imageList.length < 6 ? (
                <div className="col-4">
                  <ImagesDropzone setImageList={setImageList} />{" "}
                </div>
              ) : (
                <></>
              )}
            </>
          </div>
        ) : (
          <div className="col-4">
            <ImagesDropzone setImageList={setImageList} />
          </div>
        )}
      </div>
      <div className="upload-avatar-text">
        <h5>ẢNH CHI TIẾT SẢN PHẨM</h5>
      </div>
    </div>
  );
}
