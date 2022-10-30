import Ratio from "react-bootstrap/Ratio";
import styled from "styled-components";

const VideoContentStyled = styled.div`
  p {
    margin-top: 10px;
  }
`;

const getFormattedTimestamp = (time) =>
  `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
    time % 60
  ).padStart(2, "0")}`;
export const VideoContent = ({ youtubeId, start, end }) => {
  return (
    <VideoContentStyled>
      <div style={{ width: "100%", height: "auto" }}>
        <Ratio aspectRatio="16x9">
          <iframe
            src={`https://youtube.com/embed/${youtubeId}`}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </Ratio>
      </div>
      <p>
        Start the video at {getFormattedTimestamp(start)} and end at{" "}
        {getFormattedTimestamp(end)}
      </p>
    </VideoContentStyled>
  );
};
