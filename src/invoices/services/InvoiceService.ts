import InvoiceEntity from "../entities/InvoiceEntity";

class InvoiceService {

    public saveIntoStorage(invoice: InvoiceEntity): void {
        localStorage.setItem("lastInvoice", JSON.stringify(invoice));
    }

    public loadFromStorage(): InvoiceEntity | null {
        let lastInvoice = localStorage.getItem("lastInvoice");

        if (!lastInvoice) return null;

        try {
            return JSON.parse(lastInvoice);
        } catch (e) {
            return null;
        }

    }

    public numberToWords(number: number): string {
        let numberStr = number.toFixed(2);

        let split = numberStr.split(".");

        let groszy = "";

        if (split[1] !== "00") {
            groszy = ` i 0.${split[1]}`;

            number = parseInt(split[0]);
        }

        var jednosci = ["", " jeden", " dwa", " trzy", " cztery", " pięć", " sześć", " siedem", " osiem", " dziewięć"];
        var nascie = ["", " jedenaście", " dwanaście", " trzynaście", " czternaście", " piętnaście", " szesnaście", " siedemnaście", " osiemnaście", " dziewietnaście"];
        var dziesiatki = ["", " dziesięć", " dwadzieścia", " trzydzieści", " czterdzieści", " pięćdziesiąt", " sześćdziesiąt", " siedemdziesiąt", " osiemdziesiąt", " dziewięćdziesiąt"];
        var setki = ["", " sto", " dwieście", " trzysta", " czterysta", " pięćset", " sześćset", " siedemset", " osiemset", " dziewięćset"];
        var grupy = [
            ["", "", ""],
            [" tysiąc", " tysiące", " tysięcy"],
            [" milion", " miliony", " milionów"],
            [" miliard", " miliardy", " miliardów"],
            [" bilion", " biliony", " bilionów"],
            [" biliard", " biliardy", " biliardów"],
            [" trylion", " tryliony", " trylionów"]];

        var wynik = '';
        var znak = '';

        if (number == 0) wynik = "zero";

        if (number < 0) {
            znak = "minus";
            number = -number;
        }

        var g = 0;
        while (number > 0) {
            var s = Math.floor((number % 1000) / 100);
            var n = 0;
            var d = Math.floor((number % 100) / 10);
            var j = Math.floor(number % 10);

            if (d == 1 && j > 0) {
                n = j;
                d = 0;
                j = 0;
            }

            var k = 2;
            if (j == 1 && s + d + n == 0)
                k = 0;
            if (j == 2 || j == 3 || j == 4)
                k = 1;
            if (s + d + n + j > 0)
                wynik = setki[s] + dziesiatki[d] + nascie[n] + jednosci[j] + grupy[g][k] + wynik;

            g++;

            number = Math.floor(number / 1000);
        }

        return `${wynik}${groszy}`;
    }
}


const invoiceService = new InvoiceService();

export {
    InvoiceService,
    invoiceService,
}
