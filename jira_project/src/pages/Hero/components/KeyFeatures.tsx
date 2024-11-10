interface Features {
    title: string,
    description: string,
    icon: JSX.Element
}

export const KeyFeatures = ({ features }: { features: Features[] }) => {
    return (
        <div className="rounded-[10px] bg-[#101825] min-h-[52rem] md:min-h-[28rem] flex items-center justify-center px-4">
            <div className="w-full max-w-[80rem]">
                <div className="font-bold text-3xl text-center mb-8">
                    Key Features
                </div>

                <div className="grid grid-cols-12 gap-4">
                    {features.map((feature: Features, index) => (
                        <div
                            key={index}
                            className="col-span-12 md:col-span-4 rounded-[18px] bg-[#1f2935] p-4 flex flex-col items-center text-center"
                        >
                            <div>{feature.icon}</div>
                            <div className="mt-2 font-semibold">
                                {feature.title}
                            </div>
                            <div className="mb-2 mt-2 text-gray-200">
                                {feature.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
