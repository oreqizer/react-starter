import { Record, List, fromJS } from 'immutable';

import { SUCCESS, LOADING } from '../../consts/asyncConsts';

// TODO:
// a very simplified example. no error actions

export const FETCH = 'todo/FETCH';
export const FETCH_SUCCESS = 'todo/FETCH_SUCCESS';

export const CREATE = 'todo/CREATE';
export const CREATE_SUCCESS = 'todo/CREATE_SUCCESS';

export const EDIT = 'todo/EDIT';
export const DELETE = 'todo/DELETE';

const InitialState = new Record({
  list: new List(),
  state: null,
});

export default function todoReducer(state = new InitialState(), action) {
  if (!(state instanceof InitialState)) return new InitialState(fromJS(state));

  switch (action.type) {
    case FETCH:
    case CREATE:
      return state
        .setIn(['state'], LOADING);

    case FETCH_SUCCESS:
      return state
        .setIn(['list'], new List(action.todos))
        .setIn(['state'], SUCCESS);

    case CREATE_SUCCESS:
      return state
        .updateIn(['list'], list => list.push(action.text))
        .setIn(['state'], SUCCESS);

    case EDIT:
      return state
        .setIn(['list', action.id], action.text);

    case DELETE:
      return state
        .deleteIn(['list', action.id]);

    default:
      return state;
  }
}

export function fetchTodos() {
  return {
    type: FETCH,
  };
}

export function createTodo(text) {
  return {
    type: CREATE,
    text,
  };
}

export function editTodo(id, text) {
  return {
    type: EDIT,
    id,
    text,
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE,
    id,
  };
}
