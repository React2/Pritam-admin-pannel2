/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
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

const About = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [desc, setDesc] = useState("");
  const [descModal, setDescModal] = useState(false);
  const [editData, setEditData] = useState({});

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Baseurl = "https://pritam-backend.vercel.app/";

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/static/getAboutUs`);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { response } = await axios.delete(
        `${Baseurl}api/v1/static/aboutUs/${data?._id}`,
        Auth
      );
      const msg = response.message;
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
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [title, setTitle] = useState(editData?.title);
    const [secondTitle, setSecondTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [descArray, setDescArray] = useState(
      editData?.desc ? editData?.desc : []
    );
    const [image, setImage] = useState("");
    const descObject = {
      title: secondTitle,
      desc,
    };

    const payload = {
      title,
      desc: descArray,
      image
    };
    const formdata = new FormData();
    formdata.append("image", image);
    descArray?.forEach(i => {
      formdata.append("title", i.title);
      formdata.append("desc", i.desc);
    })
    const query_adder = () => {
      setDescArray((prev) => [...prev, descObject]);
      setSecondTitle("");
      setDesc("");
    };

    const query_remover = (index) => {
      setDescArray((prev) => prev.filter((_, i) => i !== index));
    };

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
 
        const data = await axios.post(
          `${Baseurl}api/v1/static/createAboutus`,
          formdata,
          Auth
        );
        const msg = data?.data?.message;
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

        setSubmitLoading(false);
        props.onHide();
        fetchData();
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

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
               console.log("payload", payload);
        const data = await axios.put(
          `${Baseurl}api/v1/static/aboutUs/${id}`,
          formdata,
          Auth
        );
        const msg = data?.data?.message;
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

        setSubmitLoading(false);
        props.onHide();
        fetchData();
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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit" : " Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <FloatingLabel>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0], "eForm")}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Another Title</Form.Label>
              <Form.Control
                type="text"
                value={secondTitle}
                onChange={(e) => setSecondTitle(e.target.value)}
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

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              className="mb-2"
              type="button"
              onClick={() => query_adder()}
            >
              Add
            </Button>

            {descArray?.map((i, index) => (
              <div className="InfoBox" key={index}>
                <p className="desc mt-2"> Title : {i.title} </p>
                <p className="desc mt-2"> Description : {i.desc} </p>
                <Button
                  style={{
                    backgroundColor: "#0c0c0c",
                    borderRadius: "0",
                    border: "1px solid #0c0c0c",
                  }}
                  className="mb-2 mt-2"
                  type="button"
                  onClick={() => query_remover(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <br />
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
            style={{ fontSize: "1.5rem" }}
          >
            About Us
          </span>
          <div>
            <button
              onClick={() => deleteHandler(data?._id)}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#d11a2a] text-white tracking-wider mr-3"
            >
              Delete
            </button>
            {!data._id && (
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
            )}
            {data._id && (
              <button
                onClick={() => {
                  setEditData(data);
                  setId(data?._id);
                  setEdit(true);
                  setModalShow(true);
                }}
                className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider ml-3"
              >
                Update
              </button>
            )}
          </div>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>No Data Found !</Alert>
        ) : (
          <>
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
            <div className="overFlowCont mt-5">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.desc.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>{i.title} </td>
                      <td>
                        <button
                          onClick={() => {
                            setDesc(i.desc);
                            setDescModal(true);
                          }}
                          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(About);
