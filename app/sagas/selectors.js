export const getNetworkStatus = state => state.network.status;
export const getNetworkIsConnectedAndHasChecked = state =>
  state.network.hasCheckedStatus && state.network.connected;
