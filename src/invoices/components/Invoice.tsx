import React, {ChangeEvent} from "react";
import Input from "../../core/forms/Input";
import {uuid} from "../../core/util/uuid";
import Textarea from "../../core/forms/Textarea";
import {ErrorList} from "../../core/util/ErrorList";
import InvoiceEntity from "../entities/InvoiceEntity";
import InvoiceItemEntity from "../entities/InvoiceItemEntity";
import Button from "../../core/forms/Button";
import Icon from "../../core/forms/Icon";
import {invoiceEmptyData} from "../../data/invoice-data";
import {invoiceService} from "../services/InvoiceService";

type InvoiceState = {
    invoice: InvoiceEntity,
    errors: any[],
    summary: SummaryItem[],
    printing: boolean
}

type SummaryItem = {
    vat: number,
    vatStr: string,
    valueNet: number,
    valueVat: number,
    valueGross: number,
}

export default class Invoice extends React.Component<any, InvoiceState> {
    private errorList: ErrorList = new ErrorList();

    constructor(props: object) {
        super(props);

        let invoice = invoiceService.loadFromStorage();

        if (!invoice) {
            invoice = invoiceEmptyData;
        }

        this.state = {
            invoice: invoice,
            printing: false,
            errors: [],
            summary: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleNew = this.handleNew.bind(this);
    }

    render() {
        return <div id="invoice" className="invoice">
            <div className="d-flex">
                Wystawiono dnia: <Input name="dateOfIssue" value={this.state.invoice.dateOfIssue}
                                        visible={this.isVisible("dateOfIssue")} onChange={this.handleChange} onBlur={this.handleOnBlur}
                                        placeholder="Data wystawienia" readonly={this.state.printing}/>
                <div className={this.visible("placeOfIssue")}>
                    , <Input name="placeOfIssue" value={this.state.invoice.placeOfIssue} onChange={this.handleChange} onBlur={this.handleOnBlur}
                             placeholder="Miejsce wystawienia" readonly={this.state.printing}/>
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <div className="col invoice__section-title d-flex">
                        Faktura VAT nr

                        <Input name="number" value={this.state.invoice.number} onChange={this.handleChange} onBlur={this.handleOnBlur}
                            className="ms-1 invoice__number-input" placeholder="Numer faktury"
                            readonly={this.state.printing}/>
                    </div>
                    <table>
                        <tbody>
                        <tr className={this.visible("dateOfSell")}>
                            <td>Data sprzedaży</td>
                            <td>
                                <Input name="dateOfSell" value={this.state.invoice.dateOfSell} onChange={this.handleChange} onBlur={this.handleOnBlur} readonly={this.state.printing}/>
                            </td>
                        </tr>
                        <tr className={this.visible("paymentMethod")}>
                            <td>Sposób zapłaty</td>
                            <td>
                                <Input name="paymentMethod" value={this.state.invoice.paymentMethod} onChange={this.handleChange} onBlur={this.handleOnBlur} readonly={this.state.printing}/>
                            </td>
                        </tr>
                        <tr className={this.visible("paymentDateStr")}>
                            <td>Termin płatności</td>
                            <td>
                                <Input name="paymentDateStr" value={this.state.invoice.paymentDateStr} onChange={this.handleChange} onBlur={this.handleOnBlur} readonly={this.state.printing}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="invoice__section-title">Sprzedawca</div>
                    <div className={this.visible("sellerName")}>
                        <Input name="sellerName" value={this.state.invoice.sellerName} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               className="--with-100" placeholder="Nazwa sprzedawcy" readonly={this.state.printing}/>
                    </div>
                    <div
                        className={`d-flex${!this.isVisible("sellerCity") && !this.isVisible("sellerStreetWithNumber") ? " d-none" : ""}`}>
                        <Input name="sellerCity" value={this.state.invoice.sellerCity}
                               visible={this.isVisible("sellerCity")} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               placeholder="Miejscowość" readonly={this.state.printing}/>,
                        <Input name="sellerStreetWithNumber" value={this.state.invoice.sellerStreetWithNumber}
                               visible={this.isVisible("sellerStreetWithNumber")} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               placeholder="Ulica i numer" readonly={this.state.printing}/>
                    </div>
                    <div className={this.visible("sellerPostCode")}>
                        <Input name="sellerPostCode" value={this.state.invoice.sellerPostCode}
                               onChange={this.handleChange} onBlur={this.handleOnBlur} placeholder="Kod pocztowy" readonly={this.state.printing}/>
                    </div>
                    <div className={`d-flex${this.visible("sellerNip")}`}>
                        <div>NIP:</div>
                        <Input name="sellerNip" value={this.state.invoice.sellerNip} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               className="ms-3" placeholder="NIP" readonly={this.state.printing}/>
                    </div>
                    <div className={`d-flex${this.visible("sellerCountry")}`}>
                        <div>Kraj:</div>
                        <Input name="sellerCountry" value={this.state.invoice.sellerCountry}
                               onChange={this.handleChange} onBlur={this.handleOnBlur} placeholder="Kraj" readonly={this.state.printing}/>
                    </div>
                    <div className={`d-flex${this.visible("sellerEmail")}`}>
                        <Input name="sellerEmail" value={this.state.invoice.sellerEmail} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               placeholder="E-mail" readonly={this.state.printing}/>
                    </div>
                    <div className={`d-flex${this.visible("sellerWWW")}`}>
                        <Input name="sellerWWW" value={this.state.invoice.sellerWWW} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               placeholder="WWW" readonly={this.state.printing}/>
                    </div>
                    <div className={`d-flex${this.visible("sellerFax")}`}>
                        <div>Fax:</div>
                        <Input name="sellerFax" value={this.state.invoice.sellerFax} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               placeholder="Fax" readonly={this.state.printing}/>
                    </div>
                    <div className={`d-flex${this.visible("sellerPhone")}`}>
                        <div>Tel.:</div>
                        <Input name="sellerPhone" value={this.state.invoice.sellerPhone} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               placeholder="Telefon" readonly={this.state.printing}/>
                    </div>
                    <div className={`mt-3 d-flex${this.visible("sellerAdditionalInformation")}`}>
                        <Textarea name="sellerAdditionalInformation"
                                  value={this.state.invoice.sellerAdditionalInformation} onChange={this.handleChange} onBlur={this.handleOnBlur}
                                  className="--height-100 --with-100" placeholder="Dodatkowe informacje"
                                  readonly={this.state.printing}/>
                    </div>
                </div>
                <div className="col">
                    <div className="invoice__section-title">Nabywca</div>
                    <div className={this.visible("buyerName")}>
                        <Input name="buyerName" value={this.state.invoice.buyerName} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               className="--with-100" placeholder="Nazwa nabywcy" readonly={this.state.printing}/>
                    </div>
                    <div
                        className={`d-flex${!this.isVisible("buyerCity") && !this.isVisible("buyerStreetWithNumber") ? " d-none" : ""}`}>
                        <Input name="buyerCity" visible={this.isVisible("buyerCity")}
                               value={this.state.invoice.buyerCity} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               placeholder="Miejscowość" readonly={this.state.printing}/>,
                        <Input name="buyerStreetWithNumber" visible={this.isVisible("buyerStreetWithNumber")}
                               value={this.state.invoice.buyerStreetWithNumber} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               placeholder="Ulica i numer" readonly={this.state.printing}/>
                    </div>
                    <div className={this.visible("buyerPostCode")}>
                        <Input name="buyerPostCode" value={this.state.invoice.buyerPostCode}
                               onChange={this.handleChange} onBlur={this.handleOnBlur} placeholder="Kod pocztowy" readonly={this.state.printing}/>
                    </div>
                    <div className={`d-flex${this.visible("buyerNip")}`}>
                        <div>NIP:</div>
                        <Input name="buyerNip" value={this.state.invoice.buyerNip} onChange={this.handleChange} onBlur={this.handleOnBlur}
                               className="ms-3" placeholder="NIP" readonly={this.state.printing}/>
                    </div>
                    <div className={`mt-3 d-flex${this.visible("buyerAdditionalInformation")}`}>
                        <Textarea name="buyerAdditionalInformation"
                                  value={this.state.invoice.buyerAdditionalInformation} onChange={this.handleChange} onBlur={this.handleOnBlur}
                                  className="--height-100 --with-100" placeholder="Dodatkowe informacje"
                                  readonly={this.state.printing}/>
                    </div>
                    <div className={`invoice__section-title${this.visible("buyerAddress")}`}>Adresat</div>
                    <div className={`d-flex${this.visible("buyerAddress")}`}>
                        <Textarea name="buyerAddress" value={this.state.invoice.buyerAddress}
                                  onChange={this.handleChange} onBlur={this.handleOnBlur} className="--height-100 --with-100"
                                  placeholder="Adres korespondencji nabywcy" readonly={this.state.printing}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="invoice__section-title">POZYCJE FAKTURY</div>
                    <table className="mt-3 invoice__table">
                        <thead>
                        <tr className="table-active">
                            <th>Lp.</th>
                            <th className="--with-40">Nazwa towaru/usługi</th>
                            <th>Ilość</th>
                            <th>PKWiU</th>
                            <th>Cena netto</th>
                            <th>Wartość netto</th>
                            <th>VAT</th>
                            <th>Wartość VAT</th>
                            <th>Wartość brutto</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.invoice.itemList.map((item: any, i: number) => {
                            return <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>
                                    <Textarea name="name" invalid={this.errorList.get("name", null, item.id)}
                                              className="--height-60"
                                              onChange={(event: ChangeEvent<any>) => this.handleItemChange(event, item.id)} onBlur={this.handleOnBlur}
                                              value={item.name} readonly={this.state.printing}/>
                                </td>
                                <td>
                                    <Input name="amountWithUnit" invalid={this.getError("amountWithUnit", item.id)}
                                           className="--with-100"
                                           onChange={(event: ChangeEvent<any>) => this.handleItemChange(event, item.id)} onBlur={this.handleOnBlur}
                                           value={item.amountWithUnit} readonly={this.state.printing}/>
                                </td>
                                <td>
                                    <Input name="pkwiu" className="--with-100"
                                           onChange={(event: ChangeEvent<any>) => this.handleItemChange(event, item.id)} onBlur={this.handleOnBlur}
                                           value={item.pkwiu} readonly={this.state.printing}/>
                                </td>
                                <td>
                                    <Input name="priceNetStr" invalid={this.getError("priceNetStr", item.id)}
                                           className="--with-100"
                                           onChange={(event: any) => this.handleItemChange(event, item.id)} onBlur={this.handleOnBlur}
                                           value={item.priceNetStr} readonly={this.state.printing}/>
                                </td>
                                <td>
                                    <span>{this.numberString(item.valueNet)}</span>
                                </td>
                                <td>
                                    <Input name="vatStr" className="--with-100"
                                           invalid={this.errorList.get("vatStr", null, item.id)}
                                           onChange={(event: ChangeEvent) => this.handleItemChange(event, item.id)} onBlur={this.handleOnBlur}
                                           value={item.vatStr} readonly={this.state.printing}/>
                                </td>
                                <td>
                                    <span>{this.numberString(item.valueVat)}</span>
                                </td>
                                <td>
                                    <span>{this.numberString(item.valueGross)}</span>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-end">
                                        <div className="d-flex">
                                            <Icon name={Icon.ICON_ARROW_UP} visible={this.isArrowUpVisible(item.id)} onClick={(event: ChangeEvent<any>) => this.handleItemArrowClick(event, item.id, -1)}/>
                                            {!this.isArrowUpVisible(item.id) ? <span>&nbsp;</span> : ""}
                                            <Icon name={Icon.ICON_ARROW_DOWN} visible={this.isArrowDownVisible(item.id)} onClick={(event: ChangeEvent<any>) => this.handleItemArrowClick(event, item.id, 1)}/>
                                            {!this.isArrowDownVisible(item.id) ? <span>&nbsp;</span> : ""}
                                        </div>
                                        <Icon name={Icon.ICON_DELETE} visible={!this.state.printing} onClick={(event: ChangeEvent<any>) => this.handleItemDelete(event, item.id)}/>
                                    </div>
                                </td>
                            </tr>
                        })}
                        {this.state.invoice.itemList.length != 0 ? "" :
                            <tr>
                                <td colSpan={100}>
                                    <div className="invoice__no-item"> Brak pozycji na fakturze</div>
                                </td>
                            </tr>
                        }
                        </tbody>
                    </table>
                    <div className="mt-3 d-flex flex-row-reverse">
                        <Button label="Dodaj pozycję" onAction={this.handleAddItem} visible={!this.state.printing} style="light" icon={Icon.ICON_PLUS}/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="invoice__section-title">PODSUMOWANIE</div>
                    <table className="invoice__summary-table --with-100">
                        <tbody>
                        <tr className="">
                            <td className="invoice__summary-label"></td>
                            <td className="invoice__summary-label">Wartość netto</td>
                            <td className="invoice__summary-label">Stawka VAT</td>
                            <td className="invoice__summary-label">VAT</td>
                            <td className="invoice__summary-label">Wartość brutto</td>
                        </tr>
                        {this.state.summary.map((item: SummaryItem) => {
                            return <tr key={item.vat}>
                                <td className="--marked"></td>
                                <td className="--marked">{this.numberString(item.valueNet)}</td>
                                <td className="--marked">{item.vatStr}</td>
                                <td className="--marked">{this.numberString(item.valueVat)}</td>
                                <td className="--marked">{this.numberString(item.valueGross)}</td>
                            </tr>
                        })}
                        <tr>
                            <td className="invoice__summary-label --marked">Razem</td>
                            <td className="invoice__summary-label --marked">{this.pln(this.calcInvoiceValueNet())}</td>
                            <td className="invoice__summary-label --marked"></td>
                            <td className="invoice__summary-label --marked">{this.pln(this.calcInvoiceValueVat())}</td>
                            <td className="invoice__summary-label --marked">{this.pln(this.calcInvoiceValueGross())}</td>
                        </tr>
                        <tr>
                            <td className="invoice__summary-label">Zapłacono:</td>
                            <td colSpan={4}>
                                <div className="d-flex justify-content-end align-items-baseline">
                                    <Input name="paidAmountStr" value={this.state.invoice.paidAmountStr}
                                           onChange={this.handleChange} onBlur={this.handleOnBlur} className="--with-50 text-end"
                                           placeholder="Zapłacono" invalid={this.errorList.get("paidAmountStr")}
                                           readonly={this.state.printing}/>&nbsp; PLN
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="invoice__summary-label --marked">Pozostało do zapłaty:</td>
                            <td className="--marked" colSpan={4}>
                                <div className="d-flex justify-content-end align-items-baseline">
                                    {this.number(this.state.invoice.paidLeft)}&nbsp;PLN
                                </div>
                            </td>
                        </tr>
                        <tr className={this.visible("paidLeftInWords")}>
                            <td className="invoice__summary-label">Słownie:</td>
                            <td colSpan={4}>
                                <div className="d-flex justify-content-end align-items-baseline">
                                    <span>{this.state.invoice.paidLeftInWords}</span>
                                </div>
                            </td>
                        </tr>
                        <tr className={this.visible("sellerBankAccount")}>
                            <td className="invoice__summary-label --marked">Konto bankowe:</td>
                            <td className="--marked" colSpan={4}>
                                <div className="d-flex justify-content-end align-items-baseline">
                                    <Input name="sellerBankAccount" value={this.state.invoice.sellerBankAccount}
                                           onChange={this.handleChange} onBlur={this.handleOnBlur} className="--with-50 text-end"
                                           placeholder="Nr konta bankowego" readonly={this.state.printing}/>
                                </div>
                            </td>
                        </tr>
                        <tr className={this.visible("notes")}>
                            <td className="invoice__summary-label">Uwagi:</td>
                            <td colSpan={4}>
                                <div className="d-flex justify-content-end align-items-baseline">
                                    <Textarea name="notes" invalid={this.errorList.get("notes")}
                                              className="--height-60 --with-100 text-end"
                                              onChange={(event: ChangeEvent<any>) => this.handleChange(event)} onBlur={this.handleOnBlur}
                                              value={this.state.invoice.notes} placeholder="Uwagi"
                                              readonly={this.state.printing}/>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-end">
                <Button style={Button.STYLE_LIGHT} onAction={this.handleNew} label="Utwórz nową" visible={!this.state.printing} icon={Icon.ICON_NEW}/>
                <Button style={Button.STYLE_LIGHT} className="ms-1" onAction={this.handleSave} label="Zapisz" visible={!this.state.printing} icon={Icon.ICON_SAVE}/>
                <Button style={Button.STYLE_PRIMARY} className="ms-1" onAction={this.handlePrint} label="Drukuj" visible={!this.state.printing} icon={Icon.ICON_PRINTER}/>
            </div>
        </div>
    }

