import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
function Contact() {






  const [contacts, setContacts] = useState([]);

  const notify = () => toast("Contact has been saved!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const notify1 = () => toast("Are you sure to delete this", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

 
  const {handleChange , handleBlur , handleSubmit  ,  values , errors , touched } = useFormik({
   initialValues:{
    fullname:'',
    email:'',
    contact:'',
   }, 
   validationSchema: Yup.object({
    fullname:Yup.string().min(4,'please provide atleast 4 characters').max(15,'please provide 15 characters at max ').required('Please fill fullname').trim(),
    email:Yup.string().required('Please fill email').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please provide valid email').trim(),
    contact:Yup.string().matches(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/ ,'please provide valid number (+92-xxxxxxxx)').required('Please fill contact field').trim(),
   }), 
   onSubmit:(vals)=>{
    let newContact = {
      ...vals,
      id:Date.now()
    }

    contacts.push(newContact)
    localStorage.setItem('contact', JSON.stringify(contacts));
    notify();
   }, 
  });



  useEffect(() => {
    let storedContacts = localStorage.getItem('contact');
    storedContacts = JSON.parse(storedContacts);
    if (storedContacts != null) {
      setContacts(storedContacts);
    }
  }, []);


  const handleDelete = (id)=>{
    notify1();
    let contactArr = JSON.parse(localStorage.getItem('contact'));
    const filteredArr = contactArr.filter((c)=>c.id != id);
    localStorage.setItem('contact', JSON.stringify(filteredArr));
  }


  return (
    <div className='container'>
      <form className="row g-3 py-5 w-50" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.fullname} className="form-control" id="fullName"  name='fullname'/>
          <p className='text-danger'><small>{touched.fullname ? errors.fullname:null}</small></p>
        </div>
        <div className="col-md-12">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.email} className="form-control" id="email" name='email' />
          <p className='text-danger'><small>{touched.email?errors.email:null}</small></p>
        </div>
        <div className="col-md-12">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.contact} className="form-control" id="contact" name='contact' />
          <p className='text-danger'><small>{touched.contact?errors.contact:null}</small></p>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Add a Contact</button>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">FullName</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {

          contacts.length < 1 ? <tr><td><p>No Data Found...</p></td></tr> :
          contacts.map((c, idx)=><tr key={idx}>
            <th scope="row">{idx+1}</th>
            <td>{c.fullname}</td>
            <td>{c.email}</td>
            <td>{c.contact}</td>
            <td>
              <button className='btn btn-danger me-2' onClick={()=>handleDelete(c.id)}><i className="bi bi-trash"></i></button>
              <Link to={`/edit/${c.id}`} className='btn btn-warning me-2'><i className="bi bi-pencil-square"></i></Link>
              <a href={`tel:${c.contact}`} className='btn btn-success me-2'><i className="bi bi-telephone-forward"></i></a>
            </td>
          </tr>)
            
          }
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  )
}

export default Contact