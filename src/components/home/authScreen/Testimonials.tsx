import { cn } from "@/lib/utils";
import Marquee from "../../magicUI/marquee";
import { Inria_Sans, Inria_Serif } from "next/font/google";

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})

const inria=Inria_Serif({
    display:'swap',
    subsets:['latin'],
    weight:["300" ,"400","700"]
})

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4",
                // light styles
                " bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                " dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className={"text-sm font-medium dark:text-white "+(inria2.className)}>
                        {name}
                    </figcaption>
                    <p className={"text-xs font-medium dark:text-white/40 "+(inria.className)}>{username}</p>
                </div>
            </div>
            <blockquote className={"mt-2 text-sm "+(inria.className)}>{body}</blockquote>
        </figure>
    );
};

const Testimonials = () => {
    return (
        <div className="">
            <p className={"text-3xl md:text-5xl tracking-tight mt-4 mb-4 font-semibold text-center " + (inria2.className)}>
                Why <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>Choose Us</span>
            </p>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-black py-20 md:shadow-xl">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg from-white dark:from-background"></div>
        </div>
        </div>
        
    );
};

export default Testimonials;
