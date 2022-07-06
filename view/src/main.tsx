import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { loadPage as resolve } from './scripts/load-page'
import { GlobarStoreProvider } from './provider/globar-store-provider'
import { SnackbarProvider } from 'notistack'
import './main.scss'
import 'rsuite/styles/index.less';
import axios from "axios";

axios.defaults.withCredentials = true;

const create = createInertiaApp({
  resolve,
  setup({ el, App, props }) {
    render(
      <GlobarStoreProvider {...props}>
        <SnackbarProvider
          anchorOrigin={{
            horizontal: "right",
            vertical:"bottom"
          }}
        >
          <App {...props} />
        </SnackbarProvider>
      </GlobarStoreProvider>
      , el)
  }
})

// eslint-disable-next-line unicorn/prefer-top-level-await
void create.then(()=>{
  // console.log('page loaded')
})


declare module "@inertiajs/inertia"{

  export interface PageProps {
    [key: string] : unknown;
    auth: IUser
    admin: {
      id: number
      name: string
    }
  }

}
