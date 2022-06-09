import {PureComponent} from 'react';
import { Props } from './type'
import { DrawerLayout } from "@components/drawer-layout";
import { AdminTransactionPage } from "@components/admin-transaction-page";
import { resolveActions } from './resolve-actions'
import { resolveColumns } from './resolve-columns'
import {Column, ContextAction} from "@components/list-page";

type State = {};

export class TransactionPage extends PureComponent<Props, State> {

  actions: ContextAction[]
  columns: Column<any>[]

  constructor(props : any) {
    super(props);
    const { type, filterAction, filterColumns , pageProps } = this.props;
    this.actions = resolveActions(
      type,
      pageProps,
      filterAction
    )
    this.columns = resolveColumns(
      type,
      pageProps,
      filterColumns
    )


  }

  render() {
    const { pageProps, title, content } = this.props;
    return (
      <AdminTransactionPage
        {...pageProps}
        title={title}
        columns={this.columns}
        actions={this.actions}
      >
        {
          ({ transaction, action, close, changeAction })=>(
            <DrawerLayout
              open={Boolean(transaction)}
              contents={content(transaction, pageProps)}
              tabvalue={action}
              handleClose={close}
              onSwap={changeAction}
              render={Boolean(transaction)}
              componentProps={{
                store: transaction
              }}
            />
          )
        }
      </AdminTransactionPage>
    );
  }
}
