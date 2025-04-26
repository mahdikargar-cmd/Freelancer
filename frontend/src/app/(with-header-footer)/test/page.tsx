'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import API from "@/components/utils/api";
interface Employer {
  id: number;
  email: string;
  password: string;
}
interface Skill {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  parentCategory: Category | null;
}
interface Project {
  id: number;
  subject: string;
  description: string;
  priceStarted: number;
  priceEnded: number;
  skills: Skill[];
  category: Category;
  suggested: number;
  deadline: number;
  type: "FIXED" | "HOURLY";
  suggestions: any[];
  createdDate: string;
  endDate: string;
  status: "OPEN" | "CLOSED";
  employerId: Employer;
}

interface ApiResponse {
  content: Project[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

const ProjectList: React.FC = () => {
  const token = Cookies.get("token");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (page: number = 0, size: number = 3): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API}/app/getProjects?page=${page}&size=${size}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // بررسی کامل ساختار پاسخ
      if (!data || !data.content || !Array.isArray(data.content)) {
        throw new Error('Invalid data structure from API');
      }

      setProjects(data.content);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error("Error fetching projects:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const handlePrevious = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page: number): void => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="project-container">
      <h2>لیست پروژه‌ها</h2>
      {loading ? (
        <div className="loading-indicator">در حال بارگذاری...</div>
      ) : error ? (
        <div className="error-message">خطا: {error}</div>
      ) : projects.length === 0 ? (
        <div className="no-projects">پروژه‌ای یافت نشد</div>
      ) : (
        <>
          <ul className="project-list">
            {projects.map((project) => (
              <li key={project.id} className="project-item">
                <h3>{project.subject}</h3>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
          <div className="pagination-controls">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="pagination-button"
            >
              قبلی
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                disabled={currentPage === i}
                className={`page-number ${currentPage === i ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="pagination-button"
            >
              بعدی
            </button>
          </div>

          <div className="page-info">
            صفحه {currentPage + 1} از {totalPages}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectList;