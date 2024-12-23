"use client"

import NavBar from '@bioverse-intake/components/navbar';
import { useParams, useRouter } from 'next/navigation';
import { FormInput, FormRadio }from '@bioverse-intake/components/form-options';
import { useGetQuestionsById } from '@bioverse-intake/hooks/use-get-questionbyid';
import React from 'react';
import { useAddQuestionEntries } from '@bioverse-intake/hooks/add-question-entries';
import { useGetAnswersByUser } from '@bioverse-intake/hooks/get-answersbyuser';
import { useGetQuestionnaireById } from '@bioverse-intake/hooks/get-questionnairebyid';


type Question = {
    _id: number,
    type: string,
    options?: string[],
    question: string
}

const Question = () => {

    const params = useParams()
    const id = params.id as string
    const router = useRouter()
    const user = React.useMemo(() => localStorage.getItem("user"), [])
    const { data, error, loading } = useGetQuestionsById(id)
    const { data: userAnswerData, loading: loadingAnswers, error: errorAnswers } = useGetAnswersByUser(user ?? "")
    const { data: questData, loading: loadingQuest, error: errorQuest } = useGetQuestionnaireById(id)
    const { addResponses } = useAddQuestionEntries()
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
    const questions = data || []
    const questionIds = questions.map((val: { _id: any; }) => val._id)
    const currentQuestion = questions[currentQuestionIndex]
    const [form, setForm] = React.useState<Record<number, any>>({})
    const formPopulated = React.useRef<Record<number, boolean>>({})

    const handleQuestionNavigation = React.useCallback(async (type: string) => {
        const currentAnswer = form[currentQuestionIndex]
        if (!currentAnswer || (currentAnswer.length == 0) || (currentQuestion.type === "input" && !/\S/.test(currentAnswer))) {
            alert("Answer the question completely!")
            return;
        }
        if (type === "normal") {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else if (type === "submit") {
            await addResponses(localStorage.getItem('user') ?? "", form, questionIds, id, questData ?? "")
            router.push('/dashboard')
        }
    }, [currentQuestionIndex, form])

    const populateForm = React.useCallback(
        (value: any) => {
            setForm((prevForm) => {
                const updatedForm = {
                    ...prevForm,
                    [currentQuestionIndex]: value,
                };
                return updatedForm;
            })
        },
        [currentQuestionIndex, form]
    )

    React.useEffect(() => {
        if (userAnswerData && currentQuestionIndex < questionIds.length) {
            const currentQuestionId = questionIds[currentQuestionIndex]
            const existingAnswer = userAnswerData[0]?.answers[currentQuestionId];

            if (existingAnswer && !formPopulated.current[currentQuestionIndex]) {
                populateForm(existingAnswer.answer)
                formPopulated.current[currentQuestionIndex] = true
            }
        }
    }, [currentQuestionIndex, userAnswerData, questionIds, form, populateForm]);

    
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

    if (loading || loadingAnswers) return <p>Loading...</p>
    if (error || errorAnswers) return <p>Error: {error ?? errorAnswers}</p>

    return (
        <React.Fragment>
            <header>
                <NavBar />
            </header>
            <main>
                <section>
                    <div className="flex justify-center items-center py-16 flex-col">
                        
                        <div className="px-6">
                            {currentQuestion.type === "mcq" ? (
                                <FormRadio
                                    question={currentQuestion.question}
                                    options={currentQuestion.options ?? []}
                                    onChange={populateForm}
                                    value={form[currentQuestionIndex] ?? (currentQuestion.question.includes("Select all") ? [] : null)}
                                />
                            ) : (
                                <FormInput 
                                    question={currentQuestion.question}
                                    onChange={populateForm}
                                    value={form[currentQuestionIndex] ?? ""}
                                />
                            )}
                            <div className="flex justify-end mt-4">
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <button onClick={() => handleQuestionNavigation("normal")} className="bg-[#286ba2] rounded-full py-3 px-8 hover:bg-[#3b8fd6] flex flex-row justify-center items-center gap-2">
                                        <span className="text-white text-base font-semibold">Next</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" fill="white" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </button>
                                ) : (
                                    <button onClick={() => handleQuestionNavigation("submit")} className="bg-[#286ba2] rounded-full py-3 px-8 hover:bg-[#3b8fd6] flex flex-row justify-center items-center gap-2">
                                        <span className="text-white text-base font-semibold">Submit</span>
                                    </button>
                                )}
                            </div>
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

export default Question