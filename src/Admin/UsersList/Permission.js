/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Row, Col, Label, Container, Card, } from 'reactstrap';
import { Button } from '../../stories/Button';
import {
  getNormalHeaders,
  openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { URL, KEY } from '../../constants/defaultValues';
import Check from '../../Evaluator/Admin/EvalProcess/Pages/Check';
import { encryptGlobal } from '../../constants/encryptDecrypt';

const EditPermission = (props) => {

  const adminData = JSON.parse(localStorage.getItem('id'));
  const [clickedValue, setclickedValue] = useState({});
  const [selectedValue, setselectedValue] = useState([]);
  const navigate = useNavigate();
  const permissionList = ["All", "Dashboard", "Overall Schools", "PopUp", "Resource", "Latest News", "State Specific", "Support", "Mentors", "Teams", "Students", "Admins", "States", "Reports", "Bulk Email"];

  useEffect(() => {
    if (adminData && adminData.permission) {
      if (
        adminData.permission.split(',').length ===
        permissionList.length - 1 &&
        !adminData.permission.includes('All')
      ) {
        setselectedValue(permissionList);
      } else {
        setselectedValue(adminData.permission.split(','));
      }
    }
  }, []);

  useEffect(() => {
    if (clickedValue.name === 'All') {
      if (selectedValue.includes('All')) {
        setselectedValue(permissionList);
      } else {
        setselectedValue([]);
      }
    } else if (
      clickedValue.name &&
      clickedValue.name !== 'All' &&
      selectedValue.length === permissionList.length - 1 &&
      !selectedValue.includes('All')
    ) {
      setselectedValue(permissionList);
    } else if (clickedValue.name && clickedValue.name !== 'All') {
      setselectedValue(
        selectedValue?.filter((item) => item !== 'All')
      );
    }
  }, [clickedValue]);

  async function handleSubmit(value) {
    //  handleStates Api where value = permission //
    // where we can update the permission //
    if (value.permission === '') {
      value.permission = '-';
    }
    const data = {
      full_name: adminData.user.full_name,
      username: adminData.user.username,
      permission: value.permission
    };
    const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    const adminId = encryptGlobal(JSON.stringify(adminData.admin_id));
    await axios
      .put(
        `${URL.updateAdminStatus + '/' + adminId}`,
        data,
        axiosConfig
      )
      .then((response) => {
        if (response.status == 200) {
          openNotificationWithIcon(
            'success',
            'Permissions Updated Successfully'
          );
          navigate('/admins');
        }
      })
      .catch((err) => {
        return err.response;
      });
  }

  const handleclick = async () => {
    // where we can select  the permission //
    const value = { permission: '' };
    selectedValue.includes('All')
      ? (value.permission = selectedValue
        ?.filter((item) => item !== 'All')
        .toString())
      : (value.permission = selectedValue.toString());
    await handleSubmit(value);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Update Permission</h4>
          </div>
        </div>
        <Container>
          <Card className="m-3 p-3">
            <Row>
              <Label className="mb-2 text-info">Permission:</Label>
              <Check
                list={permissionList}
                value={selectedValue}
                setValue={setselectedValue}
                selValue={setclickedValue}
              />
            </Row>
          </Card>

          <Row>
            <Col className="col-xs-12 col-sm-6">
              <button
                type="button"
                onClick={() => navigate('/admins')}
                className="btn btn-secondary"
                style={{ marginLeft: "30px" }}
              >
                Discard
              </button>

            </Col>
            <Col className="submit-btn col-xs-12 col-sm-6 text-right">
              <Button

                label="Save"
                onClick={() => handleclick()}
                btnClass={'primary'}
                size="small"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default EditPermission;