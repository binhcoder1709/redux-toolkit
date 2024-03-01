import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Upload } from "antd";
import { storage } from "../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import CopyClipBoard from "./CopyClipBoard";

export default function UploadSingleFile() {
  const [imageUploaded, setImageUploaded] = useState(null);
  console.log(imageUploaded);
  // tạo 1 tham chiếu đên thư mục cần upload
  const listImageRef = ref(storage, "files/");
  const props = {
    name: "file",
    onChange(info) {
      if (info.file.status === "done") {
        // lấy url từ firebase sau khi upload file thành công
        const downLoadUrl = info.file.response.url;
        setImageUploaded(downLoadUrl);

        message.success("tải ảnh thành công");
      } else if (info.file.status === "error") {
        message.error("tải ảnh thất bại");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // tạo 1 tham chiếu đến thư mục chứa hình ảnh
        const imageRef = ref(listImageRef, file.name);
        // tải hình ảnh lên firebase
        await uploadBytes(imageRef, file);
        // lấy đường dẫn của file vừa upload
        const downloadUrl = await getDownloadURL(imageRef);
        //gửi thông báo cho phần onChange
        onSuccess({ url: downloadUrl });
      } catch (error) {
        onError(error);
      }
    },
  };
  return (
    <>
      <div>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <div>
          <Input value={imageUploaded} />
          <CopyClipBoard copyText={imageUploaded} />
        </div>
      </div>
    </>
  );
}
