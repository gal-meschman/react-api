import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/dCandidate";
import {
  withStyles,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    marging: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

export const DCandidtaes = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchAll());
  }, [dispatch]);
  const dCandidateList = useSelector((state) => state.dCandidate.list);
  
  const onDelete = id => {
    if(window.confirm('Are your sure to delete this candidate?'))
      dispatch(actions.Delete(id))
      addToast("Deleted successfully", { appearance: "info" });
  }
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <DCandidateForm {...({currentId, setCurrentId})} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Grop</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dCandidateList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.fullName}</TableCell>
                      <TableCell>{record.mobile}</TableCell>
                      <TableCell>{record.bloodGroup}</TableCell>
                      <TableCell>
                        <ButtonGroup variant='text'>
                          <Button>
                            <EditIcon color='primary' 
                            onClick={()=> {setCurrentId(record.id)}}
                            />  
                          </Button>
                          <Button>
                            <DeleteIcon color='secondary' 
                            onClick= {()=> onDelete(record.id)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default withStyles(styles)(DCandidtaes);
