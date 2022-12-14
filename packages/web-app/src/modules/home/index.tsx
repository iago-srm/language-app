"use client";
import Link from "next/link";
import axios from "axios";
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
import { DashboardButton } from "../dashboard/components";
import { Icons } from "@atomic";

const imgWidth = 600;
const videoUrl = {
  pt: "zu0unBdP3oI",
  en: "FuYyzwA2rWM",
};

gsap.registerPlugin(ScrollTrigger);

export const Page: React.FC = () => {
  const { language } = useLanguage();
  const videoRef = useRef();
  const titleRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImg] = useState({ src: "", descr: "" });
  const [backendIsOn, setBackendIsOn] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await axios.get(process.env.NEXT_PUBLIC_HEALTHCHECK_URL);
        setBackendIsOn(true);
      } catch (e) {
        setBackendIsOn(false);
      }
    })();
  }, []);

  useEffect(() => {
    gsap.fromTo(videoRef.current, { x: -200 }, { x: 0, duration: 3 });
    gsap.fromTo(titleRef.current, { x: 200 }, { x: 0, duration: 3 });
  }, []);

  const onClickImage = ({ src, descr }) => {
    setModalImg({ src, descr });
    setModalOpen(true);
  };

  const getImgComponent = ({ src, alt, descr }, key) => (
    <img
      title={descr}
      onClick={() => onClickImage({ src, descr })}
      key={key}
      alt={alt || descr}
      src={src}
      style={{ objectFit: "cover", maxWidth: "90vw", width: imgWidth }}
    />
  );

  const section1Images = [
    {
      src: "/images/4.2.1.png",
      descr:
        "Choose a title, a description, a CEFR level and topics for the new activity",
    },
    {
      src: "/images/4.2.2.png",
      descr: "Insert some content into the activity, which can be a video",
    },
    {
      src: "/images/4.2.5.png",
      descr:
        "Insert some content into the activity, which can be some formatted text",
    },
    {
      src: "/images/4.2.3.png",
      descr: "Come up with questions related to the activity content",
    },
    {
      src: "/images/4.2.4.png",
      descr: "Come up with questions related to the activity content",
    },
  ].map(getImgComponent);

  const section2Images = [
    {
      src: "/images/4.3.png",
      descr: "List all possible activities based on filters",
    },
    { src: "/images/4.4.1.png", descr: "Check out the activity content" },
    { src: "/images/4.4.2.png", descr: "Answer the questions" },
    {
      src: "/images/4.5.1.png",
      descr: "See the activities you have already completed",
    },
    {
      src: "/images/4.6.1.png",
      descr:
        "See past activities that have not gotten feedback from the instructor yet",
    },
    {
      src: "/images/4.6.3.png",
      descr: "See feedback from instructors on each question",
    },
  ].map(getImgComponent);

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>
      {!backendIsOn && (
        <p className="warning">{Translations[language][Labels.NO_BACKEND]}</p>
      )}
      <div className={`main-section`}>
        <div className="video">
          <Ratio aspectRatio="16x9">
            <iframe
              src={`https://youtube.com/embed/${videoUrl[language]}`}
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

      <div className="end-section">
        {/* <button className="browse-activities">
          {Translations[language][Labels.Home.BROWSE_ACTIVITIES]}
        </button> */}
        <DashboardButton
          description={"Browse through all the activities in the platform"}
          label={"Search Activities"}
          path="/activities"
          query={{ isOpen: true }}
          icon={<Icons.SEARCH />}
        />
        <div className="authenticate">
          {Translations[language][Labels.Home.LOGIN]}{" "}
          <a>
            <Link href="/signin">{Translations[language][Labels.SIGNIN]}</Link>.{" "}
          </a>
          <a>
            <Link href="/signup">{Translations[language][Labels.SIGNUP]}</Link>
          </a>
        </div>
      </div>
      {modalOpen && (
        <ImgModal
          src={modalImage.src}
          descr={modalImage.descr}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Container>
  );
};

const useCheckBackend = async () => {};