    componentDidMount() {
        this.updateState();
    }

    private calcInvoiceValueNet(): number {
        let sum = 0;

        this.state.invoice.itemList.forEach((item: InvoiceItemEntity) => {
            if (item.valueNet == null) return;
            sum += item.valueNet;
        });

        return sum;
    }

    private calcInvoiceValueVat(): number {
        let sum = 0;

        this.state.invoice.itemList.forEach((item: InvoiceItemEntity) => {
            if (item.valueVat == null) return;
            sum += item.valueVat;
        });

        return sum;
    }

    private calcInvoiceValueGross(): number {
        let sum = 0;

        this.state.invoice.itemList.forEach((item: InvoiceItemEntity) => {
            if (item.valueGross == null) return;
            sum += item.valueGross;
        });

        return sum;
    }

    handleChange(event: any) {
        this.setState({
            ...this.state,
            invoice: {
                ...this.state.invoice,
                [event.target.name]: event.target.value,
            }
        });
    }

    handleItemChange(event: ChangeEvent<any>, id: string) {
        let itemList = this.state.invoice.itemList.map((item: InvoiceItemEntity) => {
            if (item.id !== id) return item;
            item = {...item};
            // @ts-ignore
            item[event.target.name] = event.target.value;
            return item;
        });

        this.setState({
            ...this.state,
            invoice: {
                ...this.state.invoice,
                itemList
            }
        })
    }

