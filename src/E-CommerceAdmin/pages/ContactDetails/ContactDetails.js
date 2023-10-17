

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

const ContactDetails = () => {
  const [modalShow, setModalShow] = useState(false);
  const [descModal, setDescModal] = useState(false);

  const [data, setData] = useState("");
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [viewDescription,setViewDescription]=useState("")
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
        `https://pritam-backend.vercel.app/api/v1/admin/viewContactDetails`
      );
      setData(data.data);
      console.log(data.data);
      setTotal(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/admin/DeleteContactDetails/${id}`,
        Auth
      );
      const msg = data.message;
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
   const [imageLoading, setImageLoading] = useState(false);
   const [uploaded, setUploaded] = useState(false);
     const [description, setDescription] = useState("");
     const [mobileNumber, setMobileNumber] = useState("");
     const [fb, setFb] = useState("");
     const [title, setTitle] = useState("");
     const [instagram, setInstagram] = useState("");
     const [linkedIn, setLinkedIn] = useState("");
     const [twitter, setTwitter] = useState("");
     const [mobileNumberDescription, setMobileNumberDescription] = useState("");
     const [emailId, setEmailId] = useState("");
     const [emailDescription, setEmailDescription] = useState("");
     const [whatAppchat, setWhatAppchat] = useState("");
     const [map, setMap] = useState("");
     const [contactType, setContactType] = useState("");
     const [whatAppchatDescription, setWhatAppchatDescription] = useState("");
     const [address, setAddress] = useState("");
     const [image, setImage] = useState("");
 
 
   
   const payload = {
     title,
     description,
     mobileNumber,
     fb,
     instagram,
     linkedIn,
     twitter,
     mobileNumberDescription,
     email:emailId,
     emailDescription,
     whatAppchat,
     map:"",
     contactType,
     address,
     image
   };


 
     const fromData = new FormData();

     console.log("payload", payload);
     for (let key in payload) {
       fromData.append(key, payload[key]);
    }
  

 
  //  console.log("typeof ",mainImage)

         
   const postHandler = async (e) => {
     e.preventDefault();
     
     setSubmitLoading(true);
     try {

       const data = await axios.post(
         `${Baseurl}api/v1/admin/addContactDetails`,
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
     <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
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
             <FloatingLabel>
               <Form.Control
                 type="file"
                 onChange={(e) => setImage(e.target.files[0], "eForm")}
               />
             </FloatingLabel>
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
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>

           <Form.Group className="mb-3">
             <Form.Label>Mobile Number</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={mobileNumber}
                 onChange={(e) => setMobileNumber(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>

           <Form.Group className="mb-3">
             <Form.Label>Facebook Id</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={fb}
                 onChange={(e) => setFb(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>Instagram Id</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={instagram}
                 onChange={(e) => setInstagram(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>LinkedIn Id</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={linkedIn}
                 onChange={(e) => setLinkedIn(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>twitter Id</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={twitter}
                 onChange={(e) => setTwitter(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>mobile Number Description</Form.Label>
             <FloatingLabel>
               <Form.Control
                 as="textarea"
                 style={{ height: "100px" }}
                 value={mobileNumberDescription}
                 onChange={(e) => setMobileNumberDescription(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>email</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={emailId}
                 onChange={(e) => setEmailId(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>email Description</Form.Label>
             <FloatingLabel>
               <Form.Control
                 as="textarea"
                 style={{ height: "100px" }}
                 onChange={(e) => setEmailDescription(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>what App chat</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={whatAppchat}
                 onChange={(e) => setWhatAppchat(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>map</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={map}
                 onChange={(e) => setMap(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>contact Type</Form.Label>
             <FloatingLabel>
               <Form.Control
                 type="text"
                 value={contactType}
                 onChange={(e) => setContactType(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>whatApp chat Description</Form.Label>
             <FloatingLabel>
               <Form.Control
                 as="textarea"
                 style={{ height: "100px" }}
                 value={whatAppchatDescription}
                 onChange={(e) => setWhatAppchatDescription(e.target.value)}
               />
             </FloatingLabel>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>Address</Form.Label>
             <FloatingLabel>
               <Form.Control
                 as="textarea"
                 style={{ height: "100px" }}
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
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
            <p className="desc"> {viewDescription} </p>
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
            Contact Details
          </span>
          <button
            onClick={() => {
              setEditData({});
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            {data?.length === 0 ? "Create New" : "Edit"}
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
              <p>{data.description}</p>

              <h4>mobile Number Description</h4>
              <p>{data?.mobileNumberDescription}</p>
              <h4>whatApp chat Description</h4>
              <p>{data?.whatAppchatDescription}</p>
              <h4>contact Type</h4>
              <p>{data?.contactType}</p>
              <h4>mobile Number Description</h4>
              <p>{data?.mobileNumberDescription}</p>
              <h4>email</h4>
              <p>{data?.email}</p>
              <h4>address</h4>
              <p>{data?.address}</p>
              <h4>Whats App Chat</h4>
              <p>{data?.whatAppchat}</p>

              <h4>Call Detail </h4>
              <p>{data.formCall}</p>

              <h4>FaceBook Id</h4>
              <p>{data?.fb}</p>

              <h4>Instagram Id </h4>
              <p>{data?.instagram}</p>

              <h4>LinkedIn</h4>
              <p>{data?.linkedIn}</p>

              <h4>Twitter</h4>
              <p>{data?.twitter}</p>
              <div>
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

export default HOC(ContactDetails);