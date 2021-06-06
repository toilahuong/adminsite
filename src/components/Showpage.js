import { Pagination } from "react-bootstrap";

export default function Showpage(props) {
    let { count, limit, page } = props;
    page = page || 1;
    limit = limit || 25;
    const urlParams = new URLSearchParams(window.location.search);
    const numberPages = parseInt(count / limit) * limit === count ? parseInt(count / limit) : parseInt(count / limit) + 1;
    let items = [];
    const handleClick = (p) => {
        console.log(window.location)
        urlParams.set("page", p)
        window.location.search = urlParams.toString();
    }
    if (count && page && page !== 1)
        items.push(
            <Pagination.Prev key={0} onClick={() => handleClick(page - 1)} />
        );
    for (let number = 1; number <= numberPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === page} onClick={() => handleClick(number)}>
                {number}
            </Pagination.Item>,
        );
    }
    if (count && page && page !== numberPages)
        items.push(
            <Pagination.Next key={numberPages + 1} onClick={() => handleClick(page + 1)} />
        );
    return items;
}