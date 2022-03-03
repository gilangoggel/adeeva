// @flow
import * as React from "react";
import { Box, Button } from "@mui/material";
import { createRef, RefObject } from "react";
import { UseFormReturn } from "react-hook-form";

type State = {
  previewUrl: string;
  file: null;
};
type Props = {
  prevUrl?: string;
  form: UseFormReturn;
};

const sx = {
  display: "flex",
  borderRadius: "25px",
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  border: (t: any) => `solid 1px ${t.palette.primary.main}`,
  "& > button": {
    ml: "auto",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
};

export class UploadField extends React.Component<Props, State> {
  inputRef: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      previewUrl: this.props.prevUrl ?? "",
      file: null,
    };
    this.inputRef = createRef<HTMLInputElement>();
  }
  componentDidMount() {
    const { form } = this.props;
    form.register("image");
  }
  onClick = () => {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  };
  onInputChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0] as File;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.props.form.setValue("image", file);
        this.setState({
          previewUrl: reader.result as string,
        });
      });
      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <>
        <input
          onChange={this.onInputChange}
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          ref={this.inputRef}
        />
        {this.state.previewUrl ? (
          <Box
            component="img"
            src={this.state.previewUrl}
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : null}
        <Box sx={sx} onClick={this.onClick}>
          <Button variant="contained" onClick={this.onClick}>
            Upload foto
          </Button>
        </Box>
      </>
    );
  }
}
