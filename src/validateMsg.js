const message = [
    {
        type: "min",
        msg: "quá ngắn!"
    },
    {
        type: "max",
        msg: "quá dài!"
    },
    {
        type: "required",
        msg: "không được để trống"
    },
    {
        type: "email",
        msg: "không đúng"
    },
    {
        type: "matchpass",
        msg: "không khớp"
    },
    {
        type: "matchphone",
        msg: "không đúng"
    }
];
export default function validateMsg(fieldName, type) {
    const result = message.find(element => element.type === type);
    if(result)
        return `${fieldName} ${result.msg}`;
    return `${fieldName} xảy ra lỗi`;
}