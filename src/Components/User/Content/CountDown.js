import { useEffect, useState } from "react"


const CountDown = (props) => {
    const [count, setCount] = useState(600)
    useEffect(() => {
        if (count === 0) {
            props.onTimeUp();
            return;
        };
        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000);

        /*
        timer1 :  setcount => hane count
        ===
        timer2 :  setcount => hane count
        */
        //   Clean up
        return () => {
            clearInterval(timer)
        }
    }, [count]);

    const ToHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10); // don't forget the second param
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num / 60) % 60);
        const seconds = sec_num % 60


        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    return (
        <div className="countdown-container">
            {ToHHMMSS(count)}
        </div>
    )
}
export default CountDown