import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Container } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage, useColorTheme } from "@contexts";
import { Translations, Labels } from "@locale";
import Ratio from "react-bootstrap/Ratio";
import { ImgModal } from "./components/img-modal";
import { useMediaQuery } from "react-responsive";

const imgWidth = 300;
const imgHeight = 300;

gsap.registerPlugin(ScrollTrigger);

export const Page: React.FC = () => {
  const {
    theme: { responsiveBreakpoint },
  } = useColorTheme();
  const { language } = useLanguage();
  const videoRef = useRef();
  const titleRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImgSrc] = useState("");
  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });

  useEffect(() => {
    gsap.fromTo(videoRef.current, { x: -200 }, { x: 0, duration: 3 });
    gsap.fromTo(titleRef.current, { x: 200 }, { x: 0, duration: 3 });
  }, []);

  const onClickImage = (src) => {
    setModalImgSrc(src);
    setModalOpen(true);
  };

  const section1Images = [
    { src: "/images/logo.png", alt: "" },
    { src: "/images/logo.png", alt: "" },
    { src: "/images/logo.png", alt: "" },
    { src: "/images/logo.png", alt: "" },
  ].map(({ src, alt }) => (
    <img
      onClick={() => onClickImage(src)}
      alt={alt}
      src={src}
      width={imgWidth}
      height={imgHeight}
    />
  ));

  const section2Images = [
    { src: "/images/logo.png", alt: "" },
    { src: "/images/logo.png", alt: "" },
    { src: "/images/logo.png", alt: "" },
    { src: "/images/logo.png", alt: "" },
  ].map(({ src, alt }) => (
    <img
      onClick={() => onClickImage(src)}
      alt={alt}
      src={src}
      width={imgWidth}
      height={imgHeight}
    />
  ));

  const section1Styles = `${
    isBigScreen ? "single-section right" : "section-small"
  }`;
  const section2Styles = `${
    isBigScreen ? "single-section left" : "section2-small section-small"
  }`;
  const sectionTitleStyles = `${
    isBigScreen ? "sticky-title" : ""
  } section-title`;

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>
      <div
        className={`main-section ${isBigScreen ? "main-large" : "main-small"}`}
      >
        <div className="video">
          <Ratio aspectRatio="16x9">
            <iframe
              src={"https://youtube.com/embed/fsdfsdfs"}
              title="YouTube video"
              allowFullScreen
              ref={videoRef}
            ></iframe>
          </Ratio>
        </div>
        <div className="title" ref={titleRef}>
          <h1>language-app</h1>
          <p>{Translations[language][Labels.Home.SUBTITLE]}</p>
        </div>
      </div>

      <div className={section1Styles}>
        <h3 className={sectionTitleStyles}>
          {Translations[language][Labels.Home.SECTION1]}
        </h3>
        <div className="imgs-container">{section1Images}</div>
      </div>

      <div className={section2Styles}>
        <div className="imgs-container">{section2Images}</div>
        <h3 className={sectionTitleStyles}>
          {Translations[language][Labels.Home.SECTION2]}
        </h3>
      </div>
      {modalOpen && (
        <ImgModal src={modalImageSrc} onClose={() => setModalOpen(false)} />
      )}
    </Container>
  );
};
