import React from 'react'
import HOC from '../../layout/HOC'

import {
  Table,
  Modal,
  Form,
  Button,
  Alert,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { Store } from "react-notifications-component";
import { useState } from 'react';
import { useEffect } from 'react';
const Bartending = () => {
  const [modalShow, setModalShow] = useState(false);
  const [descModal, setDescModal] = useState(false);
  const [desc, setDesc] = useState([]);
  const [data, setData] = useState("");
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [youtubeVideo, setYoutubeVideo] = useState("");

  const token = localStorage.getItem("AdminToken");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Baseurl = "https://pritam-backend.vercel.app/";

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/Bartending/getBartending`
      );
      setData(data.data);
      console.log(data.data);
      setTotal(data.data.length);
      const youtubeVideoLink = data.data.youtubeLink;
      const videoId = getVideoIdFromUrl(youtubeVideoLink); 
       if (videoId) {
        console.log("Video ID:", videoId);
          const videourl = `https://www.youtube.com/embed/${videoId}?si=InTXwsXs3JbTwAMf&amp;start=3`;
         setYoutubeVideo(videourl);
         setData((prev) => {

             return {...prev,"updateyoutubelink":videourl}
      
         })
      } else {
        console.log("Invalid YouTube URL");
      }
    } catch (e) {
      console.log(e);
    }
  };

  function getVideoIdFromUrl(url) {
  
    const regExp = /v=([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  }




  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/admin/Bartending/DeleteBartending/${id}`,
        Auth
      );
      const msg = data.message;
         fetchData();
      Store.addNotification({
        title: "",
        message: msg,
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
   
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    //sate in data base
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [contactUsformTitle, setcontactUsformTitle] = useState("");
    const [contactUsformDesc, setcontactUsformDescA] = useState("");
    const [contactUsformAvaili, setcontactUsformAvailiability] =
      useState("");
    const [contactUsformWhatsApp, setcontactUsformWhatsApp] = useState("");
    const [contactUsformCall, setcontactUsformCall] = useState("");
    const [contactUsformPrivacy, setcontactUsformPrivacy] = useState("");
    const [privacy, setprivacy] = useState("");
    const [contactUsformTerms, setcontactUsformTerms] = useState("");
    const [youtubeLink, setyoutubeLink] = useState("");
    const [image, setImage] = useState("");



    const payload = {
      title,
      desc,
      contactUsformTitle,
      contactUsformDesc,
      contactUsformAvaili,
      contactUsformWhatsApp,
      contactUsformCall,
      contactUsformPrivacy,
      privacy,
      contactUsformTerms,
      youtubeLink,
      image,
    };
 
   

    const fromData = new FormData();
    fromData.append("title", title);
    fromData.append("desc", desc);
    fromData.append("contactUsformTitle", contactUsformTitle);
    fromData.append("contactUsformDesc", contactUsformDesc);
    fromData.append("contactUsformAvaili", contactUsformAvaili);
    fromData.append("contactUsformWhatApp", contactUsformWhatsApp);
    fromData.append("contactUsformCall", contactUsformCall);
    fromData.append("contactUsformPrivacy", contactUsformPrivacy);
    fromData.append("privacy", privacy);
    fromData.append("contactUsformTerms", contactUsformTerms);
    fromData.append("youtubeLink", youtubeLink);
    fromData.append("image", image);



    //  console.log("payload", payload);
    //    for (let key in payload) {
    //      fromData.append(key, payload[key]);
    //  }
    // if (title) {
    //   fromData.append("title", title);
    // }
    // if (desc) {
    //   fromData.append("desc", desc);
    // }
    // if (academyDesc) {
    //   fromData.append("academyDesc", academyDesc);
    // }
    // if (academyHeading) {
    //   fromData.append("academyHeading", academyHeading);
    // }
    // if (academyTitle) {
    //   fromData.append("academyTitle", academyTitle);
    // }
    // if (youtubeLink) {
    //   fromData.append("youtubeLink", youtubeLink);
    // }
    // if (formTitle) {
    //   fromData.append("formTitle", formTitle);
    // }
    // if (formDescA) {
    //   fromData.append("formDesc", formDescA);
    // }
    // if (formPrivacy) {
    //   fromData.append("formPrivacy", formPrivacy);
    // }
    // if (formImage) {
    //   fromData.append("formImage", formImage);
    // }
    // if (formWhatApp) {
    //   fromData.append("formWhatApp", formWhatApp);
    // }
    // if (formCall) {
    //   fromData.append("formCall", formCall);
    // }
    // if (consultancyTitleFirst) {
    //   fromData.append("consultancyTitle[0]", consultancyTitleFirst);
    // }
    // if (consultancyTitleSecond) {
    //   fromData.append("consultancyTitle[1]", consultancyTitleSecond);
    // }
    // if (consultancyTitlethird) {
    //   fromData.append("consultancyTitle[2]", consultancyTitlethird);
    // }
    // if (consultancyDescFirst) {
    //   fromData.append("consultancyDesc[0]", consultancyDescFirst);
    // }
    // if (consultancyDescSecond) {
    //   fromData.append("consultancyDesc[1]", consultancyDescSecond);
    // }
    // if (consultancyDescthird) {
    //   fromData.append("consultancyDesc[2]", consultancyDescthird);
    // }
    // if (mainImage) {
    //   mainImage.forEach((item) => {
    //     fromData.append("image", item);
    //   });
    // }

    //  console.log("typeof ",mainImage)

    const postHandler = async (e) => {
      e.preventDefault();

      setSubmitLoading(true);
      try {
        // console.log("formdata",fromData);
        const data = await axios.post(
          `${Baseurl}api/v1/admin/Bartending/addBartending`,
          fromData,
          Auth
        );
        const msg = data.data.message;
        Store.addNotification({
          title: "",
          message: msg,
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
        fetchData();
        props.onHide();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        Store.addNotification({
          title: "",
          message: msg,
          type: "danger",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
        setSubmitLoading(false);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            {imageLoading === true ? (
              <Spinner animation="border" role="status" />
            ) : (
              ""
            )}
            {uploaded === true ? (
              <Alert variant="success">Image Uploaded Successfully</Alert>
            ) : (
              ""
            )}
            <div className="multiple_Image">
              <img src={editData?.image} alt="" />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>contact Us form Title</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={contactUsformTitle}
                  onChange={(e) => setcontactUsformTitle(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>contact Us form Availiability</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={contactUsformAvaili}
                  onChange={(e) =>
                    setcontactUsformAvailiability(e.target.value)
                  }
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>contact Us formDesc</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={contactUsformDesc}
                  onChange={(e) => setcontactUsformDescA(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>contact Us form WhatsApp</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={contactUsformWhatsApp}
                  onChange={(e) => setcontactUsformWhatsApp(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>contact Us form Call</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={contactUsformCall}
                  onChange={(e) => setcontactUsformCall(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>contact Us form Privacy</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={contactUsformPrivacy}
                  onChange={(e) => setcontactUsformPrivacy(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>privacy</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={privacy}
                  onChange={(e) => setprivacy(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>contact Us form Terms</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={contactUsformTerms}
                  onChange={(e) => setcontactUsformTerms(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>youtube Link</Form.Label>
              <FloatingLabel>
                <Form.Control
                  type="text"
                  onChange={(e) => setyoutubeLink(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
              {submitLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  console.log("data", data);
  function MyDescriptionModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            View Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="InfoBox">
            <p className="title mb-1">Description </p>
            <p className="desc"> {desc} </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyDescriptionModal show={descModal} onHide={() => setDescModal(false)} />

      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "20px" }}
          >
            Barthending
          </span>
          <button
            onClick={() => {
              setEditData({});
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Create New
          </button>
          <span className="flexCont">
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteHandler(data._id)}
            />
          </span>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>Not Create Yet !</Alert>
        ) : (
          <>
            <div className="mt-4">
              <div className="multiple_Image">
                {data?.image && (
                  <img
                    src={data?.image}
                    style={{
                      width: "300px",
                      maxWidth: "300px",
                      height: "300px",
                      maxHeight: "400px",
                    }}
                    alt=""
                  />
                )}
              </div>
              <h1>{data.title}</h1>
              <p>{data.desc}</p>
              <h2>contact Us form Title</h2>
              <p>{data.contactUsformTitle}</p>
              <h2>contact Us form Availiability</h2>
              <p>{data.contactUsformAvaili}</p>
              <h2>contact Us form Desc</h2>
              <p>{data.contactUsformDesc}</p>
              <h2>contact Us form Privacy</h2>
              <p>{data.contactUsformPrivacy}</p>
              <h2>privacy</h2>
              <p>{data.privacy}</p>
              <h2>contact Us form Terms</h2>
              <p>{data.contactUsformTerms}</p>
              <div style={{ width: "90%", margin: "40px auto" }}>
                <iframe
                  width="80%"
                  height="400"
                  src={data?.updateyoutubelink}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
              <div>
                <div className="d-flex m-10">
                  <h4>contact for WhatsApp</h4>
                  <p className="ml-4">{data.contactUsformWhatApp}</p>
                </div>

                <div className="d-flex m-10">
                  <h4>Call Detail</h4>
                  <p className="ml-16">{data.contactUsformCall}</p>
                </div>

                <div className="d-flex m-10">
                  <h4>Created Date</h4>
                  <p className="ml-16">{data.createdAt.substr(0, 10)}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(Bartending)