    handleOnBlur() {
        this.updateState();
    }

    handlePrint(event: any) {
        this.setState({
            ...this.state,
            printing: true
        });

        // document.querySelector("head").querySelectorAll("link")[0].outerHTML

        setTimeout(() => {
            var mywindow = window.open('', 'PRINT', 'height=400,width=1024');
            if (mywindow == null) return;

            let invoice = document.getElementById("invoice");
            if (invoice == null) return;

            mywindow.document.write(`
                <html>
                    <head>
                        <title>Faktura VAT nr ${this.state.invoice.number}</title>
                        ${this.resolveStylesHtml()}
                    </head>
                <body style="width: 1024px; padding: 25px">
            `);

            mywindow.document.write(invoice.innerHTML);
            mywindow.document.write(`
                </body>
                <footer>
                    <span class="invoice__generated-by">generated by fakgen.pl</span>
                </footer>
            </html>`
            );

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/

            setTimeout(() => {
                mywindow?.print();
                // mywindow?.close();
            }, 500);

            this.setState({
                ...this.state,
                printing: false
            });
        }, 500);

        return true;
    }

    private resolveStylesHtml(): string {
        let styleHtml = "";

        document.querySelector("head")?.querySelectorAll("link,style").forEach(value => styleHtml += value.outerHTML);

        return styleHtml;
    }

