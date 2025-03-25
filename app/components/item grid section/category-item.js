"use-client";

export default function CategoryItem({ itemGridEnabled, enableItemGrid, name, categoryPage, setCategoryPage }) {

    function onClick() {
        setCategoryPage(name);
    }

    return (
        <div onClick={itemGridEnabled ? onClick : undefined} className="cursor-pointer text-center flex flex-col justify-center h-[7.8vw] w-[9.12vw] bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-[0.84vw]">
            <h1>{name}</h1>
        </div>
    );

}