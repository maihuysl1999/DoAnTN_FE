import { ALERT } from "./actionTypes";
import { CLEAR_DAPP_STATE } from "./actionTypes";
import { CURRENT_DAPP } from "./actionTypes";
import {
    GET_DAPPS,
    GET_DAPPS_SUCCESSFUL,
    CREATE_DAPP,
    CREATE_DAPP_SUCCESSFUL,
    SELECTED_NODE,
    STEP1_DATA,
    STEP2_ENTITIES,
    STEP2_RELATIONSHIPS,
    STATE_CONNECTING_ENTITY,
    GET_DAPP_BY_ID_SUCCESSFUL,
    GET_DAPP_BY_ID,
} from "./actionTypes";

const initial_state = {
    list_dapps: null,
    list_user_network: [],
    step1Data: {
        dapp_name: "",
        dapp_description: "",
        dapp_logo: "",
        network_id: "",
        encryption_type: "",
    },
    step2Entities: [],
    step2Relationships: [],
    selected: null,
    isConnectingEntity: false,
    current_dapp: null,
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case GET_DAPPS_SUCCESSFUL:
            return { ...state, list_dapps: action.payload };
        case CREATE_DAPP_SUCCESSFUL:
            return { ...state };
        case SELECTED_NODE:
            return { ...state, selected: action.payload };
        case STEP1_DATA:
            return { ...state, step1Data: action.payload };
        case STEP2_ENTITIES:
            return { ...state, step2Entities: action.payload };
        case STEP2_RELATIONSHIPS:
            return { ...state, step2Relationships: action.payload };
        case ALERT:
            return { ...state, alert: action.payload };
        case CURRENT_DAPP:
            return { ...state, current_dapp: action.payload };
        case STATE_CONNECTING_ENTITY:
            return { ...state, isConnectingEntity: action.payload };
        case CLEAR_DAPP_STATE:
            return { ...initial_state };
        case GET_DAPP_BY_ID_SUCCESSFUL:
            return { ...state, current_dapp: action.payload };
        default:
            return { ...state };
    }
};

export default reducer;

export const dappActions = {
    getDApps: () => ({ type: GET_DAPPS }),
    getDAppsSuccessful: (params) => ({ type: GET_DAPPS_SUCCESSFUL, payload: params }),
    createDApp: (body) => ({ type: CREATE_DAPP, payload: body }),
    createDAppsSuccessful: (params) => ({ type: CREATE_DAPP_SUCCESSFUL, payload: params }),
    getDappById: (params) => ({ type: GET_DAPP_BY_ID, payload: params }),
    getDappByIdSuccessful: (params) => ({ type: GET_DAPP_BY_ID_SUCCESSFUL, payload: params }),
};
