import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = () => {
    const activeClass = "px-3 py-1 text-sm text-white bg-blue-500 border border-blue-500 rounded";
    const inactiveClass = "px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-blue-500 hover:text-white";

    return <div className="flex justify-center ">
        <nav>
            <ul className="flex list-none space-x-2">
                <li className="cursor-pointer">
                    <ChevronLeft></ChevronLeft>
                </li>

                <li>
                    <a href="#" className={inactiveClass}>1</a>
                </li>

                <li>
                    <a href="#" className={inactiveClass}>2</a>
                </li>

                <li>
                    <a href="#" className={activeClass}>3</a>
                </li>

                <li>
                    <a href="#" className={inactiveClass}>4</a>
                </li>

                <li className="cursor-pointer">
                    <ChevronRight></ChevronRight>
                </li>
            </ul>
        </nav>
    </div>;
}