    handleNew() {
        this.setState({
            invoice: invoiceEmptyData,
            printing: false,
            errors: [],
            summary: [],
        });
    }

    handleSave() {
        invoiceService.saveIntoStorage(this.state.invoice);

        alert("Dane faktury zostały zapisane w przeglądarce");
    }

    handleAddItem() {
        this.state.invoice.itemList.push(this.createEmptyInvoiceItemEntity());
        this.updateState();
    }

    getError(field: string, id: string | undefined): string | null {
        if (field && id) {
            return this.state.errors.find((error: any) => error.field === field && error.id === id);
        } else {
            return this.state.errors.find((error: any) => error.field);
        }
    }

    updateState() {
        this.errorList.removeAll();

        let summary: SummaryItem[] = [];

        let itemList = this.state.invoice.itemList.map((item: InvoiceItemEntity) => {
            item = {...item};
            this.trimString(item);

            if (!item.name || !item.name.length) {
                this.errorList.setError("Podaj nazwę", "name", null, item.id);
            }

            item.amount = this.parseAmountWithUnit(item.amountWithUnit);

            if (item.amount == null) {
                this.errorList.setError("Podaj ilość sztuk w formacie numer i jednostka", "amountWithUnit", null, item.id);
            }

            item.priceNet = this.number(item.priceNetStr);

            if (item.priceNet == null) {
                this.errorList.setError("Niepoprawna wartość", "priceNetStr", null, item.id);
            } else {
                item.priceNetStr = this.numberString(item.priceNet).trim();
            }

            if (item.amount != null && item.priceNet != null) {
                item.valueNet = (item.amount * item.priceNet);
            } else {
                item.valueNet = null
            }

            if (item.vatStr && item.vatStr[item.vatStr.length - 1] != "%") {
                item.vatStr = item.vatStr + "%";
            }

            item.vat = this.parseVat(item.vatStr);

            if (item.vat == null) {
                this.errorList.setError("Niepoprawna wartość VAT", "vatStr", null, item.id);
            }

            if (item.valueNet != null && item.vat != null) {
                item.valueVat = item.valueNet * item.vat;
            } else {
                item.valueVat = null;
            }

            if (item.valueNet != null && item.valueVat != null) {
                item.valueGross = item.valueNet + item.valueVat;
            } else {
                item.valueGross = null;
            }

            if (item.valueGross != null) {
                // If I can calc gross value then it means that all necessary fields are correct.
                let summaryItem = summary.find((summary: SummaryItem) => summary.vat === item.vat);

                if (!summaryItem) {
                    summaryItem = {
                        vat: item.vat || 0,
                        vatStr: item.vatStr || "",
                        valueNet: item.valueNet || 0,
                        valueVat: item.valueVat || 0,
                        valueGross: item.valueGross || 0,
                    };

                    summary.push(summaryItem);
                } else {
                    summaryItem.valueNet += item.valueNet || 0;
                    summaryItem.valueVat += item.valueVat || 0;
                    summaryItem.valueGross += item.valueGross || 0;
                }
            }

            return item;
        });

        this.trimString(this.state.invoice);
        let invoice = this.state.invoice;

        invoice.paidAmount = this.number(this.state.invoice.paidAmountStr);

        if (invoice.paidAmount == null) {
            this.errorList.setError("Niepoprawna wartość", "paidAmountStr");
        } else {
            invoice.paidAmountStr = this.numberString(invoice.paidAmount);
        }

        invoice.paidLeft = 0;
        summary.forEach((summaryItem: SummaryItem) => {
            if (invoice.paidLeft == null) return;

            invoice.paidLeft += (summaryItem.valueGross || 0);
        });


        if (invoice.paidAmount != null) {
            invoice.paidLeft -= invoice.paidAmount;
        }

        invoice.paidLeftInWords = invoiceService.numberToWords(invoice.paidLeft);

        if (invoice.paidLeftInWords) {
            invoice.paidLeftInWords += " PLN";
        }

        this.setState({
            ...this.state,
            invoice: {
                ...this.state.invoice,
                itemList,
            },
            errors: this.errorList.getState(),
            summary,
        });
    }

