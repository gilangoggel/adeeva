import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { loadPage as resolve } from './scripts/load-page'
import { GlobarStoreProvider } from './provider/globar-store-provider'
import { SnackbarProvider } from 'notistack'
import './main.scss'

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
  console.log('page loaded')
})
