import {useEffect, useState} from 'react'

function Qrdle(){

    const [guess, setGuess] = useState("");
    const [correct, setCorrect] = useState(false);

    const guessHandler = (letter) => {
        if(guess.length < 5 && letter.length == 1){
            setGuess(guess + "Q")
        }
        else if(letter == "Enter" && guess.length === 5){
            console.log("submit guess!")
            setCorrect(true)
        }
        else if(letter == "Backspace"){
            setGuess(guess.substring(0,guess.length-1))
        }
    }

    console.log(guess)
    return(
        <main className="bg-white h-screen flex flex-col items-center justify-between">

            <header className="p-6 text-sm">qrdle</header>
            <section className='flex gap-1'>

                
                <GuessTile letter={guess.substring(0,1)} correct={correct} />
                <GuessTile letter={guess.substring(1,2)} correct={correct} />
                <GuessTile letter={guess.substring(2,3)} correct={correct} />
                <GuessTile letter={guess.substring(3,4)} correct={correct} />
                <GuessTile letter={guess.substring(4,5)} correct={correct} />

            </section>
            <section className='mb-6'>
                <div className='flex gap-1 justify-center'>
                    <Key letter={"Q"} guessHandler={guessHandler} />
                    <Key letter={"W"} guessHandler={guessHandler}/>
                    <Key letter={"E"} guessHandler={guessHandler}/>
                    <Key letter={"R"} guessHandler={guessHandler}/>
                    <Key letter={"T"} guessHandler={guessHandler}/>
                    <Key letter={"Y"} guessHandler={guessHandler}/>
                    <Key letter={"U"} guessHandler={guessHandler}/>
                    <Key letter={"I"} guessHandler={guessHandler}/>
                    <Key letter={"O"} guessHandler={guessHandler}/>
                    <Key letter={"P"} guessHandler={guessHandler}/>
                </div>
                <div className='flex gap-1 justify-center mt-1'>
                    <Key letter={"A"} guessHandler={guessHandler}/>
                    <Key letter={"S"} guessHandler={guessHandler}/>
                    <Key letter={"D"} guessHandler={guessHandler}/>
                    <Key letter={"F"} guessHandler={guessHandler}/>
                    <Key letter={"G"} guessHandler={guessHandler}/>
                    <Key letter={"H"} guessHandler={guessHandler}/>
                    <Key letter={"J"} guessHandler={guessHandler}/>
                    <Key letter={"K"} guessHandler={guessHandler}/>
                    <Key letter={"L"} guessHandler={guessHandler}/>
                </div>
                <div className='flex gap-1 justify-center mt-1'>
                    <Key letter={"Enter"} guessHandler={guessHandler}/>
                    <Key letter={"Z"} guessHandler={guessHandler}/>
                    <Key letter={"X"} guessHandler={guessHandler}/>
                    <Key letter={"C"} guessHandler={guessHandler}/>
                    <Key letter={"V"} guessHandler={guessHandler}/>
                    <Key letter={"B"} guessHandler={guessHandler}/>
                    <Key letter={"N"} guessHandler={guessHandler}/>
                    <Key letter={"M"} guessHandler={guessHandler}/>
                    <Key letter={"Backspace"} guessHandler={guessHandler}/>
                </div>
            </section>

        </main>
    )

}

const Key = ({letter, guessHandler}) => { 
    return(
        <div  onClick={()=> guessHandler(letter)} className='p-6 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400'>{letter}</div>
    )
}

const GuessTile = ({letter, correct}) => { 
    return (
        <>
        {correct ?
        <div  className='w-24 h-24 bg-green-500 text-white rounded-md cursor-none flex justify-center items-center text-4xl font-bold pointer-events-none'>{letter}</div> 
        :
        <div  className='w-24 h-24 bg-gray-300 rounded-md cursor-none flex justify-center items-center text-4xl font-bold pointer-events-none' >{letter}</div>
        }
        </>
    )
}



export default Qrdle
