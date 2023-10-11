import React from 'react'
import HOC from '../../layout/HOC'
import { Table, Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Store } from "react-notifications-component";
import { useState, useEffect } from 'react';
import axios from 'axios';
const PageDescription = () => {
  const [loading, setLoading] = useState(false);
const [total, setTotal] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [pageDescription, setPageDescription] = useState([]);
  const Baseurl = "https://pritam-backend.vercel.app/";
  const getAllSupports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/page/addPageTitledescription`
      );
      const data = response.data;
      setLoading(false);
      console.log("data", data);
      setTotal(data.length);
      setPageDescription(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSupports();
  }, []);
  // "question":"this is question",
  // "answer":"this is answer",
  // "type":"Product"
  function MyVerticallyCenteredModal(props) {
    const [question, setquestion] = useState("");
    const [answer, setanswer] = useState("");
    const [type, setType] = useState("");
    const payload = {
      question,
      answer,
      type,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        console.log(payload);
        const data = await axios.post(
          `${Baseurl}/admin/page/addPageTitledescription`,
          payload
        );
        Store.addNotification({
          title: "",
          message: "Created Successfully",
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

        //  props.onHide();
        getAllSupports();
      } catch {}
    };
    console.log("query", pageDescription);
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select onChange={(e) => setType(e.target.value)}>
                {/* ["Product", "Delivery", "Farm", "App"] */}
                <option>{type}</option>
                <option value="Product">Product</option>
                <option value="Delivery">Delivery</option>
                <option value="Farm">Farm</option>
                <option value="App">App</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Page</Form.Label>
              <Form.Control
                as="textarea"
                required
                onChange={(e) => setquestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                onChange={(e) => setanswer(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`${Baseurl}api/v1/faqs/${id}`);
      Store.addNotification({
        title: "",
        message: "deleted Successfully",
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
      getAllSupports();
    } catch (error) {}
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.2rem" }}
            >
              All Queries ( Total : {total} )
            </span>
            <button
              onClick={() => {
                setModalShow(true);
              }}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            >
              Create New
            </button>
          </div>

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : pageDescription?.length === 0 || !pageDescription ? (
            <Alert>Help Not Found</Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Page Title</th>
                    <th>Page Name</th>
                    <th>Page Description</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {pageDescription?.map((item, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>{item.question}</td>
                      <td>{item.answer}</td>
                      <td>{item.type}</td>
                      <td>{item.isActive ? "active" : "Resolve"}</td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(item._id)}
                          />
                        </span>
                      </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(item._id)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </section>
      </section>
    </>
  );
}

export default HOC(PageDescription)
