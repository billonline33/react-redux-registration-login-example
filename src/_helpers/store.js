import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const enhancers=[];
const loggerMiddleware = createLogger();

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.devToolsExtension;
  
    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
}
  
const composeEnhancers=compose( applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ), ...enhancers);

export const store = createStore(
    rootReducer,
    composeEnhancers
);