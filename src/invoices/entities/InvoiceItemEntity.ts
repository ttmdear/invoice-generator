export default interface InvoiceItemEntity {
    id: string | null;
    name: string | null;
    pkwiu: string | null;
    amountWithUnit: string | null;
    amount: number | null;
    priceNet: number | null;
    priceNetStr: string | null;
    vat: number | null;
    vatStr: string | null;
    valueNet: number | null;
    valueVat: number | null;
    valueGross: number | null;
}
