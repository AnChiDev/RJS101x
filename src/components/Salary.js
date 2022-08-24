import React from "react";
import{Card, CardBody,CardText,CardTitle, CardFooter, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom';


function RenderSalary({staff}){
return(
    <div className ="container">
       <div className ="row">
        <Card style={{backgroundColor: "#E8E8E8"}}>
            <CardBody>
                <CardTitle tag="h6">Họ và tên: {staff.name}</CardTitle>
                <CardText>Mã nhân viên: {staff.id} </CardText>
                <CardText>Hệ số lương: {staff.salaryScale}  </CardText>
                <CardText>Số ngày làm thêm {staff.overTime} </CardText>
            </CardBody>
            <CardFooter className="text-center"> Lương:{Math.round(3000000 * `${staff.salaryScale}` + (`${staff.overTime}` * 200000))}</CardFooter>
        </Card>
   
       </div>
        </div>
)
}
const Salary =(props)=>{
    const StaffSalary= props.staffs.map((staff)=>{
        return(
            <div key={staff.id} className ="col col-12 col-md-6 col-lg-4 mt-4 mb-4">
                <RenderSalary staff={staff} />
            </div>
        )
    })
    return(
        <div className="container">
            <div className="row">             
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/StaffList">Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                    </Breadcrumb> 
                </div>
        <div className="row">
            {StaffSalary}
        </div>
    </div>
    )
}
export default Salary;
