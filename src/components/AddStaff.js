import React, { Component } from "react";
import {
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormGroup,
  Button,
  Form,
  FormFeedback,
} from "reactstrap";
import { DEPARTMENTS } from "../shared/staffs";

class AddStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      department: "",
      overTime: "",
      annualLeave: "",
      salary: "",
      image: "/assets/images/alberto.png",
      isModalOpen: false,
      touched: {
        name: false,
        doB: false,
        startDate: false,
        department: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this); //mở modal điền thông tin
    this.handleAddStaff = this.handleAddStaff.bind(this); //open modal
    this.handleSubmit = this.handleSubmit.bind(this); //submit form
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this); // input thông tin
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleAddStaff(event) {
    this.toggleModal();
    event.preventDefault();
  }
  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      touched: {
        ...this.state.touched,
        doB: true,
        name: true,
        startDate: true,
        department: true,
        salaryScale: true,
        annualLeave: true,
        overTime: true,
      },
    });
    const errors = this.validate(
      this.state.name &&
        this.state.doB &&
        this.state.startDate &&
        this.state.department &&
        this.state.salaryScale &&
        this.state.annualLeave &&
        this.state.overTime
    );
    if (errors.flag === true) {
      return;
    } else {
      const newStaff = {
        id: this.props.staffs.length,
        name: this.state.name,
        doB: this.state.doB,
        salaryScale: this.state.salaryScale,
        startDate: this.state.startDate,
        department: DEPARTMENTS.find(
          (department) => department.id === this.state.department
        ),
        annualLeave: this.state.annualLeave,
        overTime: this.state.overTime,
        image: this.state.image,
      };
      this.toggleModal();
      this.props.handleSubmit(newStaff);
      localStorage.setItem("store", JSON.stringify(newStaff));
      console.log(newStaff);
    }
  }

  validate(
    name,
    doB,
    startDate,
    department,
    salaryScale,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      department: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
      flag: false,
    };

    if (this.state.touched.name && name.length < 3)
      errors.name = "Tên nhiều hơn 2 ký tự";
    else if (this.state.touched.name && name.length > 30)
      errors.name = "Tên không quá 30 ký tự";
    if (this.state.touched.doB && doB === "") errors.doB = "Yêu cầu nhập";
    if (this.state.touched.startDate && startDate === "")
      errors.startDate = "Yêu cầu nhập";
    if (this.state.touched.startDate && department === "") {
      errors.department = "Bạn chưa chọn bộ phận";
    }

    if (this.state.touched.salaryScale && salaryScale === "") {
      errors.salaryScale = "Bạn chưa nhập hệ số lương";
    } 

    if (this.state.touched.annualLeave && annualLeave === "") {
      errors.annualLeave = "Bạn chưa nhập ngày nghỉ phép";
    }

    if (this.state.touched.overTime && overTime === "") {
      errors.overTime = "Bạn chưa nhập số ngày tăng ca";
    }

    if (
      name === "" ||
      doB === "" ||
      startDate === "" ||
      department === "" ||
      salaryScale === "" ||
      annualLeave === "" ||
      overTime === ""
    ) {
      errors.flag = true;
    }
    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate,
      this.state.department,
      this.state.annualLeave,
      this.state.salaryScale,
      this.state.overTime
    );
    return (
      <div>
        <Button color="primary" type="submit" onClick={this.handleAddStaff}>
          {" "}
          Thêm nhân viên mới{" "}
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Thêm nhân viên mới
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Tên</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  valid={errors.name === ""}
                  invalid={errors.name !== ""}
                  onBlur={this.handleBlur("name")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.name}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="doB">Ngày sinh</Label>
                <Input
                  type="date"
                  id="doB"
                  name="doB"
                  value={this.state.doB}
                  valid={errors.doB === ""}
                  invalid={errors.doB !== ""}
                  onBlur={this.handleBlur("doB")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.doB}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="startDate">Ngày vào công ty</Label>
                <Input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={this.state.startDate}
                  valid={errors.startDate === ""}
                  invalid={errors.startDate !== ""}
                  onBlur={this.handleBlur("startDate")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.startDate}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="department">Phòng ban</Label>
                <Input
                  type="select"
                  id="department"
                  name="department"
                  value={this.state.department}
                  valid={errors.department === ""}
                  invalid={errors.department !== ""}
                  onBlur={this.handleBlur("department")}
                  onChange={this.handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Dept01">Sale</option>
                  <option value="Dept02">HR</option>
                  <option value="Dept03">Marketing</option>
                  <option value="Dept04">IT</option>
                  <option value="Dept05">Finance</option>
                </Input>
                <FormFeedback>{errors.department}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="salaryScale">Hệ số lương</Label>
                <Input
                  type="number"
                  id="salaryScale"
                  name="salaryScale"
                  value={this.state.salaryScale}
                  valid={errors.salaryScale === ""}
                  invalid={errors.salaryScale !== ""}
                  onBlur={this.handleBlur("salaryScale")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.salaryScale}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                <Input
                  type="number"
                  id="annualLeave"
                  name="annualLeave"
                  value={this.state.annualLeave}
                  valid={errors.annualLeave === ""}
                  invalid={errors.annualLeave !== ""}
                  onBlur={this.handleBlur("annualLeave")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.annualLeave}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
                <Input
                  type="number"
                  id="overTime"
                  name="overTime"
                  value={this.state.overTime}
                  valid={errors.overTime === ""}
                  invalid={errors.overTime !== ""}
                  onBlur={this.handleBlur("overTime")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.overTime}</FormFeedback>
              </FormGroup>
              <Button type="submit" color="primary">
                Thêm
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default AddStaff;
