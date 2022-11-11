import React, {Component} from "react";

interface InputProps {
    name: string,
    value: any,
    onChange: Function,
    placeholder: string,
    invalid: string | null,
    readonly : boolean,
}

export default class Input extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const visible = this.props.visible === undefined ? "" : this.props.visible ? "" : " d-none";
        const className = this.props.className ? " " + this.props.className : "";
        const invalid = this.props.invalid ? " is-invalid" : "";

        if (this.props.readonly) {
            return <span className={`input-read ${visible}`}>{this.props.value || ""}</span>
        } else {
            return <input name={this.props.name || ""} value={this.props.value || ""} onChange={this.props.onChange || null} onBlur={this.props.onBlur || null}
                   className={`input-slim${className}${invalid}${visible}`} placeholder={this.props.placeholder || ""} />
        }
    }
}
