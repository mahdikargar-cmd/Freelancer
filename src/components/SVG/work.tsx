const Work = () => {
    return (
        <div className='flex flex-col items-center justify-center bg-color6 rounded-xl p-6 cursor-pointer hover:bg-color5 transition duration-300'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#CAFF33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user mb-3">
                <path d="M20 21a8 8 0 1 0-16 0" />
                <circle cx="12" cy="7" r="4" />
            </svg>
            <span className='text-color4 font-primaryMedium text-xl'>فریلنسر</span>
        </div>
    )
}

export default Work;