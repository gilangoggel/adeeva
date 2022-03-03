export class Storage {
  name: string = "";
  payload: null | Record<string, any> = null;
  constructor(name: string) {
    this.name = name;
  }
  setdata = (payload: Record<string, any>) => {
    this.payload = payload;
    window.localStorage.setItem(this.name, JSON.stringify(payload));
  };

  remove = () => {
    window.localStorage.removeItem(this.name);
  };

  getdata = () => {
    const val = window.localStorage.getItem(this.name);
    if (val) {
      this.payload = JSON.parse(val);
    }
  };
}

export {};
