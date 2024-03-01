import { Button, message } from "antd";
import ClipboardJS from "clipboard";
import React, { useEffect, useRef } from "react";

export default function CopyClipBoard({ copyText }) {
  // tạo tham chiếu
  const buttonRef = useRef(null);
  // khởi tạo clipboard khi component được mount

  useEffect(() => {
    const clipBoard = new ClipboardJS(buttonRef.current);
    
    clipBoard.on("success", () => {
      message.success("copy thành công");
    });
    // hủy sự kiện khi component bị unmount
    return () => {
      clipBoard.destroy();
    };
  }, []);
  return (
    <>
      <Button data-clipboard-text={copyText} ref={buttonRef}>Copy</Button>
    </>
  );
}
