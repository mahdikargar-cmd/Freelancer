'use client';

interface DetailsTabProps {
    description: string;
}

const DetailsTab = ({ description }: DetailsTabProps) => {
    return (
        <div className="text-light-color3 dark:text-color3 space-y-4">
            <h3 className="font-primaryMedium text-light-color2 dark:text-color2">توضیحات پروژه</h3>
            <p>{description || 'بدون توضیحات'}</p>
        </div>
    );
};

export default DetailsTab;