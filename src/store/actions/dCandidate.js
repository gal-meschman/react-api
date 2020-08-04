import api from "./api";

const Actions = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

const formateData = (data) => ({
  ...data,
  age: parseInt(data.age ? data.age : 0),
});

const fetchAll = () => (dispatch) => {
  api
    .dCandidate()
    .fetchAll()
    .then((res) => {
      dispatch({
        type: Actions.FETCH_ALL,
        payload: res.data,
      });
    })
    .catch(console.log);
};

const create = (data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .dCandidate()
    .create(data)
    .then((res) => {
      dispatch({ type: Actions.CREATE, payload: res.data });
      onSuccess();
    })
    .catch(console.log);
};

const update = (id, data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .dCandidate()
    .update(id, data)
    .then((res) => {
      dispatch({ type: Actions.UPDATE,
         payload: {id:id,...data} });
      onSuccess();
    })
    .catch(console.log);
};

const Delete = (id, onSuccess) => (dispatch) => {
  api
    .dCandidate()
    .delete(id)
    .then((res) => {
      dispatch({ type: Actions.DELETE,
         payload: id });
    })
    .catch(console.log);
};

export { Actions, fetchAll, create, update, Delete };
