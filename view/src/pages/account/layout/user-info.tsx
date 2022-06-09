import {Box, Avatar} from "@mui/material";
import { UserChat } from '@components/features/chat'
import {observer} from "mobx-react";
import {useAuth} from "@hooks/use-auth";

const sx = {
  display : 'flex',
  p:1,
  alignItems: 'center',
  '& .name-container':{
    px:1
  }
}

export const UserInfo = observer( () => {
  const user= useAuth();
  console.log(user.picture)
  return (
    <div>
      <Box sx={sx}>
        <Avatar src={user.picture}>
          {
            user.name[0]
          }
        </Avatar>
        <div>
          <div className="name-container">
            <p className='font-poppins'>
              {user.name}
            </p>
            <small className='font-poppins'>
              {user.email}
            </small>
          </div>
        </div>
      </Box>
      <Box sx={{px:1}}>
        <UserChat/>
      </Box>
    </div>
  );
});
