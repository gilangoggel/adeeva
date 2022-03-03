import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import { tokenStorage } from "./storage-instances";

const host = "http://localhost:3333/api/v1";

export class Api<T extends Record<string, any> = Record<string, any>> {
  uri: string = "";
  method: "get" | "post" | "put" | "delete";

  loading = false;
  error: Record<string, any> | null = null;
  response: T | null = null;
  withFile: boolean = false;

  enableFile = () => {
    this.withFile = true;
  };

  setLoading = (v: boolean) => {
    this.loading = v;
  };
  setError = (error: any) => {
    this.error = error;
  };
  setResponse = ({ data }: any) => {
    this.response = data;
  };

  constructor(path: string, method: Api["method"] = "get") {
    this.uri = path;
    this.method = method;
    makeObservable(this, {
      loading: observable,
      response: observable,
      error: observable,
      setError: action,
      setResponse: action,
      setLoading: action,
      reset: action,
    });
  }

  updateUri = (uri: string) => {
    this.uri = uri;
  };

  resolveUri = () => {
    return `${host}/${this.uri}`;
  };

  dispatch = (payload: Record<string, any> = {}) => {
    const uri = this.resolveUri();
    tokenStorage.getdata();
    const bearer = tokenStorage.payload;
    if (bearer) {
      console.log("Bearer : ", bearer);
      axios.defaults.headers = {
        // @ts-ignore
        Authorization: `Bearer ${bearer.token}`,
      };
    }

    const makeLoading = () => this.setLoading(true);
    const makeUnLoading = () => this.setLoading(true);
    const onResolved = (response: any) => {
      this.setResponse(response);
      makeUnLoading();
    };
    const onRejected = (error: any) => {
      this.setError(error);
    };
    makeLoading();
    if (this.method === "get") {
      axios
        .get(uri, {
          params: payload,
        })
        .then(onResolved)
        .catch(onRejected);
      return;
    }
    if (this.withFile) {
      const formdata = new FormData();
      Object.keys(payload).forEach((k) => {
        formdata.set(k, payload[k]);
      });
      const promise = axios[this.method](uri, formdata);
      promise.then(onResolved).catch(onRejected);
      return;
    }
    const promise = axios[this.method](uri, payload);
    promise.then(onResolved).catch(onRejected);
  };

  reset = () => {
    this.response = null;
  };
}

export {};
