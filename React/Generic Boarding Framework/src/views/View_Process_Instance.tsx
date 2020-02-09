import * as React from "react";
import { ProcessInstance } from "../backend/ts/common_define";
import { get_process_instance } from "../backend/ts/database";
import { Typography, IconButton } from "@material-ui/core";
import Timeline from "../components/Process_timeline";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface View_Process_State {
  process?: ProcessInstance;
}
interface View_Process_Params {
  process_instance_name: string;
  user_name: string;
}
//TODO: Change to functional component
class View_Process extends React.Component {
  props: RouteComponentProps<View_Process_Params>;
  state: View_Process_State;

  constructor(props: RouteComponentProps<View_Process_Params>) {
    super(props);

    this.props = props;
    this.state = {};
  }
  componentDidMount() {
    get_process_instance(
      this.props.match.params.process_instance_name,
      this.props.match.params.user_name
    ).then(value => {
      this.setState({ process: value });
    });
  }

  render() {
    if (this.state.process !== undefined) {
      return (
        <div>
          <IconButton
            component={Link}
            to="/View_All_Process_Instances"
            color="inherit"
          >
            <ArrowBackIosIcon /> Go back
          </IconButton>

          <Timeline process={this.state.process} />
        </div>
      );
    } else return <Typography>Loading...</Typography>;
  }
}

export default View_Process;
