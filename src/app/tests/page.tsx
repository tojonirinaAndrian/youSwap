'use client';
import { SkillType } from "@/src/types/skillsType";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const randomSkills: SkillType[] = [
  // ART & DESIGN
  { id: "art-1", name: "Oil Painting", categoryName: "ART_AND_DESIGN" },
  { id: "art-2", name: "Digital Illustration", categoryName: "ART_AND_DESIGN" },
  { id: "art-3", name: "Graphic Design", categoryName: "ART_AND_DESIGN" },
  { id: "art-4", name: "Calligraphy", categoryName: "ART_AND_DESIGN" },
  { id: "art-5", name: "Photography", categoryName: "ART_AND_DESIGN" },
  { id: "art-6", name: "UI/UX Design", categoryName: "ART_AND_DESIGN" },
  { id: "art-7", name: "Pottery", categoryName: "ART_AND_DESIGN" },
  { id: "art-8", name: "Interior Design", categoryName: "ART_AND_DESIGN" },
  { id: "art-9", name: "Animation", categoryName: "ART_AND_DESIGN" },
  { id: "art-10", name: "Fashion Design", categoryName: "ART_AND_DESIGN" },

  // CODING & TECH
  { id: "tech-1", name: "React.js", categoryName: "CODING_AND_TECH" },
  { id: "tech-2", name: "Python Scripting", categoryName: "CODING_AND_TECH" },
  { id: "tech-3", name: "Cybersecurity Basics", categoryName: "CODING_AND_TECH" },
  { id: "tech-4", name: "Mobile App Dev (Flutter)", categoryName: "CODING_AND_TECH" },
  { id: "tech-5", name: "Blockchain Fundamentals", categoryName: "CODING_AND_TECH" },
  { id: "tech-6", name: "Data Science with R", categoryName: "CODING_AND_TECH" },
  { id: "tech-7", name: "Cloud Computing (AWS)", categoryName: "CODING_AND_TECH" },
  { id: "tech-8", name: "SQL Databases", categoryName: "CODING_AND_TECH" },
  { id: "tech-9", name: "Game Dev (Unity)", categoryName: "CODING_AND_TECH" },
  { id: "tech-10", name: "DevOps", categoryName: "CODING_AND_TECH" },

  // LANGUAGES
  { id: "lang-1", name: "Conversational English", categoryName: "LANGUAGES" },
  { id: "lang-2", name: "Business French", categoryName: "LANGUAGES" },
  { id: "lang-3", name: "Spanish for Beginners", categoryName: "LANGUAGES" },
  { id: "lang-4", name: "Japanese (JLPT N5)", categoryName: "LANGUAGES" },
  { id: "lang-5", name: "Mandarin Chinese", categoryName: "LANGUAGES" },
  { id: "lang-6", name: "German Grammar", categoryName: "LANGUAGES" },
  { id: "lang-7", name: "Italian for Travel", categoryName: "LANGUAGES" },
  { id: "lang-8", name: "Arabic Calligraphy/Lang", categoryName: "LANGUAGES" },
  { id: "lang-9", name: "Sign Language (ASL)", categoryName: "LANGUAGES" },
  { id: "lang-10", name: "Portuguese", categoryName: "LANGUAGES" },

  // MUSIC & AUDIO
  { id: "mus-1", name: "Acoustic Guitar", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-2", name: "Music Production (Ableton)", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-3", name: "Vocal Training", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-4", name: "Piano/Keyboard", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-5", name: "Music Theory", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-6", name: "Drums", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-7", name: "Podcast Editing", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-8", name: "Mixing & Mastering", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-9", name: "Violin", categoryName: "MUSIC_AND_AUDIO" },
  { id: "mus-10", name: "DJing Skills", categoryName: "MUSIC_AND_AUDIO" },

  // COOKING & CRAFT
  { id: "cook-1", name: "Bread Baking", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-2", name: "Vegan Cooking", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-3", name: "Knife Skills", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-4", name: "Knitting", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-5", name: "Pastry & Desserts", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-6", name: "Woodworking", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-7", name: "Sewing & Tailoring", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-8", name: "Sushi Making", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-9", name: "Leather Crafting", categoryName: "COOKING_AND_CRAFT" },
  { id: "cook-10", name: "Coffee Brewing/Latte Art", categoryName: "COOKING_AND_CRAFT" },

  // BUSINESS & MARKETING
  { id: "biz-1", name: "SEO Optimization", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-2", name: "Social Media Strategy", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-3", name: "Public Speaking", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-4", name: "Copywriting", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-5", name: "Financial Modeling", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-6", name: "Personal Branding", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-7", name: "E-commerce (Shopify)", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-8", name: "Sales Techniques", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-9", name: "Project Management (Agile)", categoryName: "BUSINESS_AND_MARKETING" },
  { id: "biz-10", name: "Email Marketing", categoryName: "BUSINESS_AND_MARKETING" },

  // HEALTH & WELLNESS
  { id: "hw-1", name: "Yoga (Vinyasa)", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-2", name: "Meditation & Mindfulness", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-3", name: "Nutrition Basics", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-4", name: "Mental Health First Aid", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-5", name: "Pilates", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-6", name: "Sleep Coaching", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-7", name: "Aromatherapy", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-8", name: "Stress Management", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-9", name: "Skincare Routines", categoryName: "HEALTH_AND_WELLNESS" },
  { id: "hw-10", name: "Breathwork", categoryName: "HEALTH_AND_WELLNESS" },

  // ACADEMICS
  { id: "acad-1", name: "Calculus", categoryName: "ACADEMICS" },
  { id: "acad-2", name: "Macroeconomics", categoryName: "ACADEMICS" },
  { id: "acad-3", name: "Organic Chemistry", categoryName: "ACADEMICS" },
  { id: "acad-4", name: "Creative Writing", categoryName: "ACADEMICS" },
  { id: "acad-5", name: "World History", categoryName: "ACADEMICS" },
  { id: "acad-6", name: "Philosophy 101", categoryName: "ACADEMICS" },
  { id: "acad-7", name: "Physics (Mechanics)", categoryName: "ACADEMICS" },
  { id: "acad-8", name: "Statistics", categoryName: "ACADEMICS" },
  { id: "acad-9", name: "Academic Essay Writing", categoryName: "ACADEMICS" },
  { id: "acad-10", name: "Psychology", categoryName: "ACADEMICS" },

  // SPORTS & FITNESS
  { id: "sport-1", name: "Basketball Drills", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-2", name: "Swimming Technique", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-3", name: "Tennis for Beginners", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-4", name: "Powerlifting", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-5", name: "Marathon Training", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-6", name: "Martial Arts (BJJ)", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-7", name: "Cycling/Bike Maintenance", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-8", name: "Rock Climbing", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-9", name: "Golf Swing Basics", categoryName: "SPORTS_AND_FITNESS" },
  { id: "sport-10", name: "Skateboarding", categoryName: "SPORTS_AND_FITNESS" },

  // LIFESTYLE & HOME
  { id: "life-1", name: "Dog Training", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-2", name: "Vegetable Gardening", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-3", name: "Personal Finance/Budgeting", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-4", name: "Basic Car Maintenance", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-5", name: "Minimalism/Decluttering", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-6", name: "Urban Farming", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-7", name: "Chess Strategy", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-8", name: "First Aid/CPR", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-9", name: "Travel Hacking", categoryName: "LIFESTYLE_AND_HOME" },
  { id: "life-10", name: "Magic Tricks", categoryName: "LIFESTYLE_AND_HOME" },
];

async function onAddSkillsClick () {
    try {
        const response = await axios.post(`${backendUrl}/addSkillsTest`, {
            skillsToAdd : randomSkills   
        })
        console.log(response.data);
    } catch (e) {
        console.log(e)
    }
}

export default function TestsPage () {
    return <div className="space-y-2 w-full p-5">
        <button className="cursor-pointer filledButton"
        onClick={onAddSkillsClick}
        >
            Click me to add mock skills to db.
        </button>
    </div>
}