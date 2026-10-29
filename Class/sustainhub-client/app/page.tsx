'use client';
import {useState} from 'react';

const HelloComponent = ({ message, alertStyle = 'bg-transparent' }: { message: string, alertStyle?: string })=> (
    <div className={alertStyle}> <p>{message}</p> </div>
)
  
export default function Home() {
  const [index, setIndex] = useState<number>(0);

  const onClickButton= () => {
    setIndex(index + 1);
    console.log(index);
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HelloComponent message={`Helo WOrld ${index}`}/>
      <button className="btn btn-sm" onClick={onClickButton}> click me </button>
    </div>
  );
}