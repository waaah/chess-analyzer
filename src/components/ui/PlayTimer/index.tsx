import { PlayerColor } from '@/types/chess';
import { Clock } from 'lucide-react';
import { CSSProperties } from 'react';

interface PlayTimerProps {
    color: PlayerColor
    style?: CSSProperties
    className?: string
}
export const PlayTimer = (props: PlayTimerProps) => {
    const style = props.color == PlayerColor.WHITE ? 'bg-white text-black border border-black' : 'border border-white bg-black text-white'
    return <div style={props.style} className={`flex items-center gap-2 text-md font-bold w-20 p-2 ${style} ${props.className}`}> <Clock />5:00</div >
}