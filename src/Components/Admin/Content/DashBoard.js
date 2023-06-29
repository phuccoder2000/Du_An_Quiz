import "./DashBoard.scss"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverview } from "../../../services/apiService";
import { useState } from "react";
import { useEffect } from "react";

const DashBoard = (props) => {
    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchDataOverView()
    }, [])
    const fetchDataOverView = async () => {
        let res = await getOverview()
        if (res && res.EC === 0) {
            setDataOverView(res.DT)

            // process chart data
            let Qz = 0, Qs = 0, As = 0
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Question",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                },

            ]
            setDataChart(data)
        }
        // console.log(res)
    }


    return (
        <div className="doashboar-container">
            <div className="title">
                Analytics Dashboard
            </div>
            <div className="content">
                <div className="content-left">
                    <div className="child">
                        <span className="text-1">Total users</span>
                        <span className="text-2">{dataOverView && dataOverView.users
                            && dataOverView.users.total ?
                            <>{dataOverView.users.total}</> : <>0</>
                        }</span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total quizs</span>
                        <span className="text-2">{dataOverView && dataOverView.others
                            && dataOverView.others.countQuiz ?
                            <>{dataOverView.others.countQuiz}</> : <>0</>
                        }</span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total questions</span>
                        <span className="text-2">{dataOverView && dataOverView.others
                            && dataOverView.others.countQuestions ?
                            <>{dataOverView.others.countQuestions}</> : <>0</>
                        }</span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total answers</span>
                        <span className="text-2">{dataOverView && dataOverView.others
                            && dataOverView.others.countAnswers ?
                            <>{dataOverView.others.countAnswers}</> : <>0</>
                        }</span>
                    </div>

                </div>
                <div className="content-right">
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}
export default DashBoard