import { text } from "stream/consumers";

const Rules = () => {
    type InfoItem = {
        text: string;
        id: number;
    };
    
    const Info: InfoItem[] = [
        {
            text: "اطلاعات شما نزد ما محفوظ خواهد بود.",
            id: 1
        },
        {
            text: "لطفاً از نام کاربری مناسب استفاده کنید.",
            id: 2
        },
        {
            text: "رعایت قوانین سایت الزامی است.",
            id: 3
        },
        {
            text: "هرگونه تخلف منجر به مسدود شدن حساب خواهد شد.",
            id: 4
        }
    ];
    
    return (
        <ul className="text-white text-sm mt-4 text-right list-disc list-inside font-primaryMedium">
            {
                Info.map((items) => (
                    <li key={items.id}>
                        {items.text}
                    </li>
                ))
            }
        </ul>
    )
}

export default Rules;