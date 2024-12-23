"use client"

import QuestionCard from "@bioverse-intake/components/question-card"
import { useGetQuestionnaire, Questionnaire } from "@bioverse-intake/hooks/get-questionnaire"
import React from "react"
import { useRouter } from "next/navigation"
import NavBar from "@bioverse-intake/components/navbar"

/*
    UI DESIGN:
        CENTER BLOCK
            HEADER
            SUBJECT TEXT
            QUESTION CARDS [FLEX WRAP][NAVIGATE]
*/
const Dashboard = () => {

    const router = useRouter()

    const { data, error, loading } = useGetQuestionnaire();

    const navigateToQuestion = React.useCallback((id: number) => {
        router.push(`/question/${id}`);
    }, [])

    /* Simple Auth */
    const [authLoading, setAuthLoading] = React.useState(true)
    React.useEffect(() => {
        const user = localStorage.getItem("user");
        if (user === null) {
            router.push('/')
        } else {
            setAuthLoading(false)
        }
    }, [router])
    if (authLoading) return null

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const sectionKeys: Questionnaire[] = data ?? [];

    return (
        <React.Fragment>
            <header>
                <NavBar />
            </header>
            <main>
                <section>
                    <div className="pt-16 flex flex-col justify-center items-center">
                        <h1 className="text-[#286ba2] low-res-viewpoint-h1 text-6xl font-bold">Welcome to the Questionnaire Section</h1>
                        <p className="text-lg font-normal low-res-viewpoint-p">Select one of the sections below to begin the intake form</p>
                    </div>
                </section>
                <section>
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex-wrap py-[72px] flex justify-center gap-[50px]">
                            {sectionKeys.map((value) => (
                                <QuestionCard 
                                    key={value._id} 
                                    sectionName={value.value}
                                    onClick={() => navigateToQuestion(value._id)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <div className="flex justify-center items-center py-8">
                    <span className="text-gray-600">You are currently logged in as a user</span>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Dashboard