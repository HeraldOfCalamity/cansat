export const Component = ({ img, desc, title }) => {

    return (
        <div className="flex flex-col pb-5 border">
            <h4 className="pb-5 font-semibold text-center bg-teal-400">{title}</h4>
            <div className="flex flex-row">
                <div className="basis-1/3 text-center border">
                    <img src={img} alt={title} className="w-40 mx-auto"/>
                </div>
                <div className="basis-2/3 border px-5">
                    <p>
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    )
}