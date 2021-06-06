export default function ShowCategory(props) {
    const { idx, item } = props;
    return (
        <>
            {idx !== 0 ? "," : ""}
            <a href={"/category/" + item.id + "/edit"}>{item.name}</a>
        </>
    )
}