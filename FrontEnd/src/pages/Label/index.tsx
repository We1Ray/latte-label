import React, { useState } from "react";
import {
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import lattek from "../../assets/images/Lattek.png";

import List from "./List";
import Group from "pages/Group";
import { Link } from "react-router-dom";
import SystemFunc from "resource/methods/SystemFunc";

const ProjectList = () => {
  document.title = "Lattek - Label Image";
  const [activeTab, setActiveTab] = useState<"project" | "group">("project");

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Row>
          <div className="col-auto">
            <div className="avatar-lg" />
          </div>
          <div className="col-auto">
            <div className="avatar-md">
              <p />
              <img src={lattek} className="img-thumbnail rounded-circle" />
            </div>
          </div>

          <div className="col-auto">
            <div className="p-4">
              <p />
              <h1 className="text-white mb-1">Lattek LABEL</h1>
            </div>
          </div>
        </Row>
        <Button
          style={{
            position: "absolute",
            right: 30,
            backgroundColor: "gray",
            border: "none",
          }}
          onClick={() => SystemFunc.setUser_Token("")}
        >
          <Link to="/logout" className="dropdown-item">
            <i
              className="mdi mdi-logout text-white fs-24"
              style={{
                position: "absolute",
                transform: "translateY(-50%)",
              }}
              title="Logout"
            />
          </Link>
        </Button>
      </div>

      <Card>
        <CardBody>
          <div role="tabpanel">
            <Nav tabs justified>
              <NavItem>
                <NavLink
                  style={
                    activeTab === "project" ? { backgroundColor: "gray" } : {}
                  }
                  onClick={() => {
                    setActiveTab("project");
                  }}
                >
                  <a style={activeTab === "project" ? { color: "white" } : {}}>
                    專案
                  </a>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={
                    activeTab === "group" ? { backgroundColor: "gray" } : {}
                  }
                  onClick={() => {
                    setActiveTab("group");
                  }}
                >
                  <a style={activeTab === "group" ? { color: "white" } : {}}>
                    群組
                  </a>
                </NavLink>
              </NavItem>
            </Nav>
            <br />
            <TabContent activeTab={activeTab}>
              <TabPane tabId="project" role="tabpanel">
                <List />
              </TabPane>
              <TabPane tabId="group" role="tabpanel">
                <Group />
              </TabPane>
            </TabContent>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ProjectList;
