export interface Employer {
    id: number;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
}

export interface Skill {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    parentCategory: Category | null;
}

export interface Project {
    id: number;
    subject: string;
    description: string;
    priceStarted: number;
    priceEnded: number;
    deadline: number;
    createdDate: string | null;
    endDate: string | null;
    type: string;
    status: string;
    active: boolean;
    suggested: number;
    employerId: Employer | null;
    category: Category | null;
    skills: Skill[] | null;
    suggestions: any[] | null;
}

export interface Proposal {
    id: number;
    projectId: Project;
    freelancerId: {
        id: number;
        email: string;
        role: string;
    };
    title: string | null;
    content: string | null;
    proposedBudget: number | null;
    estimatedDuration: number | null;
    submittedAt: string;
    status: string | null;
    assigned: boolean;
    milestones: any[] | null;
    startChat?: boolean;
}