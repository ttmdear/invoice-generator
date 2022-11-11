import React, {ChangeEvent, Component} from "react";

interface InputProps {
    name: string,
    value: any,
    onChange: Function,
    placeholder: string,
    invalid: string | null,
    readonly : boolean,
}

export default class Icon extends Component<any, any> {
    static ICON_DELETE: string = "bi bi-trash";
    static ICON_PLUS: string = "bi bi-plus-circle-fill";
    static ICON_PRINTER: string = "bi bi-printer";
    static ICON_SAVE: string = "bi bi-save";
    static ICON_ARROW_UP: string = "bi bi-arrow-up-short";
    static ICON_ARROW_DOWN: string = "bi bi-arrow-down-short";
    static ICON_NEW: string = "bi bi-pencil-fill";

    render() {
        const name = this.props.name === undefined ? "" : this.props.name;
        const visible = this.props.visible === undefined ? "" : this.props.visible ? "" : " d-none";
        const className = this.props.className ? " " + this.props.className : "";

        return (
            <i className={`app__icon ${name}${visible}`} onClick={this.props.onClick} />
        );
    }
}
