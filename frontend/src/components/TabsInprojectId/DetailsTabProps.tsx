import { FaTools } from 'react-icons/fa';

export interface Skill {
    id: number;
    name: string;
}

interface DetailsTabProps {
    skills: Skill[] | null | undefined;
    category: { id: string; name: string } | null | undefined;
    deadline: number;
    createdDate: [number, number, number] | null | undefined;
}

const DetailsTab = ({ skills, category, deadline, createdDate }: DetailsTabProps) => {
    const InfoItem = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-between items-center">
            <dt className="text-light-color7 dark:text-color7 text-sm">{label}</dt>
            <dd className="font-primaryMedium text-light-color2 dark:text-color2">{value}</dd>
        </div>
    );

    const formatDate = (dateArray: [number, number, number] | null | undefined): string => {
        if (!Array.isArray(dateArray) || dateArray.length !== 3) {
            return new Date().toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }

        const [year, month, day] = dateArray;

        if (
            isNaN(year) ||
            isNaN(month) ||
            isNaN(day) ||
            month < 1 ||
            month > 12 ||
            day < 1 ||
            day > 31
        ) {
            return new Date().toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }

        try {
            const date = new Date(year, month - 1, day);
            // اطمینان از معتبر بودن تاریخ
            if (isNaN(date.getTime())) {
                return new Date().toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
            }
            return date.toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        } catch {
            return new Date().toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* مهارت‌ها */}
            <div className="bg-light-color5 dark:bg-color6 p-4 sm:p-6 rounded-xl">
                <h3 className="text-base sm:text-lg font-primaryBold mb-3 sm:mb-4 text-light-color2 dark:text-color2 flex items-center gap-2">
                    <FaTools className="text-light-color4 dark:text-color4" /> مهارت‌های مورد نیاز
                </h3>
                <div className="flex flex-wrap gap-2">
                    {skills && skills.length > 0 ? (
                        skills.map((skill) => (
                            <span
                                key={skill.id}
                                className="px-3 py-1 bg-light-color4 bg-opacity-10 dark:bg-color4 dark:bg-opacity-10 text-light-color4 dark:text-color4 rounded-full text-xs sm:text-sm"
                            >
                {skill.name}
              </span>
                        ))
                    ) : (
                        <span className="text-light-color7 dark:text-color7 text-sm">بدون مهارت</span>
                    )}
                </div>
            </div>

            {/* اطلاعات پروژه */}
            <div className="bg-light-color5 dark:bg-color6 p-4 sm:p-6 rounded-xl">
                <h3 className="text-base sm:text-lg font-primaryBold mb-3 sm:mb-4 text-light-color2 dark:text-color2">
                    اطلاعات پروژه
                </h3>
                <dl className="space-y-2 sm:space-y-3">
                    <InfoItem label="دسته‌بندی" value={category?.name || 'نامشخص'} />
                    <InfoItem label="مهلت تحویل" value={`${deadline} روز`} />
                    <InfoItem label="تاریخ انتشار" value={formatDate(createdDate)} />
                </dl>
            </div>
        </div>
    );
};

export default DetailsTab;