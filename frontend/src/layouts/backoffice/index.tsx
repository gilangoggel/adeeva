import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const sx = {
  width: "100vw",
  overflow: "hidden",
  display: "flex",
  "& > div": {
    height: "100%",
  },
  "& > .sidebar": {
    width: ["100%", "40%", "40%", "15%"],
    borderRight: "solid 1px",
    borderColor: "#f2f2f2",
  },
  "& > .content-wrap": {
    display: "flex",
    overflowY: "auto",
    width: ["100%", "60%", "60%", "85%"],
    "& > .outlet": {
      flex: 1,
      minHeight: "200vh",
    },
    "& > .page-info": {
      width: ["30%", "30%", "30%", "25%"],
    },
  },
};

type State = {
  contentHeight: number;
};

export class Backoffice extends React.Component<any, State> {
  headerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.headerRef = React.createRef<HTMLDivElement>();
    this.state = {
      contentHeight: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.setupContentHeight);
    this.setupContentHeight();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setupContentHeight);
  }

  setupContentHeight = () => {
    const header = this.headerRef.current;
    if (header) {
      this.setState({
        contentHeight: window.innerHeight - header.clientHeight,
      });
    }
  };

  render() {
    return (
      <>
        <Header ref={this.headerRef} />
        {this.state.contentHeight ? (
          <Box
            style={{
              height: this.state.contentHeight,
            }}
            sx={sx}
            component="main"
          >
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="content-wrap">
              <div className="outlet">
                <Outlet />
              </div>
              <div className="page-info">
                <h1>Page info</h1>
              </div>
            </div>
          </Box>
        ) : null}
      </>
    );
  }
}
