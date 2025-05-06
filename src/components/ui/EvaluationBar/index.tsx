interface EvalBarProps {
    blackEval: number
    whiteEval: number
}

export const EvalBar = (props: EvalBarProps) => {
    return <div className="flex-col border border-gray w-[20px] h-[560px] flex">
        <div className="bg-white w-full" style={{ height: '50%' }}></div>
        <div className="bg-black w-full" style={{ height: '50%' }}></div>
    </div >
}