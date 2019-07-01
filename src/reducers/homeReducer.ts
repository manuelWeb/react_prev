import IAction from '../constants/common/IAction';

export interface IHomeState {
    title: string
}

const initialState: IHomeState = {
    title: 'Home'
};

/**
 * Reducer pour le container Home.
 * @param state Etat du redecuder.
 * @param action Action passée au reducer.
 */
export function homeReducer(state: IHomeState = initialState, action: IAction<any>) { // FIXME typer l'action
    switch (action.type) {
        default:
            return state;
    }
}
