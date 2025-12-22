import { type FC } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const quotes = [
    { text: "I am vengeance!", offset: 0.1 },
    { text: "I am the night!", offset: 0.15 },
    { text: "I am Batman!", offset: 0.2 },
    { text: "They think I'm hiding in the shadows. But I am the shadows!", offset: 0.3 },
    { text: "You either die a hero, or you live long enough to see yourself become the villain.", offset: 0.4 },
    { text: "Your not brave! Men are brave!", offset: 0.5 },
    { text: "It’s not who I am underneath, but what I do that defines me.", offset: 0.6 },
    { text: "A hero can be anyone", offset: 0.7 },
    { text: "Tell me, do you bleed? I'll make you bleed!", offset: 0.8 },
    { text: "Everything's impossible until somebody does it.", offset: 0.9 },
    { text: "Oh, you think darkness is your ally. But you merely adopted the dark; I was born in it, moulded by it.", offset: 0.96 },
];

const Dialogue: FC = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed top-1/2 left-0 w-full pointer-events-none z-40 mix-blend-difference flex justify-center -translate-y-1/2 px-10 text-center">
            {quotes.map((q, i) => (
                <Quote key={i} quote={q} progress={scrollYProgress} />
            ))}
        </div>
    );
};

const Quote = ({ quote, progress }: { quote: { text: string, offset: number }, progress: any }) => {
    const opacity = useTransform(
        progress,
        [quote.offset - 0.04, quote.offset, quote.offset + 0.04],
        [0, 1, 0]
    );

    const y = useTransform(
        progress,
        [quote.offset - 0.04, quote.offset + 0.04],
        [40, -40]
    );

    const scale = useTransform(
        progress,
        [quote.offset - 0.04, quote.offset + 0.04],
        [0.8, 1.2]
    );

    return (
        <motion.p
            style={{ opacity, y, scale, display: opacity.get() === 0 ? 'none' : 'block' }}
            className="absolute max-w-5xl text-3xl md:text-5xl lg:text-6xl font-bat italic tracking-widest text-[#d1d1d1] drop-shadow-[0_0_15px_rgba(0,0,0,1)] px-4"
        >
            "{quote.text}"
        </motion.p>
    );
};

export default Dialogue;
