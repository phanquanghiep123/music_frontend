import { Config } from "../config";

export class Checkout {
    id: number = 0
    full_name: string = "";
    email: string = "";
    payment_option: string = 'paypal';
    artist_id: number = 0;
    agree: boolean = true;
    status: number = 0;
    slug: string = "";
    key: string = "";
    price: number = 0;
    cancel_url: string = Config.BASEURL + '/cancel'
    success_url: string = Config.BASEURL + '/thanks';
    created_at: string = null;
    updated_at: string = null;
    encrypted_data : string = "";
    access_code : string = "";
    constructor() {
        var key = "";
        for (let i in this) {
            if (typeof this[i] != "function" && typeof this[i] != "object" && i !="status") {
                key = "" + i;
                if (this.getCookie('checkout_' + i) != null && this.getCookie('checkout_' + i) != "")
                    this[key] = this.getCookie('checkout_' + i);
            }
        }
    }
    set(day = 1): Checkout {
        for (let i in this) {
            if (typeof this[i] != "function" && typeof this[i] != "object") {
                this.setCookie('checkout_' + i, this[i], day);
            }
        }

        return this;
    }
    destroy(): Checkout {
        for (let i in this) {
            this.delCookie("checkout_" + i);
        }
        return this;
    }
    get(): any {
        return this;
    }
    setCookie(cname: string, cvalue: any, exdays = 1) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    delCookie(name: string) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
