'use client'

import { useState, useEffect, useRef } from "react"
import Cookies from "js-cookie"
import { FiUser, FiMail, FiKey, FiRefreshCw } from "react-icons/fi"
import { FaUserShield, FaUserCog } from "react-icons/fa"

interface UserData {
    id: number,
    email: string,
    password: string,
    role: string
}

const UserList = () => {
    const [users, setUsers] = useState<UserData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const loaderRef = useRef(null)
    const token = Cookies.get("adminToken")

    const fetchUsers = async (pageNumber: number) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/auth/user/${pageNumber}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const userData = await response.json()
                if (userData.id) {
                    setUsers(prev => {
                        if (prev.some(user => user.id === userData.id)) return prev
                        return [...prev, userData]
                    })
                    setPage(pageNumber + 1)
                } else {
                    setHasMore(false)
                }
            } else {
                if (pageNumber === 1) {
                    throw new Error('دسترسی به اطلاعات کاربران ممکن نیست')
                }
                setHasMore(false)
            }
        } catch (err) {
            setError('خطا در دریافت لیست کاربران')
            console.error('Error fetching users:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers(page)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    fetchUsers(page)
                }
            },
            { threshold: 1.0 }
        )

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current)
            }
        }
    }, [page, hasMore, loading])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-color1">
                <div className="bg-color5 p-6 rounded-lg max-w-md text-center">
                    <h2 className="text-xl font-primaryBold mb-4">خطا در دریافت داده‌ها</h2>
                    <p className="text-color7 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-color4 text-color5 px-4 py-2 rounded-md font-primaryMedium hover:bg-color8 transition-colors"
                    >
                        <FiRefreshCw className="inline mr-2" />
                        تلاش مجدد
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-color6 p-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-primaryBold text-color4 mb-6 flex items-center gap-2">
                    <FaUserShield className="text-color4" />
                    مدیریت کاربران
                </h1>

                {users.length === 0 && !loading ? (
                    <div className="bg-color5 rounded-xl p-4 text-center shadow">
                        <p className="text-color7 font-primaryMedium">هیچ کاربری یافت نشد</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {users.map(user => (
                            <div
                                key={`user-${user.id}-${user.email}`}
                                className="bg-color5 rounded-2xl px-4 py-3 shadow-md hover:shadow-color4/10 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-color6 p-2 rounded-full">
                                        <FiUser className="text-color4" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-color2 font-primaryBold text-base">{user.email}</h3>
                                            <span className="flex items-center gap-1 bg-color1 text-color4 px-2 py-0.5 rounded-full text-xs font-primaryMedium">
                                                <FaUserCog size={12} />
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center text-color7 text-xs gap-1">
                                            <FiMail className="mr-1" size={12} />
                                            <span className="font-primaryRegular text-base">{user.email}</span>
                                        </div>
                                        <div className="mt-1 flex items-center text-color7 text-sm gap-1">
                                            <FiKey className="mr-1" size={12} />
                                            <span className="font-primaryRegular">{user.password}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* بارگذاری */}
                        <div ref={loaderRef} className="py-4 text-center">
                            {loading && (
                                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-color4 border-t-transparent"></div>
                            )}
                            {!hasMore && users.length > 0 && (
                                <p className="text-color7 text-sm font-primaryMedium">تمام کاربران نمایش داده شدند</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserList