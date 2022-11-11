import React, {Component} from "react";
import Icon from "./Icon";

export default class Button extends Component<any, any> {
    static STYLE_PRIMARY: string= "primary";
    static STYLE_SECONDARY: string= "secondary";
    static STYLE_SUCCESS: string= "success";
    static STYLE_DANGER: string= "danger";
    static STYLE_WARNING: string= "warning";
    static STYLE_INFO: string= "info";
    static STYLE_LIGHT: string= "light";
    static STYLE_DARK: string= "dark";
    static STYLE_LINK: string= "link";

    constructor(props: any) {
        super(props);
    }

    render() {
        const style = this.props.style !== undefined ? this.props.style : "secondary";
        const visible = this.props.visible === undefined ? "" : this.props.visible ? "" : " d-none";
        const className = this.props.className ? " " + this.props.className : "";

        return (
            <button type="button" className={`button btn btn-${style}${visible}${className}`} onClick={this.props.onAction}>
                <div className="button__icon">
                    {this.props.icon === undefined ? "" : <Icon name={this.props.icon} /> }
                </div>
                <div>{this.props.label || ""}</div>
            </button>
        )
    }
}