    parseAmountWithUnit(amountWithUnit: string | null): number | null {
        if (!amountWithUnit) {
            return null;
        } else {
            let amountTmp = parseFloat(amountWithUnit);

            if (isNaN(amountTmp)) {
                return null;
            } else {
                return amountTmp;
            }
        }
    }

    parseVat(vatStr: string | null): number | null {
        if (!vatStr) return null;
        if (vatStr[vatStr.length - 1] !== "%") return null;

        vatStr = vatStr.substr(0, vatStr.length - 1);
        let vat = parseInt(vatStr);

        if (isNaN((vat)) || vat < 0 || vat > 100) return null;

        return vat / 100;
    }

    createEmptyInvoiceItemEntity(): InvoiceItemEntity {
        return {
            id: uuid(),
            name: null,
            pkwiu: null,
            amountWithUnit: null,
            amount: null,
            priceNet: null,
            priceNetStr: null,
            vat: null,
            vatStr: null,
            valueNet: null,
            valueVat: null,
            valueGross: null
        };
    }

    private static toFloat(paidAmountStr: string | null): number | null {
        if (!paidAmountStr) {
            return null;
        }

        let value = parseFloat(paidAmountStr);

        if (isNaN(value)) {
            return null;
        } else {
            return value;
        }

    }

