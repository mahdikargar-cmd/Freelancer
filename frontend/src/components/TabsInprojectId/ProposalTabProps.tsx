'use client';
import { useState, useCallback } from 'react';
import { IoMdSend } from 'react-icons/io';
import { FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Milestone {
    name: string;
    amount: number;
    durationDays: number;
}

interface ProposalTabProps {
    proposal: {
        title: string;
        content: string;
        proposedBudget: string;
        estimatedDuration: string;
        milestones: Milestone[];
    };
    setProposal: (proposal: ProposalTabProps['proposal']) => void;
    onSubmit: () => void;
    isEmployer: boolean;
    onGoToChat: () => void;
}

const ProposalTab = ({ proposal, setProposal, onSubmit, isEmployer, onGoToChat }: ProposalTabProps) => {
    const [newMilestone, setNewMilestone] = useState<Milestone>({
        name: '',
        amount: 0,
        durationDays: 0,
    });

    const addMilestone = useCallback(() => {
        if (newMilestone.name && newMilestone.amount > 0 && newMilestone.durationDays > 0) {
            setProposal({
                ...proposal,
                milestones: [...proposal.milestones, newMilestone],
            });
            setNewMilestone({ name: '', amount: 0, durationDays: 0 });
        } else {
            alert('لطفاً تمام فیلدهای بخش پروژه را به درستی پر کنید');
        }
    }, [newMilestone, proposal, setProposal]);

    console.log('isEmployer in ProposalTab:', isEmployer);

    if (isEmployer === undefined) {
        return (
            <div className="max-w-lg mx-auto text-center py-8">
                <p className="text-light-color7 dark:text-color7">
                    در حال بارگذاری اطلاعات پروژه...
                </p>
            </div>
        );
    }

    if (isEmployer) {
        return (
            <div className="max-w-lg mx-auto text-center py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaComments className="mx-auto text-5xl text-light-color4 dark:text-color4 mb-4" />
                    <p className="text-light-color7 dark:text-color7 mb-6">
                        شما کارفرمای این پروژه هستید و نمی‌توانید پیشنهاد ثبت کنید.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onGoToChat}
                        className="w-full bg-light-color4 hover:bg-light-color8 dark:bg-color4 dark:hover:bg-color8 text-light-color1 dark:text-color1 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors font-primaryMedium"
                        aria-label="رفتن به صفحه چت"
                    >
                        <FaComments /> رفتن به صفحه چت
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto">
            <div className="space-y-4 sm:space-y-6">
                {/* عنوان پیشنهاد */}
                <div>
                    <label
                        htmlFor="proposal-title"
                        className="block text-sm font-primaryMedium mb-2 text-light-color2 dark:text-color2"
                    >
                        عنوان پیشنهاد
                    </label>
                    <input
                        id="proposal-title"
                        type="text"
                        value={proposal.title}
                        onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                        className="w-full p-2 sm:p-3 border border-light-color6 dark:border-color6 rounded-lg bg-light-color5 dark:bg-color6 text-light-color2 dark:text-color2 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                        aria-required="true"
                    />
                </div>

                {/* توضیحات پیشنهاد */}
                <div>
                    <label
                        htmlFor="proposal-content"
                        className="block text-sm font-primaryMedium mb-2 text-light-color2 dark:text-color2"
                    >
                        توضیحات پیشنهاد
                    </label>
                    <textarea
                        id="proposal-content"
                        value={proposal.content}
                        onChange={(e) => setProposal({ ...proposal, content: e.target.value })}
                        className="w-full p-2 sm:p-3 border border-light-color6 dark:border-color6 rounded-lg bg-light-color5 dark:bg-color6 text-light-color2 dark:text-color2 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                        rows={4}
                        aria-required="true"
                    />
                </div>

                {/* بودجه پیشنهادی */}
                <div>
                    <label
                        htmlFor="proposed-budget"
                        className="block text-sm font-primaryMedium mb-2 text-light-color2 dark:text-color2"
                    >
                        مبلغ پیشنهادی (تومان)
                    </label>
                    <input
                        id="proposed-budget"
                        type="number"
                        value={proposal.proposedBudget}
                        onChange={(e) => setProposal({ ...proposal, proposedBudget: e.target.value })}
                        className="w-full p-2 sm:p-3 border border-light-color6 dark:border-color6 rounded-lg bg-light-color5 dark:bg-color6 text-light-color2 dark:text-color2 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                        min="0"
                        aria-required="true"
                    />
                </div>

                {/* مدت زمان تخمینی */}
                <div>
                    <label
                        htmlFor="estimated-duration"
                        className="block text-sm font-primaryMedium mb-2 text-light-color2 dark:text-color2"
                    >
                        مدت زمان تخمینی (روز)
                    </label>
                    <input
                        id="estimated-duration"
                        type="number"
                        value={proposal.estimatedDuration}
                        onChange={(e) => setProposal({ ...proposal, estimatedDuration: e.target.value })}
                        className="w-full p-2 sm:p-3 border border-light-color6 dark:border-color6 rounded-lg bg-light-color5 dark:bg-color6 text-light-color2 dark:text-color2 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                        min="0"
                        aria-required="true"
                    />
                </div>

                {/* بخش‌های پروژه (Milestones) */}
                <div>
                    <label className="block text-sm font-primaryMedium mb-2 text-light-color2 dark:text-color2">
                        بخش‌های پروژه (اختیاری)
                    </label>
                    <div className="space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                                type="text"
                                placeholder="نام بخش"
                                value={newMilestone.name}
                                onChange={(e) => setNewMilestone({ ...newMilestone, name: e.target.value })}
                                className="p-2 border border-light-color6 dark:border-color6 rounded-lg bg-light-color5 dark:bg-color6 text-light-color2 dark:text-color2 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                            />
                            <input
                                type="number"
                                placeholder="مبلغ (تومان)"
                                value={newMilestone.amount || ''}
                                onChange={(e) => setNewMilestone({ ...newMilestone, amount: Number(e.target.value) })}
                                className="p-2 border border-light-color6 dark:border-color6 rounded-lg bg-light-color5 dark:bg-color6 text-light-color2 dark:text-color2 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                min="0"
                            />
                            <input
                                type="number"
                                placeholder="مدت زمان (روز)"
                                value={newMilestone.durationDays || ''}
                                onChange={(e) => setNewMilestone({ ...newMilestone, durationDays: Number(e.target.value) })}
                                className="p-2 border border-light-color6 dark:border-color6 rounded-lg bg-light-color5 dark:bg-color6 text-light-color2 dark:text-color2 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4"
                                min="0"
                            />
                        </div>
                        <button
                            onClick={addMilestone}
                            className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color1 dark:text-color1 rounded hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                            aria-label="افزودن بخش جدید به پروژه"
                        >
                            افزودن بخش
                        </button>
                    </div>
                    {proposal.milestones.length > 0 && (
                        <ul className="mt-4 space-y-2">
                            {proposal.milestones.map((milestone, index) => (
                                <li key={index} className="text-light-color3 dark:text-color3">
                                    {milestone.name} - {milestone.amount.toLocaleString()} تومان - {milestone.durationDays} روز
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onSubmit}
                    className="w-full bg-light-color4 hover:bg-light-color8 dark:bg-color4 dark:hover:bg-color8 text-light-color1 dark:text-color1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-colors font-primaryMedium"
                    aria-label="ارسال پیشنهاد پروژه"
                >
                    <IoMdSend /> ارسال پیشنهاد
                </motion.button>
            </div>
        </div>
    );
};

export default ProposalTab;