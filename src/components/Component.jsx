export const Component = ({ id, img, desc, title }) => {

    return (
        <div className="flex flex-col pb-5">
            <h4 className="text-xl pb-5 font-semibold text-center bg-teal-400 rounded-md mb-4">{title}</h4>
            <div className="flex flex-row">
                {
                    id % 2 == 0 ?
                        <div className="basis-1/3 text-center rounded-md">
                            <img src={img} alt={title} className="w-40 mx-auto" />
                        </div>
                        :
                        <div className="basis-2/3 border px-5 rounded-md">
                            <p>
                                {desc}
                            </p>
                        </div>
                }
                {
                    id % 2 != 0 ?
                        <div className="basis-1/3 text-center">
                            <img src={img} alt={title} className="w-40 mx-auto" />
                        </div>
                        :
                        <div className="basis-2/3 border px-5 rounded-md">
                            <p>
                                {desc}
                            </p>
                        </div>
                }
            </div>
        </div>
    )
}