    private isVisible(field: string): boolean {
        if (!this.state.printing) return true;

        // @ts-ignore
        let value = this.state.invoice[field];

        return !(value == null || value == "");
    }

    /**
     * Check if field should be visible. If not then returns d-none class to hide element.
     *
     * @param field
     * @private
     */
    private visible(field: string): string {
        return this.isVisible(field) ? "" : " d-none";
    }

    private isArrowUpVisible(itemId: string): boolean {
        if (this.state.printing) return false;
        let itemIndex = this.state.invoice.itemList.findIndex((item) => item.id === itemId);
        return itemIndex > 0;
    }

    private isArrowDownVisible(itemId: string): boolean {
        if (this.state.printing) return false;
        let itemIndex = this.state.invoice.itemList.findIndex((item) => item.id === itemId);
        return itemIndex <= this.state.invoice.itemList.length - 2;
    }

    private handleItemArrowClick(event: React.ChangeEvent<any>, itemId: string, direction: number) {
        const itemIndex = this.state.invoice.itemList.findIndex((item) => item.id === itemId);
        const newItemIndex = itemIndex + direction;
        const itemList: InvoiceItemEntity[] = [];

        this.state.invoice.itemList.forEach((item, index) => {
            if (index == itemIndex) return;

            if (index === newItemIndex) {
                if (direction === -1) {
                    itemList.push(this.state.invoice.itemList[itemIndex]);
                    itemList.push(item);
                } else {
                    itemList.push(item);
                    itemList.push(this.state.invoice.itemList[itemIndex]);
                }
            } else {
                itemList.push(item);
            }
        });

        this.setState({
            ...this.state,
            invoice: {
                ...this.state.invoice,
                itemList
            }
        });
    }

