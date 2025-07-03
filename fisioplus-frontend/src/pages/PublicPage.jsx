import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.png";
import bannerBg from "../assets/img/banner-bg.png";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../css/PublicPage.css";

const PublicPage = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Terapia", "Progreso"];
  const period = 2000;

  useEffect(() => {
    const ticker = setInterval(() => tick(), delta);
    return () => clearInterval(ticker);
  }, [text, delta]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);
    setDelta(isDeleting ? delta / 2 : delta);

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <>
      <Navbar />

      <section
        className="public-page"
        id="home"
        style={{
          backgroundImage: `url(${bannerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          padding: "260px 0 100px 0",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <span className="tagline">Centro especializado</span>
                    <h1>
                      FisioPlusRafael{" "}
                      <span
                        className="txt-rotate"
                        data-period="1000"
                        data-rotate='[ "Terapia", "Progreso" ]'
                      >
                        <span className="wrap">{text}</span>
                      </span>
                    </h1>
                    <p className="hero-description">
                      Bienvenido a tu espacio de rehabilitación donde podrás hacer ejercicios
                      diarios, consultar tu historia médica, acceder a información confiable,
                      comunicarte con tu fisioterapeuta por chat y seguir tu progreso para mejorar tu
                      movilidad y bienestar.
                    </p>
                    <button type="button" onClick={() => console.log("connect")}>
                      ¡Comencemos con tu rutina de ejercicios! <ArrowRightCircle size={25} />
                    </button>
                  </div>
                )}
              </TrackVisibility>
            </Col>

            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                    <img
                      className="hero-image"
                      src={headerImg}
                      alt="Ejercicio de fisioterapia"
                      style={{ marginTop: "-100px", maxWidth: "100%" }}
                    />
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default PublicPage;
