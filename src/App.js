import { useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Layer, Stage, Text } from "react-konva";
import useImage from "use-image";
import { HexColorPicker } from "react-colorful";
import { Button, Collapse } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const App = () => {
  const fonts = ["Impact", "Arial", "Arial Black", "Georgia"];

  const [selectedImage, setSelectedImage] = useState();
  const [text, setText] = useState("");
  const [font, setFont] = useState("Roboto");
  const [size, setSize] = useState(40);
  const [color, setColor] = useState("#000000");
  const [open, setOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [translatedText, setTranslatedText] = useState([]);
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);

  const canvasRef = useRef([]);

  const imageChange = (e) => {
    e.preventDefault();
    if (e.target.files[0] && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage();
    setText("");
  };

  const getTextTranslation = (e) => {
    e.preventDefault();
    axios({
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.REACT_APP_KEY,
        "Ocp-Apim-Subscription-Region": process.env.REACT_APP_LOCATION,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        to: ["fr", "ru", "ja", "es"],
      },
      data: [
        {
          text: text,
        },
      ],
    }).then(function (response) {
      setTranslatedText([...response.data[0].translations, { text: text }]);
    });
  };

  const downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllImage = (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to download sticker ?")) {
      canvasRef.current.map((el, i) =>
        downloadURI(el.toDataURL(), "sticker.png")
      );
    }
    return false;
  };

  const incrementSize = (e) => {
    e.preventDefault();
    setSize(size + 1);
  };

  const decrementSize = (e) => {
    e.preventDefault();
    setSize(size - 1);
  };

  const handleFont = (e) => {
    e.preventDefault();
    setFont(e.target.value);
  };

  const handleDragEnd = (e) => {
    setX(e.target?.attrs?.x);
    setY(e.target?.attrs?.y);
  };

  const SetText = () => {
    return (
      <Text
        draggable
        fontSize={size}
        y={y}
        x={x}
        text={text}
        fontFamily={font}
        fill={color}
        onDragEnd={handleDragEnd}
      />
    );
  };

  const SetImage = () => {
    const [image] = useImage(
      selectedImage ?? "https://placehold.co/400x400?text=No+Image"
    );

    return <Image height={400} width={400} image={image} />;
  };

  return (
    <>
      <main>
        <section className="container d-flex flex-column justify-content-center align-items-center">
          <div className="my-2">
            <h2 style={{ color: color }}>Multi Language Sticker Generator</h2>
          </div>
          <div>
            <form id="image-form">
              <input
                type="file"
                hidden
                name="img[]"
                onChange={(e) => {
                  imageChange(e);
                }}
                id="imfInput"
                className="file"
                accept="image/*"
              />
              <div className="input-group my-3">
                <input
                  style={{ minWidth: "300px" }}
                  type="text"
                  value={text}
                  className="form-control"
                  placeholder={"Input your text"}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <label
                    htmlFor="imfInput"
                    className=" btn btn-outline-primary"
                  >
                    Select Image
                  </label>
                </div>
                <div className="mx-2">
                  <button
                    onClick={getTextTranslation}
                    className="btn btn-outline-success"
                  >
                    Generate Sticker
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mx-4">
            <div className="card p-2 ">
              <div className="d-flex flex-column">
                <div className="position-relative">
                  <div className="close position-absolute">
                    {selectedImage && (
                      <button
                        type="button"
                        className="btn-close "
                        onClick={removeSelectedImage}
                        aria-label="Close"
                      ></button>
                    )}
                  </div>
                  <Stage width={400} height={400}>
                    <Layer>
                      <SetImage />
                      <SetText />
                    </Layer>
                  </Stage>
                </div>
                <div className="config my-3 m-2">
                  <div className="input-group mb-3">
                    {text && (
                      <div>
                        <button
                          aria-controls="collapse"
                          aria-expanded={collapse}
                          onClick={() => setCollapse(!collapse)}
                          className="btn btn-outline-primary"
                        >
                          Edit Text
                        </button>
                      </div>
                    )}
                    {selectedImage && (
                      <div className="mx-2">
                        <button
                          onClick={downloadAllImage}
                          className="btn btn-outline-success"
                        >
                          Download Sticker
                        </button>
                      </div>
                    )}
                  </div>
                  <Collapse in={collapse}>
                    <div id="collapse">
                      <div className="input-group mb-3">
                        <label className="col-sm-2 col-form-label">Font</label>
                        <div className="col-sm-9">
                          <select
                            onChange={handleFont}
                            className="form-select"
                            aria-label="Default select example"
                            id="selectFont"
                          >
                            {fonts.map((element, index) => (
                              <option value={element} key={index}>
                                {element}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        <label className="col-sm-2 col-form-label">Size</label>
                        <div className="col-sm-9 text-center d-flex ">
                          <button
                            onClick={incrementSize}
                            className="btn btn-outline-secondary"
                          >
                            +
                          </button>
                          <input
                            value={size}
                            type="text"
                            className="form-control mx-3 "
                            style={{ width: 50 }}
                          />
                          <button
                            onClick={decrementSize}
                            className="btn btn-outline-secondary"
                          >
                            -
                          </button>
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        <label className="col-sm-2 col-form-label">Color</label>
                        <div className=" col-sm-9 d-flex flex-column justify-content-center">
                          <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            style={{
                              background: `${color}`,
                              width: 40,
                              height: 40,
                            }}
                          ></Button>
                          <Collapse in={open}>
                            <HexColorPicker color={color} onChange={setColor} />
                          </Collapse>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-body-tertiary">
          <div className="d-flex flex-wrap justify-content-center">
            {translatedText &&
              selectedImage &&
              translatedText?.map((el, i) => (
                <div className="m-2 " key={i}>
                  <div className="card p-2 ">
                    <Stage
                      width={400}
                      height={400}
                      ref={(el) => (canvasRef.current[i] = el)}
                    >
                      <Layer>
                        <SetImage />
                        <Text
                          draggable
                          fontSize={size}
                          y={y}
                          x={x}
                          text={el.text}
                          fontFamily={font}
                          fill={color}
                        />
                      </Layer>
                    </Stage>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