    private pln(value: number | null | undefined): string {
        return this.numberString(value) + " PLN";
    }

    private numberString(value: number | null | undefined): string {
        let number = this.number(value);

        if (number == null) {
            return "0.00";
        }

        let str = number.toFixed(2);
        let split = str.split(".");

        let dec = split[0];
        let spaced = "";

        let j = 0;
        for(let i = dec.length - 1; i >= 0; i--) {
            j++;
            spaced = dec[i] + spaced;

            if (j == 3) {
                spaced = " " + spaced;
                j = 0;
            }
        }

        return spaced + "." + split[1];
    }

    private number(value: string | number | null | undefined): number | null {
        if (value === undefined || value === null) return 0;

        if (typeof value == "string") {
            value = value.replaceAll(" ", "");

            let parsed = parseFloat(value);

            if (isNaN(parsed)) {
                return null;
            } else {
                return parseFloat(parsed.toFixed(2));
            }
        } else {
            return parseFloat(value.toFixed(2));
        }
    }


    private handleItemDelete(event: React.ChangeEvent<any>, id: string) {
        this.state.invoice.itemList = this.state.invoice.itemList.filter((item: InvoiceItemEntity) => {
            return item.id != id;
        });

        this.updateState();
    }

    private trimString(object: any): void {
        Object.keys(object).forEach(key => {
            if (typeof object[key] === "string") {
                object[key] = object[key].trim();
            }
        });
    }

}
