import * as actionTypes from '../constants/actions';

export const initialState = {
  inSwapMode: false,
  webln: null,
  isFetching: false,
  isReconnecting: false,
  swapInfo: {
    base: null,
    quote: null,
    baseAmount: null,
    quoteAmount: null,
    keys: null,
    pair: null,
    address: null,
  },
  swapResponse: {
    response: {
      id: null,
    },
    success: true,
  },
  swapStatus: 'Waiting for confirmation...',

  invalidAddress: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REVERSE_SWAP_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.REVERSE_SWAP_RESPONSE:
      return {
        ...state,
        isFetching: false,
        swapResponse: {
          response: action.payload.response,
          success: action.payload.success,
        },
      };

    case actionTypes.INIT_REVERSE_SWAP:
      return {
        ...state,
        inSwapMode: true,
        webln: action.payload.webln,
        swapInfo: {
          ...state.swapInfo,
          base: action.payload.base,
          quote: action.payload.quote,
          baseAmount: action.payload.baseAmount,
          quoteAmount: action.payload.quoteAmount,
          keys: action.payload.keys,
          pair: action.payload.pair,
        },
      };

    case actionTypes.SET_REVERSE_SWAP_ADDRESS:
      return {
        ...state,
        swapInfo: {
          ...state.swapInfo,
          address: action.payload.address,
        },
        invalidAddress: action.payload.error,
      };

    case actionTypes.SET_REVERSE_SWAP_STATUS:
      return {
        ...state,
        swapStatus: action.payload,
      };

    case actionTypes.SET_IS_RECONNECTING:
      return {
        ...state,
        isReconnecting: action.payload,
      };

    case actionTypes.COMPLETE_REVERSE_SWAP:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
