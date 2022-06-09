import axios from 'axios';

const path = '/account/profile';

export class Request {

  run = (data: Record<string, any>) => {
    const formData = new FormData();
    Object.keys(data).forEach(name=>formData.append(name, data[name]));
    return axios.post(path, formData).then(({data})=>{
      return data as Record<'profile' | 'user', any>
    })
  }

}
