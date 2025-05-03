interface SuccessProps {
    showToast: () => void;
    text: string
}

const Success: React.FC<SuccessProps> = ({ showToast, text }) => {
    return (
        <div
            className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 text-light-color4 dark:text-color4 bg-light-color1 dark:bg-color1 rounded-lg shadow-lg z-10"
        >
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-400 rounded-lg">
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
            </div>

            <div className="ms-3 text-sm font-primaryDemibold">{text}</div>

            <button
                type="button"
                className="ms-auto text-green-500 dark:text-green-400 hover:text-gray-900 dark:hover:text-white rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 bg-green-100 dark:bg-green-900"
                onClick={showToast}
            >
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Success;
