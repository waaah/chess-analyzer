import { GameResult } from "@/types/chess";
import { Minus, Plus } from "lucide-react";

export const ResultIcon = (props: { result: GameResult }) => {
  let color: string = "";
  const { result } = props;

  if (result === GameResult.WIN) color = "text-green-400";
  if (result === GameResult.LOSE) color = "text-red-400";
  if (result === GameResult.DRAW) color = "text-gray-400";

  return (
    <span className={color}>
      {result === GameResult.WIN ? <Plus size={15} /> : <Minus size={15} />}
    </span>
  );
};
