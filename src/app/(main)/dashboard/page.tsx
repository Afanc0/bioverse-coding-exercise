
import QuestionCard from "@bioverse-intake/components/question-card"
import { useQuestionTypes } from "@bioverse-intake/hooks/QuestionTypes"
import { BioverseLogo } from "@bioverse-intake/components/bioverse-logo"
import React from "react"
import Button from "@bioverse-intake/components/button"

/*
    UI DESIGN:
        CENTER BLOCK
            HEADER
            SUBJECT TEXT
            QUESTION CARDS [FLEX WRAP][NAVIGATE]
*/
const Dashboard = () => {

    const { selection, keys } = useQuestionTypes()

    return (
        <React.Fragment>
            <header>
                <div className="py-8 px-8 border-b-2 flex flex-row justify-between">
                    <div className="flex-1">
                        <BioverseLogo width="250"/>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button className="bg-[#286ba2] rounded-full py-3 px-8 hover:bg-[#3b8fd6]">
                            <span className="text-white text-base font-semibold">Sign Out</span>
                        </button>
                    </div>
                </div>
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
                            {keys.map((value) => (
                                <QuestionCard key={value} sectionName={selection[value]} />
                            ))}
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="flex justify-center items-center py-8">
                        <span className="text-gray-600">You are currently logged in as a user</span>
                    </div>
                </footer>
            </main>
        </React.Fragment>
    )
}

export default Dashboard