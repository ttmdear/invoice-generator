import InvoiceEntity from "../invoices/entities/InvoiceEntity";

const invoiceListData: InvoiceEntity[] = [{
    id: "1",
    dateOfIssue: "2021.01.01",
    dateOfSell: "2021.01.01",
    number: "1/9/2021",
    sellerName: "SORGA sp. z o.o",
    sellerCity: "Warszawa",
    sellerStreetWithNumber: "ul. Aleje Jerozolimskie 214",
    sellerPostCode: "02-486 Warszawa",
    sellerNip: "23423-234-234",
    sellerCountry: "Polska",
    sellerEmail: "sortga@orga.pl",
    sellerWWW: "www.sorga.pl",
    sellerFax: "(23) 532-34-232",
    sellerPhone: "345-123-454",
    sellerAdditionalInformation: "Cras ultricies ligula sed magna dictum porta. Vivamus suscipit tortor eget felis porttitor volutpat. Cras ultricies ligula sed magna dictum porta. Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
    sellerBankAccount: "56894100063412702154924025",
    buyerName: "INSPEERITY SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
    buyerCity: "Białystok",
    buyerStreetWithNumber: "ul. Świętojańska 12A",
    buyerPostCode: "15-082 Białystok",
    buyerNip: "5423306186",
    buyerAdditionalInformation: "Cras ultricies ligula sed magna dictum porta. Vivamus suscipit tortor eget felis porttitor volutpat. Cras ultricies ligula sed magna dictum porta. Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
    buyerAddress: "Warszawa, \nul. Aleje Jerozolimskie 214\n15-082 Białystok",
    placeOfIssue: "Warszawa",
    paymentMethod: "Przelew",
    paymentDateStr: "2021.01.21",
    paidAmount: 10,
    paidAmountStr: "10",
    paidLeft: 0,
    paidLeftInWords: null,
    notes: null,
    itemList: [{
        id: "1",
        name: "Usługi programistyczne",
        pkwiu: "67.1",
        amountWithUnit: "1 szt.",
        amount: 1,
        priceNet: 100,
        priceNetStr: "100",
        vat: 0.08,
        vatStr: "8%",
        valueNet: 100,
        valueVat: 23,
        valueGross: 123,
    }],
}];

const invoiceEmptyData: InvoiceEntity = {
    id: "1",
    dateOfIssue: null,
    dateOfSell: null,
    number: null,
    sellerName: null,
    sellerCity: null,
    sellerStreetWithNumber: null,
    sellerPostCode: null,
    sellerNip: null,
    sellerCountry: null,
    sellerEmail: null,
    sellerWWW: null,
    sellerFax: null,
    sellerPhone: null,
    sellerAdditionalInformation: null,
    sellerBankAccount: null,
    buyerName: null,
    buyerCity: null,
    buyerStreetWithNumber: null,
    buyerPostCode: null,
    buyerNip: null,
    buyerAdditionalInformation: null,
    buyerAddress: null,
    placeOfIssue: null,
    paymentMethod: null,
    paymentDateStr: null,
    paidAmount: null,
    paidAmountStr: null,
    paidLeft: null,
    paidLeftInWords: null,
    notes: null,
    itemList: [],
};

export {
    invoiceListData,
    invoiceEmptyData,
}