import React, { useEffect, useRef } from "react";
import Head from "next/head";
import gsap from "gsap";
import Image from "next/image";
import insertActivity from "../../../public/images/logo.png";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Container } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";
import Ratio from "react-bootstrap/Ratio";
// import { DoubleSection, Single } from "./components";

const imgWidth = 400;
const imgHeight = 400;

gsap.registerPlugin(ScrollTrigger);

export const Page: React.FC = () => {
  const { language } = useLanguage();
  const videoRef = useRef();
  const titleRef = useRef();
  const section1Ref = useRef();
  const section1TextRef = useRef();
  const section2Ref = useRef();

  // const section1ImageRef = useRef();
  // const section1TextRef = useRef();
  // const section2ImageRef = useRef();
  // const section2TextRef = useRef();

  useEffect(() => {
    gsap.fromTo(videoRef.current, { x: -200 }, { x: 0, duration: 3 });
    gsap.fromTo(titleRef.current, { x: 200 }, { x: 0, duration: 3 });
    // ["1", "2"].map((num) =>
    //   gsap.to(`.section-title${num}`, {
    //     x: "0",
    //     scrollTrigger: {
    //       start: "top center",
    //       end: "bottom center",
    //       pin: true,
    //       trigger: `.section-title${num}`,
    //       markers: true,
    //     },
    //   })
    // );
  }, []);

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>
      <div className="main-section">
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
          <p>{Translations[language][Labels.SUBTITLE]}</p>
        </div>
      </div>

      <div className="single-section right section1">
        <h3 className="section-title">Estudantes realizam as atividades</h3>
        <div className="imgs-container">
          <img
            alt="img"
            src="/images/logo.png"
            width={imgWidth}
            height={imgHeight}
          />
          <img
            alt="img"
            src="/images/logo.png"
            width={imgWidth}
            height={imgHeight}
          />
          <img
            alt="img"
            src="/images/logo.png"
            width={imgWidth}
            height={imgHeight}
          />
          <img
            alt="img"
            src="/images/logo.png"
            width={imgWidth}
            height={imgHeight}
          />
        </div>
      </div>

      <div className="single-section left section2">
        <div className="imgs-container">
          <img
            alt="img"
            src="/images/logo.png"
            width={imgWidth}
            height={imgHeight}
          />
          <img
            alt="img"
            src="/images/logo.png"
            width={imgWidth}
            height={imgHeight}
          />
          <img
            alt="img"
            src="/images/logo.png"
            width={imgWidth}
            height={imgHeight}
          />
          <img
            alt="img"
            src="/images/logo.png"
            width={imgWidth}
            height={imgHeight}
          />
        </div>
        <h3 ref={section1TextRef} className="section-title">
          Estudantes realizam as atividades
        </h3>
      </div>
    </Container>
  );
};
