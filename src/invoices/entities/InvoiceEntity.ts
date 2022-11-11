import InvoiceItemEntity from "./InvoiceItemEntity";

export default interface InvoiceEntity {
    id: string | null;
    dateOfIssue: string | null;
    dateOfSell: string | null;
    number: string | null;
    sellerName: string | null;
    sellerCity: string | null;
    sellerStreetWithNumber: string | null;
    sellerPostCode: string | null;
    sellerNip: string | null;
    sellerCountry: string | null;
    sellerEmail: string | null;
    sellerWWW: string | null;
    sellerFax: string | null;
    sellerPhone: string | null;
    sellerAdditionalInformation: string | null;
    sellerBankAccount: string | null;
    buyerName: string | null;
    buyerCity: string | null;
    buyerStreetWithNumber: string | null;
    buyerPostCode: string | null;
    buyerNip: string | null;
    buyerAdditionalInformation: string | null;
    buyerAddress: string | null;
    placeOfIssue: string | null;
    paymentMethod: string | null;
    paymentDateStr: string | null;
    paidAmount: number | null;
    paidAmountStr: string | null;
    paidLeft: number | null;
    paidLeftInWords: string|null;
    notes: string|null;
    itemList: InvoiceItemEntity[];
}

