"use-client";

export default function GridItem({ id, name, price }) {
    return (
        <div className="text-center flex flex-col justify-center h-full bg-sky-300" key={id}>
            <h2>{id}</h2>
            <h1>{name}</h1>
            <h3>{price}</h3>
            <h1>+</h1>
        </div>
    );

}