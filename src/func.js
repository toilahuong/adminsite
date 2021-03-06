import { useLocation } from "react-router";

export function format_price(price) {
    let newPrice = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price));
    return newPrice;
}
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export function isLoggedIn() {
    if (localStorage.getItem("auth") === "" || localStorage.getItem("auth") === null) return false;
    return true;
}
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export function removeTags(str) {
    if ((str === null) || (str === ''))
        return "";
    else
        str = str.toString();
    str = str.substr(0, 150);
    return str.replace(/(<([^>]+)>)/ig, '');
}
export function equar(a, b) {
    if (a.length !== b.length) {
        return false
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false
            }
        }
        return true;
    }
}