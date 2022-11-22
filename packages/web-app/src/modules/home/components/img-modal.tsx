import { Modal } from "@atomic";

export const ImgModal = ({ src, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <img src={src} />
      </div>
    </Modal>
  );
};
