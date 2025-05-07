"use client";

import HeroSection from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FreelancerSection from "@/components/FreelancerSection";
import CTA from "@/components/CTA";
import StarAnime from "@/components/Star";
import SafePayment from "@/components/SafePayment";
import Free from "@/components/Free";

export default function ClientHome() {
    return (
        <div className="min-h-screen dark:bg-color6 bg-light-color1">
            <HeroSection/>
            <CategoriesSection/>
            <SafePayment/>
            <HowItWorksSection/>
            <FreelancerSection/>
            <Free/>
            <CTA/>
            <StarAnime/>
        </div>
    );
}
