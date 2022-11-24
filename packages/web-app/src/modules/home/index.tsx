"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Container } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";
import Ratio from "react-bootstrap/Ratio";
import { ImgModal } from "./components/img-modal";

const imgWidth = 300;
const imgHeight = 300;

gsap.registerPlugin(ScrollTrigger);

export const Page: React.FC = () => {
  const { language } = useLanguage();
  const videoRef = useRef();
  const titleRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImgSrc] = useState("");

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
  ].map(({ src, alt }, key) => (
    <img
      onClick={() => onClickImage(src)}
      key={key}
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
  ].map(({ src, alt }, key) => (
    <img
      onClick={() => onClickImage(src)}
      key={key}
      alt={alt}
      src={src}
      width={imgWidth}
      height={imgHeight}
    />
  ));

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>
      <div className={`main-section`}>
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

      <div className="single-section right">
        <h3 className="section-title">
          {Translations[language][Labels.Home.SECTION1]}
        </h3>
        <div className="imgs-container">{section1Images}</div>
      </div>

      <div className="section2 single-section left">
        <div className="imgs-container">{section2Images}</div>
        <h3 className="section-title">
          {Translations[language][Labels.Home.SECTION2]}
        </h3>
      </div>

      <div className="call-to-action">
        <button className="browse-activities">
          {Translations[language][Labels.Home.BROWSE_ACTIVITIES]}
        </button>
        <button className="login">
          {Translations[language][Labels.Home.LOGIN]}
        </button>
        <button className="signup">
          {Translations[language][Labels.Home.SIGNUP]}
        </button>
      </div>
      {modalOpen && (
        <ImgModal src={modalImageSrc} onClose={() => setModalOpen(false)} />
      )}
    </Container>
  );
};
