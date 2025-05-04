import React from "react";

interface FailedProps {
    showToast: () => void;
    text: string
}

const Failed: React.FC<FailedProps> = ({ showToast, text }) => {
    return (
        <div
            id="toast-danger"
            className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-red-600 dark:text-red-400 bg-light-color1 dark:bg-color1 rounded-lg shadow-sm z-10"
            role="alert"
        >
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 rounded-lg">
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
                <span className="sr-only">Error icon</span>
            </div>

            <div className="ms-3 text-sm font-primaryDemibold">{text}</div>

            <button
                type="button"
                onClick={showToast}
                className="ms-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:text-gray-900 dark:hover:text-white rounded-lg focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center justify-center h-8 w-8"
            >
                <span className="sr-only">Close</span>
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
    )
}

export default Failed