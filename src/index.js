import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// react-query library
import { QueryClient, QueryClientProvider } from "react-query";

// i18n
import { I18nextProvider } from "react-i18next";
import i18next from "i18n";

// store
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "store";

// css
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/index.css";

// setup query client (react-query)
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <PersistGate
            loading="loading.................."
            persistor={persistor}
          >
            <Suspense fallback="loading...">
              <App />
            </Suspense>
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
