import { motion } from "framer-motion";
interface Prop {
    step : number,
    progressPercentage : number
}
const ProgressBarProject : React.FC<Prop> = ({step,progressPercentage}) => {
    return (
        <div>
            <div className="mb-8">
                <div className="flex justify-between mb-2 text-xs font-primaryMedium">
                    <span className="text-light-color2 dark:text-color2">مرحله {step} از 8</span>
                    <span className="text-light-color4 dark:text-color4">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-2 w-full bg-light-color6 dark:bg-color6 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: `${((step - 1) / 8) * 100}%` }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-light-color4 dark:bg-color4 rounded-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default ProgressBarProject;