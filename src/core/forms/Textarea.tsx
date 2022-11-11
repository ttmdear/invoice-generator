import React, {Component} from "react";

interface InputProps {
    name: string,
    value: any|null,
    onChange: Function,
    placeholder: string|null,
    invalid: string|null,
}

//export default class Input extends Component<InputProps, any> {
export default class Textarea extends Component<any, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        const visible = this.props.visible === undefined ? "" : this.props.visible ? "" : " d-none";
        const className = this.props.className ? " " + this.props.className : "";
        const invalid = this.props.invalid ? " is-invalid" : "";

        if (this.props.readonly) {
            return <span className={`${visible}`}>{this.props.value || ""}</span>
        } else {
            return <textarea name={this.props.name || ""} value={this.props.value || ""} onChange={this.props.onChange} onBlur={this.props.onBlur}
                             className={`input-slim --with-100${className}${invalid}${visible}`} placeholder={this.props.placeholder}/>
        }
    }
}
