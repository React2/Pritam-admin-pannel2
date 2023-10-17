

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

const ContactDetailOffice = () => {
  const [modalShow, setModalShow] = useState(false);
  const [descModal, setDescModal] = useState(false);
  const [desc, setDesc] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [fullViewData, setfullViewData] = useState({});
  const [hideFulldata, setShowFullData] = useState(false);
  const [viewDescription, setViewDescription] = useState("");
  const [descShowModalForConsultancy,setdescShowModalForConsultancy]=useState(false)
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
        `${Baseurl}api/v1/admin/viewContactDetailsOffice`
      );
      setData(data.data);
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
     const [title, setTitle] = useState(editData?.title);
     const [mainImage, setMainImage] = useState("");
     const [description, setDescription] = useState(editData?.desc);
  
     const [mobileNumber, setmobileNumber] = useState(
       editData?.mobileNumber
     );
     const [email, setemail] = useState(
       editData?.email
     );
     const [address, setAddress] = useState(editData?.address)
     const [image,setImage]=useState("")
     const payload = {
       title,
       description,
       email,mobileNumber,address,
     
       
     };

  
     const postHandler = async (e) => {
       e.preventDefault();
       setSubmitLoading(true);
       console.log("payload", payload);
       try {
         const formdataforPost = new FormData();
         for (let key in payload) {
           formdataforPost.append(key, payload[key]);
         }

         const data = await axios.post(
           `${Baseurl}api/v1/admin/addContactDetailsOffice`,
           formdataforPost,
           Auth
         );
         const msg = data.data.message;
         console.log("checkmessages", msg);
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
         console.log("checkErrorMsg", msg);
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
     console.log("editid", id);
     const edithandler = async (e) => {
       e.preventDefault();
       setSubmitLoading(true);
       console.log("payload", payload);
       try {
         const fromData = new FormData()

          for (let key in payload) {
            fromData.append(key, payload[key]);
          }
         const data = await axios.put(
           `${Baseurl}api/v1/admin/updateContactDetailsOffice/${id}`,
           fromData,
           Auth
         );


         const msg = data.data.message;
         console.log("data",data.data)
         console.log("checkmessages", msg);
         Store.addNotification({
           title: "",
           message:"data has been updated",
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
         console.log("checkErrorMsg", msg);
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
           <Form onSubmit={edit ? edithandler : postHandler}>
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
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                 />
               </FloatingLabel>
             </Form.Group>
             <Form.Group className="mb-3">
               <Form.Label>mobile Number</Form.Label>
               <Form.Control
                 type="text"
                 value={mobileNumber}
                 onChange={(e) => setmobileNumber(e.target.value)}
               />
             </Form.Group>
             <Form.Group className="mb-3">
               <Form.Label>email </Form.Label>
               <Form.Control
                 type="text"
                 value={email}
                 onChange={(e) => setemail(e.target.value)}
               />
             </Form.Group>
             <Form.Group className="mb-3">
               <Form.Label>address</Form.Label>
               <Form.Control
                 type="text"
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
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

  function MyDescriptionModalForConsultancy(props) {
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
  function ShowFullDataModal(props) {
    console.log("props", fullViewData);
    return (
      <>
        <MyDescriptionModalForConsultancy
          show={descShowModalForConsultancy}
          onHide={() => setdescShowModalForConsultancy(false)}
        />
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              View Full Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="InfoBox">
              <>
                {fullViewData && (
                  <div className="mt-4">
                    <div className="multiple_Image">
                      {fullViewData?.eformImage && (
                        <img
                          src={fullViewData?.eformImage}
                          style={{
                            width: "100px",
                            maxWidth: "100px",
                            height: "100px",
                            maxHeight: "100px",
                          }}
                          alt=""
                        />
                      )}
                    </div>

                    <h2>contact Us form Privacy</h2>
                    <p>{fullViewData?.contactUsformPrivacy}</p>
                    <h2>E Title</h2>
                    <p>{fullViewData?.eTitle}</p>
                    <h2>E Description</h2>
                    <p>{fullViewData?.eDesc}</p>
                    <h2>E formPrivacy</h2>
                    <p>{fullViewData?.eformPrivacy}</p>

                    <h1 style={{ margin: "20px auto", width: "50%" }}>
                      description Section
                    </h1>
                    {fullViewData?.description?.map((item) => (
                      <>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </>
                    ))}
                    <div style={{ width: "100%", margin: "40px auto" }}>
                      <iframe
                        width="80%"
                        height="400"
                        src={fullViewData?.updateyoutubelink}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>
                    <div>
                      
                    </div>
              
                  </div>
                )}
              </>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyDescriptionModal show={descModal} onHide={() => setDescModal(false)} />
      <ShowFullDataModal
        show={hideFulldata}
        onHide={() => setShowFullData(false)}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "20px" }}
          >
            Staff Talented Type ( Total : {total} )
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
        </div>

        {data?.length === 0 || !data ? (
          <Alert>Not Create Yet !</Alert>
        ) : (
          <>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>mobileNumber</th>
                    <th>email</th>
                    <th>address</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img src={i.image} alt="" style={{ width: "100px" }} />
                      </td>
                      <td>{i.title} </td>
                      <td>
                        <button
                          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                          onClick={() => {
                            setDesc(i.description);
                            setDescModal(true);
                          }}
                        >
                          View
                        </button>
                      </td>
                      <td>{i.mobileNumber}</td>
                      <td>{i.email}</td>
                      <td>{i.address}</td>
                      <td>{i.createdAt?.substr(0, 10)} </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          />
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              setEditData(i);
                              setEdit(true);
                              setId(i._id);
                              setModalShow(true);
                            }}
                          ></i>
                        </span>
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

export default HOC(ContactDetailOffice);
