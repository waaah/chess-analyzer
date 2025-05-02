interface EvalBarProps {
    blackEval: number
    whiteEval: number
}

export const EvalBar = (props: EvalBarProps) => {
    return <div className="flex-col border border-gray flex w-[20px] h-full">
        <div className="bg-white w-full h-[50%]"></div>
        <div className="bg-black w-full h-[50%]"></div>
    </div>
}