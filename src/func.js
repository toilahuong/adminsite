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