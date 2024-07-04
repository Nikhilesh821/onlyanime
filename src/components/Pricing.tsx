'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import styles from '../components/styles/pricing.module.css';
import {Inria_Sans, Inria_Serif} from 'next/font/google'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const inria=Inria_Serif({
    display:'swap',
    subsets:['latin'],
    weight:["300" ,"400","700"]
})


const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})

export interface PricingTierFrequency {
    id: string;
    value: string;
    label: string;
    priceSuffix: string;
}

export interface PricingTier {
    name: string;
    id: string;
    href: string;
    discountPrice: string | Record<string, string>;
    price: string | Record<string, string>;
    description: string | React.ReactNode;
    features: string[];
    featured?: boolean;
    highlighted?: boolean;
    cta: string;
    soldOut?: boolean;
    monthlyUrl: string;
	yearlyUrl: string;
    // lifeTimeUrl:string
}

export const frequencies: PricingTierFrequency[] = [
    { id: '1', value: '1', label: 'Monthly', priceSuffix: '/month' },
    { id: '2', value: '2', label: 'Annually', priceSuffix: '/year' },
    // { id: '3', value: '3', label: 'lifetime', priceSuffix: '/lifetime' },
];

export const tiers: PricingTier[] = [
    // {
    //     name: 'Scaler',
    //     id: '0',
    //     href: 'api/auth/login',
    //     price: { '1': '$3.99', '2': '$29.99', '3': '$199.99' },
    //     discountPrice: { '1': '2.99', '2': '24.99', '3': '189.99' },
    //     description: `Get what you paid for. Cancel anytime`,
    //     features: [
    //         `Like our blog`,
    //         `Comment your thoughts`,
    //         `Get access to our content`,
    //     ],
    //     featured: false,
    //     highlighted: false,
    //     soldOut: false,
    //     cta: `Join Us`,
    // },
    // {
    //     name: 'Pro',
    //     id: '1',
    //     href: 'api/auth/login',
    //     price: { '1': '$10.99', '2': '$99.99', '3': '$499.99' },
    //     discountPrice: { '1': '8.99', '2': '95.99', '3': '489.99' },
    //     description: `Get All the content available just at your price. Cancel anytime.`,
    //     features: [
    //         `Get monthly badges`,
    //         `Monthly offers`,
    //         `Limited offers on T-shirts`,
            
    //     ],
    //     featured: true,
    //     highlighted: false,
    //     soldOut: false,
    //     cta: `Join Us`,
    // },
    {
        name: 'Premium',
        id: '0',
        href: 'api/auth/login',
        price: { '1': '$29.99', '2': '$999.99', '3': '$1999.99' },
        discountPrice: { '1': '24.99', '2': '979.99', '3': '1899.99' },
        description: `Get excess to all our exclusive content. Cancel anytime.`,
        features: [
            `All in the premium plan`,
            `Priority support`,
            `Exclusive goodies`,
        ],
        featured: false,
        highlighted: false,
        soldOut: false,
        cta: `Join Us`,
        monthlyUrl:process.env.NODE_ENV==="development"?process.env.NEXT_PUBLIC_STRIPE_PREMIUM_DEV_MONTHLY_URL!:process.env.NEXT_PUBLIC_STRIPE_PREMIUM_LIVE_MONTHLY_URL!,
        yearlyUrl:process.env.NODE_ENV==="development"?process.env.NEXT_PUBLIC_STRIPE_PREMIUM_DEV_YEARLY_URL!:process.env.NEXT_PUBLIC_STRIPE_PREMIUM_LIVE_YEARLY_URL!,
        // lifeTimeUrl:process.env.NODE_ENV==="development"?process.env.NEXT_PUBLIC_STRIPE_PREMIUM_DEV_LIFETIME_URL!:process.env.NEXT_PUBLIC_STRIPE_PREMIUM_LIVE_LIFETIME_URL!
    },
];

const CheckIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn('w-6 h-6', className)}
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export default function PricingPage() {
    const [frequency, setFrequency] = useState(frequencies[0]);

    const bannerText = 'Save 15% on all plans for limited time';
    const tier=tiers[0]
    const monthlyUrl=tier.monthlyUrl
    const yearlyUrl=tier.yearlyUrl
    // const lifeTimeUrl=tier.lifeTimeUrl

    const saveStripeLinkToLocalStorage=(url:string)=>{
        localStorage.setItem('stripeLink', url)
    }

    return (
        <div
            className={cn('flex flex-col w-full items-center', styles.fancyOverlay)}
        >
            <div className="w-full flex flex-col items-center">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
                    <div className="w-full lg:w-auto mx-auto max-w-4xl text-center">
                        <h1 style={{fontSize:"48px"}} className={"text-black dark:text-white text-2xl font-semibold max-w-xs sm:max-w-none !leading-tight "+(inria2.className)}>
                            Pricing
                        </h1>

                    </div>

                    {frequencies.length > 1 ? (
                        <div className="mt-8 flex justify-center">
                            <RadioGroup
                                defaultValue={frequency.value}
                                onValueChange={(value: string) => {
                                    setFrequency(frequencies.find((f) => f.value === value)!);
                                }}
                                className={"grid gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 bg-white dark:bg-black ring-1 ring-inset ring-gray-200/30 dark:ring-gray-800 "+(inria.className)}
                                style={{
                                    gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`,
                                }}
                            >
                                <Label className={"sr-only "+(inria.className)}>Payment frequency</Label>
                                {frequencies.map((option) => (
                                    <Label
                                        className={cn(
                                            frequency.value === option.value
                                                ? 'bg-pink-500 text-white dark:bg-pink-500 dark:text-white/70'
                                                : 'bg-transparent text-gray-300 hover:bg-pink-500',
                                            'cursor-pointer rounded-full px-2.5 py-2 transition-all',
                                        )}
                                        key={option.value}
                                        htmlFor={option.value}
                                    >
                                        {option.label}

                                        <RadioGroupItem
                                            value={option.value}
                                            id={option.value}
                                            className="hidden"
                                        />
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    ) : (
                        <div className="mt-12" aria-hidden="true"></div>
                    )}

                    <div
                        className={cn(
                            'isolate mx-auto mt-4 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none',
                            tiers.length === 2 ? 'lg:grid-cols-2' : '',
                            tiers.length === 3 ? 'lg:grid-cols-3' : '',
                        )}
                    >
                        {tiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={cn(
                                    inria2.className,
                                    tier.featured
                                        ? '!bg-gray-900 ring-gray-900 dark:!bg-gray-100 dark:ring-gray-100'
                                        : 'bg-white dark:bg-gray-900/80 ring-gray-300/70 dark:ring-gray-700',
                                    'max-w-xs ring-1 rounded-3xl p-8 xl:p-10',
                                    tier.highlighted ? styles.fancyGlassContrast : '',
                                )}
                            >
                                <h3
                                    id={tier.id}
                                    className={cn(
                                        inria2.className,
                                        tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                                        'text-2xl font-bold tracking-tight',
                                    )}
                                >
                                    {tier.name}
                                </h3>
                                <p
                                    className={cn(
                                        inria.className,
                                        tier.featured
                                            ? 'text-gray-300 dark:text-gray-500'
                                            : 'text-gray-400 dark:text-gray-400',
                                        'mt-4 text-sm leading-6',
                                    )}
                                >
                                    {tier.description}
                                </p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span
                                        className={cn(
                                            tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                                            'text-4xl font-bold tracking-tight',inria.className,
                                            tier.discountPrice && tier.discountPrice[frequency.value as keyof typeof tier.discountPrice]
                                                ? 'line-through'
                                                : '',
                                        )}
                                    >
                                        {typeof tier.price === 'string'
                                            ? tier.price
                                            : tier.price[frequency.value]}
                                    </span>

                                    <span
                                        className={cn(
                                            inria.className,
                                            tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                                        )}
                                    >
                                        {typeof tier.discountPrice === 'string'
                                            ? tier.discountPrice
                                            : tier.discountPrice[frequency.value]}
                                    </span>

                                    {typeof tier.price !== 'string' ? (
                                        <span
                                            className={cn(
                                                inria.className,
                                                tier.featured
                                                    ? 'text-gray-300 dark:text-gray-500'
                                                    : 'dark:text-gray-400 text-gray-600',
                                                'text-sm font-semibold leading-6',
                                                
                                            )}
                                        >
                                            {frequency.priceSuffix}
                                        </span>
                                    ) : null}
                                </p>
                                <Button
										asChild
                                        className={cn(
                                            'w-full mt-4 text-black rounded-full dark:text-white',
                                            inria2.className,
                                            !tier.highlighted && !tier.featured
                                                ? 'bg-gray-100 dark:bg-gray-600'
                                                : 'bg-pink-300 hover:bg-pink-400 dark:bg-pink-500 dark:hover:bg-pink-600',
                                            tier.featured || tier.soldOut ? 'bg-white dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-black' : 'hover:opacity-80 transition-opacity',
                                        )}
                                        variant={tier.highlighted ? 'default':'outline'}
										size='lg'
										
										onClick={() => {
											if (frequency.value === "1") {
												saveStripeLinkToLocalStorage(monthlyUrl);
											} else {
												saveStripeLinkToLocalStorage(yearlyUrl);
											}
										}}
									>
										<Link className='text-lg' href={"/api/auth/login"}>{tier.cta}</Link>
									</Button>
                                <ul
                                    className={cn(
                                        tier.featured
                                            ? 'text-gray-300 dark:text-gray-500'
                                            : 'text-gray-700 dark:text-gray-400',
                                        'mt-8 space-y-3 text-sm leading-6 xl:mt-10',
                                        inria.className
                                    )}
                                >
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon
                                                className={cn(
                                                    tier.featured ? 'text-white dark:text-black' : '',
                                                    tier.highlighted
                                                        ? 'text-pink-500'
                                                        : 'text-gray-500',

                                                    'h-6 w-5 flex-none',
                                                )}
                                                aria-hidden="true"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}