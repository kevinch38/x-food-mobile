import { error, success, loading } from '../slices/uiSlice';

const asyncMiddlewareAction =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        const { payload } = action;
        if (action.type.endsWith('/pending')) {
            dispatch(loading());
        }
        if (action.type.endsWith('/rejected')) {
            dispatch(error(payload));
        }
        if (action.type.endsWith('/fulfilled')) {
            dispatch(success());
        }

        return next(action);
    };

export default asyncMiddlewareAction;
