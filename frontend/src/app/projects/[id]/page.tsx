// src/app/projects/[id]/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { FaClock, FaRegCommentDots, FaDollarSign, FaInfoCircle, FaProjectDiagram, FaShieldAlt } from 'react-icons/fa';
import { MdOutlineMoreTime } from 'react-icons/md';
import { useAuth } from '@/components/lib/useAuth';
import DescriptionTab from '@/components/TabsInprojectId/DescriptionTab';
import Tabs from '@/components/TabsInprojectId/Tabs';
import DetailsTab from '@/components/TabsInprojectId/DetailsTabProps';
import ProposalTab from '@/components/TabsInprojectId/ProposalTabProps';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

interface Skill {
    id: number;
    name: string;
}

interface Milestone {
    name: string;
    amount: number;
    durationDays: number;
}

interface Project {
    id: string;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    skills: Skill[] | null | undefined;
    category: { id: string; name: string } | null | undefined;
    suggested: number;
    deadline: number;
    status: 'PENDING' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    createdDate: [number, number, number] | null | undefined;
    active?: boolean;
    type?: string;
    suggestions?: any;
    endDate?: string | null;
    employerId: {
        id: string;
        email: string;
        role: string;
    };
}

const ProjectId = () => {
    const router = useRouter();
    const params = useParams();
    const { userId } = useAuth();
    const [proposal, setProposal] = useState<{
        title: string;
        content: string;
        proposedBudget: string;
        estimatedDuration: string;
        milestones: Milestone[];
    }>({
        title: '',
        content: '',
        proposedBudget: '',
        estimatedDuration: '',
        milestones: [],
    });
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const projectId = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);

                if (!projectId) {
                    throw new Error('شناسه پروژه نامعتبر است');
                }

                const { data } = await api.get<Project>(`app/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                });

                console.log('داده پروژه:', data);

                // اعتبارسنجی داده‌ها
                if (!data.skills) {
                    data.skills = [];
                }
                if (!data.category) {
                    data.category = { id: '', name: 'نامشخص' };
                }
                if (!data.createdDate) {
                    const today = new Date();
                    data.createdDate = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
                }

                setProject(data);
                setError(null);
            } catch (err: any) {
                console.error('خطا در دریافت پروژه:', err);
                setError('پروژه مورد نظر یافت نشد');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId, router]);

    const handleSubmitProposal = async () => {
        try {
            if (!userId) {
                throw new Error('شناسه کاربر یافت نشد');
            }
            if (!proposal.title || !proposal.content || !proposal.proposedBudget || !proposal.estimatedDuration) {
                alert('لطفاً تمام فیلدهای اجباری را پر کنید');
                return;
            }
            if (proposal.milestones.some((m) => !m.name || m.amount <= 0 || m.durationDays <= 0)) {
                alert('لطفاً تمام فیلدهای بخش‌های پروژه را به درستی پر کنید');
                return;
            }

            const payload = {
                projectId: { id: Number(projectId) },
                freelancerId: { id: Number(userId) },
                title: proposal.title,
                content: proposal.content,
                proposedBudget: Number(proposal.proposedBudget),
                estimatedDuration: Number(proposal.estimatedDuration),
                status: 'PENDING',
                milestones: proposal.milestones.map((milestone) => ({
                    name: milestone.name,
                    amount: milestone.amount,
                    durationDays: milestone.durationDays,
                })),
            };

            console.log('ارسال payload:', payload);

            const { data } = await api.post('/app/createSuggest', payload, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            });

            console.log('پیشنهاد ثبت شد:', data);
            alert('پیشنهاد با موفقیت ارسال شد!');
            setProposal({
                title: '',
                content: '',
                proposedBudget: '',
                estimatedDuration: '',
                milestones: [],
            });
        } catch (err: any) {
            console.error('خطا در ارسال پیشنهاد:', err);
            alert(`خطا در ارسال پیشنهاد: ${err.response?.data?.message || err.message}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-color1 dark:bg-color1">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-color4 dark:border-color4"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-light-color1 dark:bg-color1 text-light-color9 dark:text-color9">
                <h1 className="text-2xl mb-4">{error}</h1>
                <button
                    onClick={() => router.push('/projects')}
                    className="px-4 py-2 bg-light-color4 dark:bg-color4 text-light-color1 dark:text-color1 rounded hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                >
                    بازگشت به لیست پروژه‌ها
                </button>
            </div>
        );
    }

    const tabs = [
        {
            id: 'description' as const,
            label: 'توضیحات',
            icon: <FaInfoCircle />,
            content: <DescriptionTab description={project.description} />,
        },
        {
            id: 'details' as const,
            label: 'جزئیات',
            icon: <FaProjectDiagram />,
            content: (
                <DetailsTab
                    skills={project.skills}
                    category={project.category}
                    deadline={project.deadline}
                    createdDate={project.createdDate}
                />
            ),
        },
        {
            id: 'proposal' as const,
            label: 'ارسال پیشنهاد',
            icon: <FaShieldAlt />,
            content: (
                <ProposalTab
                    proposal={proposal}
                    setProposal={setProposal}
                    onSubmit={handleSubmitProposal}
                />
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-light-color1 dark:bg-color1">
            <div className="bg-light-color5 dark:bg-color5 rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
                    <div className="mb-4 md:mb-0 w-full md:w-auto">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-light-color5 dark:bg-color6 text-light-color4 dark:text-color4 text-sm">
                            <MdOutlineMoreTime className="mr-2" />
                            {project.status === 'OPEN' && 'باز'}
                            {project.status === 'COMPLETED' && 'تکمیل شده'}
                            {project.status === 'CANCELLED' && 'لغو شده'}
                        </span>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-primaryBold mt-3 text-light-color2 dark:text-color2">
                            {project.subject}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <StatCard
                        icon={<FaClock />}
                        title="زمان باقیمانده"
                        value={`${project.deadline} روز`}
                    />
                    <StatCard
                        icon={<FaRegCommentDots />}
                        title="پیشنهادها"
                        value={project.suggested.toString()}
                    />
                    <StatCard
                        icon={<FaDollarSign />}
                        title="بودجه"
                        value={`${project.priceStarted.toLocaleString()} - ${project.priceEnded.toLocaleString()} تومان`}
                    />
                </div>

                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-light-color5 dark:bg-color6 p-3 sm:p-4 rounded-lg flex items-center gap-3 sm:gap-4"
    >
        <div className="bg-light-color4 bg-opacity-10 dark:bg-color4 dark:bg-opacity-10 p-2 rounded-full text-light-color4 dark:text-color4">
            {icon}
        </div>
        <div>
            <p className="text-xs sm:text-sm text-light-color7 dark:text-color7">{title}</p>
            <p className="font-primaryMedium text-light-color2 dark:text-color2">{value}</p>
        </div>
    </motion.div>
);

export default ProjectId;