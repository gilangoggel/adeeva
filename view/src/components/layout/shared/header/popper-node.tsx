import { Anchors, useHeader } from './context'
import {PropsWithChildren} from "react";
import { Popper, ClickAwayListener, Paper, Fade } from '@mui/material';


type Props = {
  name: keyof Anchors
}

export const PopperNode = ({ name, children }: PropsWithChildren<Props>) => {
  const [ getAnchor, _, close ] = useHeader()
  const anchor = getAnchor(name)
  return (
    <Popper
       anchorEl={ anchor }
       open={Boolean(anchor)}
       transition
       disablePortal
    >
      {
        ({TransitionProps}) => (
          <Fade {...TransitionProps}>
            <div>
              {
                ! anchor ? null :
                  <ClickAwayListener onClickAway={close}>
                    <Paper sx={{p:2, minWidth:300, borderRadius:5}} elevation={2}>
                      {children}
                    </Paper>
                  </ClickAwayListener>
              }
            </div>
          </Fade>
        )
      }
    </Popper>
  );
};
