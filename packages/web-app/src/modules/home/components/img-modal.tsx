import { Modal } from "@atomic";

export const ImgModal = ({ src, onClose, descr }) => {
  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <img src={src} width={"100%"} />
        <p style={{ paddingTop: 20 }}>{descr}</p>
      </div>
    </Modal>
  );
};
