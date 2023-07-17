import { Dispatcher } from 'flux';
import {PayloadSources} from "./constants/AppConstants.js";

class AppDispatcherClass extends Dispatcher {

  handleViewAction(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action,
    });
  }

  handleServerAction(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action,
    });
  }
}

const AppDispatcher = new AppDispatcherClass();

export default AppDispatcher;
