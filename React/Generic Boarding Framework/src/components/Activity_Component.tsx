import * as React from "react";
import { ArrayHelpers, FormikProps } from "formik";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Activity } from "../backend/ts/common_define";
import { Chip, Tooltip, Zoom } from "@material-ui/core";
import GetJSONModal from "./Get_JSON_Modal";

interface Activity_Component_Props {
  prefix: string;
  activity: Activity;
  index: number;
  classes: Record<any, string>;
  arrayHelpers?: ArrayHelpers;
  amountOfActivities?: number;
  formikProps: FormikProps<any>;
  onToggleDrawer?: Function;
}

function Activity_Component({
  prefix,
  activity,
  index,
  classes,
  arrayHelpers,
  amountOfActivities,
  formikProps,
  onToggleDrawer
}: Activity_Component_Props) {
  return (
    <Paper className={classes.paper}>
      <Grid container justify="center">
        <TextField
          autoComplete="off"
          name={`${prefix}title`}
          className={classes.textField}
          label="Activity Title"
          margin="normal"
          variant="outlined"
          type="text"
          required
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          value={
            activity.title.length === 1
              ? activity.title.toUpperCase()
              : activity.title
          }
        />
        <TextField
          name={`${prefix}description`}
          id="outlined-basic"
          className={classes.textField}
          label="Description"
          margin="normal"
          multiline
          rows="3"
          variant="outlined"
          type="text"
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          value={activity.description}
        />
        <Autocomplete
          multiple
          freeSolo
          onChange={(_, val) =>
            formikProps.setFieldValue(`${prefix}possible_states`, val)
          }
          defaultValue={activity.possible_states}
          onBlur={formikProps.handleBlur}
          className={classes.textField}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={params => (
            <TextField
              {...params}
              onKeyPress={e => {
                //disable submit on enter as enter is used to create chips
                if (e.key === "Enter") e.preventDefault();
              }}
              fullWidth
              name={`${prefix}possible_states`}
              label="Possible States"
              margin="normal"
              variant="outlined"
              type="text"
            />
          )}
        />
        <Grid container style={{ flexGrow: 1 }}>
          <Grid item xs={4}>
            <GetJSONModal
              fieldName={`${prefix}automationSettings`}
              setFunc={formikProps.setFieldValue}
              btnClass={classes.button}
              startText={
                Object.keys(activity.automationSettings).length === 0 &&
                activity.automationSettings.constructor === Object
                  ? ""
                  : JSON.stringify(activity.automationSettings, undefined, 4)
              }
            />
          </Grid>
          {arrayHelpers !== undefined &&
            amountOfActivities !== undefined &&
            onToggleDrawer !== undefined && (
              <Grid item xs={4}>
                <Grid container justify="center">
                  <Tooltip
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}
                    title="Add activity from activity templates"
                  >
                    <span>
                      <IconButton
                        className={classes.button}
                        aria-label="add"
                        color="default"
                        onClick={onToggleDrawer(true, index)}
                      >
                        <PostAddIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}
                    title="Add new activity"
                  >
                    <IconButton
                      className={classes.button}
                      aria-label="add"
                      color="default"
                      onClick={() =>
                        arrayHelpers.insert(index + 1, new Activity())
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}
                    title="Remove activity"
                  >
                    <span>
                      <IconButton
                        className={classes.button}
                        disabled={amountOfActivities < 2}
                        aria-label="remove"
                        color="default"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            )}
          <Grid item xs={4}>
            {arrayHelpers !== undefined && amountOfActivities !== undefined ? (
              <Grid container justify="flex-end">
                <Tooltip
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 300 }}
                  title="Move up"
                >
                  <span>
                    <IconButton
                      className={classes.button}
                      disabled={index === 0}
                      aria-label="remove"
                      color="default"
                      onClick={() => arrayHelpers.move(index, index - 1)}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 300 }}
                  title="Move down"
                >
                  <span>
                    <IconButton
                      className={classes.button}
                      disabled={index === amountOfActivities - 1}
                      aria-label="remove"
                      color="default"
                      onClick={() => arrayHelpers.move(index, index + 1)}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Activity_Component;
