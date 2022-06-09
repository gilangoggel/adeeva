import {MenuItem, TextField, TextFieldProps} from "@mui/material";
import {PureComponent, ReactNode} from 'react'


export type Props = Omit<TextFieldProps, 'onChange'> & {
  onChange(v: string) : void
}

export type Option = {
  value: any
  label: string | ReactNode
}

type ComponentProps = Props & {
  options: Option[]
}
type State = {
  selected: any | undefined
}

class EnumSelectField extends PureComponent<ComponentProps, State> {

  constructor(props: any) {
    super(props);
    const { value } = this.props;
    this.state = {
      selected: value??'__disabled'
    }
  }


  callback = (selected: any) => {
    const { onChange } = this.props;
    this.setState({
      selected
    }, ()=>{
      onChange(selected)
    })
  }

  handleChange = (e : any) => {
    const { options } = this.props
    const find = options.find(item=>item.value === e.target.value);
    if (find && find.value !== '__disabled'){
      this.callback(find.value);
    }
  }

  formHandlerListener = () => {
    this.setState({
      selected: "__disabled"
    })
  }
  componentDidMount() {
    document.querySelectorAll("form").forEach(item=>item.addEventListener('reset', this.formHandlerListener))
  }
  componentWillUnmount() {
    document.querySelectorAll("form").forEach(item=>{
      item.removeEventListener('reset', this.formHandlerListener)
    })
  }

  getAvailableOptions = () => {
    const { options } = this.props;
    return [
      {
        value: "__disabled",
        label: "Pilih salah satu"
      },
      ...options,
    ]
  }

  render() {
    const { selected : val } = this.state;
    const { options, ...props } = this.props
    return (
      <TextField {...props} select onChange={this.handleChange as any} value={val}>
        {
          this.getAvailableOptions().map((item)=>(
            <MenuItem disabled={item.value === "__disabled"} value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))
        }
      </TextField>
    );
  };
}

export function makeEnumSelectField(options: Option[] ){
  return (props: Props) => {
    return <EnumSelectField {...props as any} options={options}/>
  };
}
