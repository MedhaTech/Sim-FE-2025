/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect ,useState} from 'react';
import { Row, Col, Form, Label, FormGroup } from 'reactstrap';
import './style.scss';

// import Layout from '../../Admin/Layout';

// import { Button } from '../../stories/Button';

import axios from 'axios';
import Select from './Select';
import { getCurrentUser } from '../../helpers/Utils';

// import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { stateList,districtList } from '../../RegPage/ORGData';
import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import { useDispatch } from 'react-redux';
import {
    // getDistrictData,
    getStateData,
    getFetchDistData
} from '../../redux/studentRegistration/actions';
import { encryptGlobal } from '../../constants/encryptDecrypt';
const EditSchool = (props) => {
    const currentUser = getCurrentUser('current_user');
    const navigate = useNavigate();
    const listID = JSON.parse(localStorage.getItem('listId'));
    const listId =
    (history &&
        history.location &&
        history.location.item &&
        history.location.item) ||
    listID;
    // console.log(listId.district,"e");
    // useEffect(() => {
    //     if (listID) {
    //       formik.setFieldValue('state', listID.state);
    //       formik.setFieldValue('district', listID.district);
    //     }
    //   }, [listID]);
    const dispatch = useDispatch();
    const [districts, setDistricts] = useState([]);

    // where  listID = orgnization details //

   useEffect(()=>{
    setDistricts(
        districtList[
            
        listId.state
        ] || []
    );
   },[listId.state]);

    const inputDICE = {
        type: 'text',
          className:"form-control"
    };

    const filterCategory = ['ATL', 'Non ATL'];
    const categoryDataTn = [
        "Fully Aided-High School",
        "Fully Aided-Higher Secondary School",
        "Government-High School",
        "Government-Higher Secondary School",
        "Partially Aided-High School",
        "Partially Aided-Higher Secondary School",
        "Non ATL",
      ];

    const getInitialValues = (listId) => {
        const commonInitialValues = {
            organization_name: listId?.organization_name || '',
            organization_code: listId?.organization_code || '',
            unique_code: listId?.unique_code || '',
            pin_code: listId?.pin_code || '',
            city: listId?.city || '',
            district: listId?.district || '',  
            state: listId?.state || '',
            status: listId?.status || '',
            address: listId?.address || '',
            category: listId?.category || ''
        };
        if (listId?.district && districtList[listId?.state]?.includes(listId?.district)) {
            commonInitialValues.district = listId.district; // Set to valid district
        }
        return commonInitialValues;
    };
    

    const formik = useFormik({
        initialValues: getInitialValues(listId),

        validationSchema: Yup.object({
            organization_code: Yup.string()
                .matches(
                    /^[A-Za-z0-9/-]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim()
                .required('UDISE  Code is Required'),
            organization_name : Yup.string()
                .trim()
                .min(2, <span style={{ color: "red" }}>Please Enter School Name</span>)
                .matches(
                    /^[a-zA-Z0-9\s]+$/,
                    'Special characters are not allowed in the School Name'
                )
                .max(
                    40,
                    <span style={{ color: "red" }}>
                    School Name cannot be more than 40 characters
                    </span>
                )
                .required(<span style={{ color: "red" }}>Please Enter School Name</span>),
            unique_code: Yup.string()
                .matches(/^[A-Za-z0-9/-]*$/, 'Please enter only alphanumeric characters')
                .optional(),
            address: Yup.string()
                 .optional()
                .matches(/^[a-zA-Z0-9\s\-,/._-]+$/, 'Special characters are not allowed in the Address'),

            pin_code: Yup.string()
                .matches(/^[0-9]*$/, 'Please enter Numeric values')
                .min(6,"please enter valid pin code")
                 .optional(),
            district: Yup.string()
                // .matches(/^[aA-zZ\s]+$/, 'Invalid district')
                .required('District is required'),
            category: Yup.string()
                // .matches(/^[aA-zZ\s]+$/, 'Invalid category')
                .required('category is Required'),
            state: Yup.string().required('State is required'),
            // .optional()
            // .matches(/^[aA-zZ\s]+$/, 'Invalid State'),
           
            city: Yup.string().matches(
                /^[aA-zZ\s/^.*$/]+$/,
                'please enter valid city'
            )
             .optional()
        }),
        validateOnMount: true,  // This validates on mount to show errors even if fields aren't touched
        validateOnChange: true, // Validates on each field change
        validateOnBlur: true,   // Validates when fields are blurred
        onSubmit: (values) => {
            const body = {
                organization_code: values.organization_code,
                state: values.state,
                category: values.category,
                district: values.district,
                organization_name: values.organization_name,
                status: values.status
            };
            if (listId && listId.city !== values.city) {
                    body['city'] = values.city;
                }
            if (listId && listId !== values.address){
                    body['address'] = values.address;
                }
            if (listId && listId !== values.unique_code){
                    body['unique_code'] = values.unique_code;
                }
            if (listId && listId !== values.pin_code){
                    body['pin_code'] = values.pin_code;
                }
            const editId = encryptGlobal(
                JSON.stringify(listId.organization_id)
            );
            var config = {
                method: 'put',
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    '/organizations/' +
                    editId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: body
            };
            axios(config)
                .then((checkOrgRes) => {
                    if (checkOrgRes.status == 200) {
                        openNotificationWithIcon(
                            'success',
                            'School Update Successfully'
                        );
                        navigate('/institution');
                    }
                })
                .catch((err) => {
                    return err.response;
                });
        }
    });

//  console.log( formik.values
//     .district,"dist");
    // const handleStateChange = (event) => {
    //     const state = event.target.value;
    //     formik.setFieldValue("state", state);
    //     formik.setFieldValue("district", ""); 
    //     setDistricts(districtList[state] || []);
    //   };
    
    //   const handleDistrictChange = (event) => {
    //     formik.setFieldValue("district", event.target.value);
    //   };
      const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };
    
      const buttonStyle = {
        marginRight: '10px',
      };
    return (
        <div className="page-wrapper">
              <h3 className="m-2" 
        style={{ position: 'sticky', top: '70px', zIndex: 1000, padding: '10px',backgroundColor: 'white', display: 'inline-block' , color: '#fe9f43',fontSize:"14px" }}
        >Overall Schools
        </h3>
        <div className="content">
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        {/* <BreadcrumbTwo {...headingDetails} /> */}
                        <h3 className="mb-5">Edit Institutions Details</h3>

                        <div>
                        <Form onSubmit={formik.handleSubmit} isSubmitting >
                                <div className="create-ticket register-block">
                                        <Row  className="mb-3 modal-body-table search-modal-header">
                                            <Col md={4}>
                                                <Label
                                                    className="form-label"
                                                    htmlFor="organization_code"
                                                >
                                                    UDISE Code
                                                    <span required>*</span>
                                                </Label>
                                                <input
                                                    {...inputDICE}
                                                    id="organization_code"
                                                    name="organization_code"
                                                    placeholder="Please enter UDISE Code"
                                                    disabled="true"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .organization_code
                                                    }
                                                />
                                                { formik.errors
                                                    .organization_code ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {
                                                            formik.errors
                                                                .organization_code
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                    className="form-label"
                                                    htmlFor="state"
                                                >
                                                    State
                                                    <span required>*</span>

                                                </Label>
                                                <select
                                                      
                                                        name="state"
                                                        className="form-select"
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values.state
                                                        }

                                                        onChange={(e) => {
                                                            const selectedState =
                                                                e.target.value;

                                                            formik.setFieldValue(
                                                                'state',
                                                                selectedState
                                                            );
                                                            formik.setFieldValue(
                                                                'district',
                                                                ''
                                                            ); 
                                                        {console.log(selectedState,"state");}

                                                            setDistricts(
                                                                districtList[
                                                                selectedState
                                                                ] || []
                                                            );
                                                        }}
                                                    >
                                                        <option value="">
                                                            Select State
                                                        </option>
                                                        {stateList.map(
                                                            (state) => (
                                                                <option
                                                                    key={state}
                                                                    value={
                                                                        state
                                                                    }
                                                                >
                                                                    {state}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                {formik.errors.state ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {formik.errors.state}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                   className="form-label"
                                                    htmlFor="district"
                                                >
                                                    District
                                                    <span required>*</span>
                                                </Label>
                                                {/* <Col md={3}> */}
                                                <select
                                                       
                                                        name="district"
                                                       className="form-select"
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values
                                                                .district
                                                        }
                                                        onChange={(e) => {
                                                            const selectedDistrict =
                                                                e.target.value;
                                                            formik.setFieldValue(
                                                                'district',
                                                                selectedDistrict
                                                            );
                                                        {console.log(selectedDistrict,"district");}

                                                        }}
                                                    >
                                                        <option value="">
                                                            Select District
                                                        </option>
                                                        {districts.map(
                                                            (district) => (
                                                                <option
                                                                    key={
                                                                        district
                                                                    }
                                                                    value={
                                                                        district
                                                                    }
                                                                >
                                                                    {district}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                               
                                                {formik.errors.district ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {/* Current value : {listId?.district}<br/> */}
                                                        {formik.errors.district}
                                                    </small>
                                                ) : null}
                                            </Col>
                                           
                                           
                                        </Row>
                                        <Row className="mb-3 modal-body-table search-modal-header">
                                        {/* <Col md={4}>
                                                <Label
                                                   className="form-label"
                                                    htmlFor="category"
                                                >
                                                    category
                                                    <span required>*</span>
                                                </Label>
                                                    {' '}
                                                    <select
                            id="inputState"
              name="category"
                            className="form-select"
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                            onChange={
                                formik.handleChange
                            }
                          >
                            <option value="">Select Category</option>
                            {filterCategory.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>

                                                {formik.touched.category &&
                                                formik.errors.category ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {formik.errors.category}
                                                    </small>
                                                ) : null}
                                            </Col> */}
                                            {formik.values.state == "Tamil Nadu" ? (<Col md={4}>
                        <Label
                          // className="mb-2"
                          className="form-label"
                          htmlFor="category"
                        >
                          category
                          <span required>*</span>
                        </Label>
                        {/* <Col md={3}> */}{" "}
                        
                        <select
                          id="inputState"
                          name="category"
                          className="form-select"
                          onBlur={formik.handleBlur}
                          value={formik.values.category}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select Category</option>
                          {categoryDataTn.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {formik.errors.category ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.category}
                          </small>
                        ) : null}
                      </Col>) :(
                      <Col md={4}>
                        <Label
                          // className="mb-2"
                          className="form-label"
                          htmlFor="category"
                        >
                          category
                          <span required>*</span>
                        </Label>
                        {/* <Col md={3}> */}{" "}
                        
                        <select
                          id="inputState"
                          name="category"
                          className="form-select"
                          onBlur={formik.handleBlur}
                          value={formik.values.category}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select Category</option>
                          {filterCategory.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {formik.errors.category ? (
                          <small className="error-cls" style={{ color: "red" }}>
                            {formik.errors.category}
                          </small>
                        ) : null}
                      </Col>)}
                                            <Col md={4}>
                                                <Label
                                                    className="form-label"
                                                    htmlFor="organization_name"
                                                    // style={{ fontSize: 15 }}
                                                >
                                                    Institute/School Name
                                                    <span required>*</span>
                                                </Label>
                                                <input
                                                    {...inputDICE}
                                                    id="organization_name"
                                                    name="organization_name"
                                                    placeholder="Please enter Institute/School name"
                                                    onChange={(e) => {
                                                        let inputValue = e.target.value;
                                                        inputValue = inputValue.slice(0, 40);
                                                        formik.setFieldValue('organization_name', inputValue);
                                                      }}
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .organization_name
                                                    }
                                                />
                                                {formik.errors
                                                    .organization_name ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {
                                                            formik.errors
                                                                .organization_name
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                   className="form-label"
                                                    htmlFor="address"
                                                >
                                                    Address
                                                    {/* <span required>*</span> */}
                                                </Label>
                                                <input
                                                    {...inputDICE}
                                                    id="address"
                                                    name="address"
                                                    placeholder="Please enter Address"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.address
                                                    }
                                                />
                                                {formik.errors.address ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {formik.errors.address}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>

                                        <Row className="mb-3 modal-body-table search-modal-header">
                                        <Col md={4}>
                                                <Label
                                                   className="form-label"
                                                    htmlFor="pin_code"
                                                    // style={{ fontSize: 15 }}
                                                >
                                                    PinCode
                                                    {/* <span required>*</span> */}
                                                </Label>
                                                <input
                                                    {...inputDICE}
                                                    id="pin_code"
                                                    name="pin_code"
                                                    placeholder="Please enter PinCode"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.pin_code
                                                    }
                                                />
                                                {formik.errors.pin_code ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {formik.errors.pin_code}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        <Col md={4}>
                                                <Label
                                                   className="form-label"
                                                    htmlFor="unique_code"
                                                    // style={{ fontSize: 15 }}
                                                >
                                                    ATL Code
                                                    {/* <span required>*</span> */}
                                                </Label>
                                                <input
                                                    {...inputDICE}
                                                    id="unique_code"
                                                    name="unique_code"
                                                    maxLength={11}
                                                    placeholder="Please enter Atl Code"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .unique_code
                                                    }
                                                    // isDisabled={holdKey ? true : false}
                                                />
                                                {formik.errors.unique_code ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {
                                                            formik.errors
                                                                .unique_code
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                           
                                            <Col md={4}>
                                                <Label
                                                   className="form-label"
                                                    htmlFor="city"
                                                >
                                                    City
                                                </Label>
                                                <input
                                                    {...inputDICE}
                                                    id="city"
                                                    name="city"
                                                    placeholder="Please enter city"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.city}
                                                />
                                                {formik.errors.city ? (
                                                    <small className="error-cls" style={{color:"red"}}>
                                                        {formik.errors.city}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                </div>

                                <Row>
                        {/* <div style={buttonContainerStyle}>
                          <button type="submit"  className={`btn btn-warning  ${
                        !(formik.dirty && formik.isValid)
                          ? "default"
                          : "primary"
                      }`}
                      disabled={!(formik.isValid)} style={buttonStyle}>
                            Submit
                          </button>
                        
                          <button
                            onClick={() => navigate("/institution")}
                            type="button"
                            className="btn btn-secondary"
                            style={{ marginLeft: 'auto' }} 
                          >
                            Discard
                          </button>
                          </div> */}
                          <div style={buttonContainerStyle}>
  <button
    type="submit"
    className={`btn btn-warning ${
      !formik.dirty || !formik.isValid ? "default" : "primary"
    }`}
    disabled={!formik.dirty || !formik.isValid}
    style={buttonStyle}
  >
    Submit
  </button>

  <button
    onClick={() => navigate("/institution")}
    type="button"
    className="btn btn-secondary"
    style={{ marginLeft: 'auto' }}
  >
    Discard
  </button>
</div>

                      </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        </div>
    );
};

export default EditSchool;
