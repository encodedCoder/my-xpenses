"use client";

import { motion } from "framer-motion";
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Heart, 
  Target, 
  ShieldCheck, 
  Smartphone,
  ArrowLeft 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const socials = [
    { 
      icon: Instagram, 
      label: "Instagram", 
      href: "https://instagram.com/encodedcoder",
      color: "hover:text-pink-500"
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      href: "https://linkedin.com/in/encodedcoder",
      color: "hover:text-blue-500"
    },
    { 
      icon: Twitter, 
      label: "X (Twitter)", 
      href: "https://x.com/encodedcoder_",
      color: "hover:text-sky-500"
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Smart Tracking",
      description: "Precisely categorize and monitor every expense with ease."
    },
    {
      icon: ShieldCheck,
      title: "Privacy Focused",
      description: "Your financial data is secured with modern encryption standards."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "A premium experience designed for tracking on the go."
    }
  ];

  return (
    <div className="min-h-screen gradient-mesh pb-24 lg:pb-8 lg:pl-64">
      {/* Back Button */}
      <div className="p-4 sm:p-6 lg:hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-surface-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 fill-current" />
            Created for tracker community
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Meet the Creator
          </h1>
          <p className="text-surface-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            "Created with love for fellow xpenses trackers by Suresh"
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 glass-card p-6 text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full gradient-primary blur-md opacity-50" />
              <Image
                src="https://lh3.googleusercontent.com/a/ACg8ocKTQTKcMWCy-aB-nZcfgxgAAKl77S6OTzLOZCb8pjsXI9rmVTzb=s360-c-no"
                alt="Suresh"
                width={128}
                height={128}
                className="rounded-full border-4 border-surface-800 relative z-10 object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Suresh</h2>
            <p className="text-primary-400 font-medium mb-6">Full Stack Developer</p>
            
            <div className="flex justify-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl bg-surface-800 text-surface-400 transition-all duration-300 ${social.color} hover:shadow-glow hover:-translate-y-1`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-7 space-y-8"
          >
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-4">The Mission</h3>
              <p className="text-surface-400 leading-relaxed mb-6">
                My Expenses started as a personal project to solve a simple problem: tracking daily expenses shouldn't feel like a chore. I wanted to build something that isn't just functional, but also beautiful and intuitive.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-surface-800 flex items-center justify-center text-primary-400 mb-3">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-white">{feature.title}</h4>
                    <p className="text-sm text-surface-500 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 border-l-4 border-accent-500">
              <p className="text-surface-300 italic">
                "Financial freedom begins with awareness. My Expenses is here to provide that clarity, one transaction at a time."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-surface-500 text-sm"
        >
          <p>Copyright © 2026 encodedcoder • Suresh</p>
        </motion.div>
      </main>
    </div>
  );
}
