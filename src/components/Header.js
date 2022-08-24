import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md" className="bg-primary">
          <div className=" container">
            <div className ="row">
            <div className ="col col-10 col-md-3 col-lg-1">
            <NavbarBrand className="mr-auto">
              {" "}
              <NavLink className="nav-link" to="/Home">
                <i class="fa fa-vine" aria-hidden="true"></i>
              </NavLink>
            </NavbarBrand>
           
            </div>
            <div className ="col col-2 col-md-9 col-lg-11">
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/StaffList">
                    <span className="fa fa-users fa-lg"></span> Nhân Viên
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/department">
                    <span className="fa fa-id-card fa-lg"></span> Phòng Ban
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/salary">
                    <span className="fa fa-money fa-lg"></span> Bảng Lương
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            </div>
            </div>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}
export default Header;
