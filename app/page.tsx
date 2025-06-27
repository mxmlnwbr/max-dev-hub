"use client";

import { Code, Heart, Zap, Users, Target, Waves, Mountain, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { translations, Language } from "./translations";

export default function Component() {
  const [posts, setPosts] = useState<{id: number, content: string}[]>([]);
  const [inputContent, setInputContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine initial language from URL path
  const initialLanguage: Language = pathname === "/de" ? "de" : "en";
  const [language, setLanguage] = useState<Language>(initialLanguage);
  
  // Function to change language and update URL
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    // Update URL without full page reload
    router.push(`/${lang}`);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        {/* Language Toggle Button */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <Button 
              onClick={() => changeLanguage("de")} 
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${language === "de" ? 'bg-amber-400 text-black font-medium' : 'bg-transparent text-white hover:bg-white/10'}`}
              size="sm"
            >
              <span className="text-sm">DE</span>
            </Button>
            <Button 
              onClick={() => changeLanguage("en")} 
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${language === "en" ? 'bg-amber-400 text-black font-medium' : 'bg-transparent text-white hover:bg-white/10'}`}
              size="sm"
            >
              <span className="text-sm">EN</span>
            </Button>
          </div>
        </div>


        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Maximilian Weber
              </h1>

              <div className="h-1 w-16 bg-white"></div>

              <div className="space-y-2 text-lg text-gray-300">
                <p>{translations[language].location}</p>
                <p>{translations[language].age}</p>
                <p>{translations[language].profession}</p>
                <p>{translations[language].email}</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                {translations[language].motivation}
              </p>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/20 to-blue-500/20 flex items-center justify-center overflow-hidden border-2 border-amber-400">
                <img 
                  src="/images/me.jpg" 
                  alt="Maximilian Weber" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-white rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>

        {/* Tech Stack & Skills */}
        <div className="mt-20 space-y-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            {translations[language].techArsenal}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto">
                  <Code className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{translations[language].frontend}</h3>
                <p className="text-gray-300">
                  {translations[language].frontendDesc}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-amber-400/20 text-amber-400"
                  >
                    React.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-amber-400/20 text-amber-400"
                  >
                    Next.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-amber-400/20 text-amber-400"
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-amber-400/20 text-amber-400"
                  >
                    Tailwind
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{translations[language].ai}</h3>
                <p className="text-gray-300">
                  {translations[language].aiDesc}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-blue-400/20 text-blue-400"
                  >
                    Python
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-400/20 text-blue-400"
                  >
                    PyTorch
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-400/20 text-blue-400"
                  >
                    LLM
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-400/20 text-blue-400"
                  >
                    RAG
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {translations[language].fullstack}
                </h3>
                <p className="text-gray-300">
                  {translations[language].fullstackDesc}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-green-400/20 text-green-400"
                  >
                    Node.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-400/20 text-green-400"
                  >
                    Vue.js / React.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-400/20 text-green-400"
                  >
                    Prisma / Drizzle
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-400/20 text-green-400"
                  >
                    PostgreSQL
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Projects Showcase */}
        <div className="mt-20 space-y-8">
          <h2 className="text-3xl font-bold text-center">
            {translations[language].passionProjects}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="https://wind-scope.vercel.app/" target="_blank">
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:bg-white/10">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Waves className="h-8 w-8 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">wind-scope</h3>
                  </div>
                  <p className="text-gray-300">
                    {translations[language].windscope}
                  </p>
                  <div className="text-sm text-blue-400">
                    React.js • Next.js • TypeScript
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://mythenpark.vercel.app/" target="_blank">
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:bg-white/10">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mountain className="h-8 w-8 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">mythenpark</h3>
                  </div>
                  <p className="text-gray-300">
                    {translations[language].mythenpark}
                  </p>
                  <div className="text-sm text-purple-400">
                    React.js • Next.js • TypeScript
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://ticketing-platform-delta.vercel.app/" target="_blank">
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:bg-white/10">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-8 w-8 text-green-400" />
                    <h3 className="text-xl font-bold text-white">TicketHub</h3>
                  </div>
                  <p className="text-gray-300">
                    {translations[language].tickethub}
                  </p>
                  <div className="text-sm text-green-400">
                    React.js • Next.js • TypeScript
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://theses.bf.uzh.ch" target="_blank">
              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 hover:bg-white/10">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Heart className="h-8 w-8 text-orange-400" />
                    <h3 className="text-xl font-bold text-white">Thesen-Plattform</h3>
                  </div>
                  <p className="text-gray-300">
                    {translations[language].thesesPlatform}
                  </p>
                  <div className="text-sm text-orange-400">
                    React.js • Next.js • Node.js • Azure
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-20 space-y-8">
          <h2 className="text-3xl font-bold text-center">
            {translations[language].career}
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="w-3 h-3 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-grow">
                <div className="flex justify-between w-full mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {translations[language].dataEngineer}
                    </h3>
                  </div>
                  <div className="min-w-[140px] text-right">
                    <span className="text-amber-400 text-sm whitespace-nowrap">05/2025</span>
                  </div>
                </div>
                <p className="text-gray-300">
                  {translations[language].dataEngineerDesc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-grow">
                <div className="flex justify-between w-full mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {translations[language].softwareEngineer}
                    </h3>
                  </div>
                  <div className="min-w-[140px] text-right">
                    <span className="text-blue-400 text-sm whitespace-nowrap">07/2023 - 04/2025</span>
                  </div>
                </div>
                <p className="text-gray-300">
                  {translations[language].softwareEngineerDesc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-grow">
                <div className="flex justify-between w-full mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {translations[language].intern}
                    </h3>
                  </div>
                  <div className="min-w-[140px] text-right">
                    <span className="text-green-400 text-sm whitespace-nowrap">10/2018 - 03/2019</span>
                  </div>
                </div>
                <p className="text-gray-300">
                  {translations[language].internDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20 space-y-8">
          <h2 className="text-3xl font-bold text-center">
            {translations[language].education}
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between w-full mb-2">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-xl font-bold text-white">Universität Zürich</h3>
                    <p className="text-gray-300 break-words">{translations[language].uzhMaster}</p>
                  </div>
                  <div className="min-w-[140px] md:text-right">
                    <span className="text-purple-400 text-sm whitespace-nowrap">Sept. 2019 - Juli 2023</span>
                  </div>
                </div>
                <p className="text-gray-300 mt-2">
                  {translations[language].uzhDesc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="w-3 h-3 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between w-full mb-2">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-xl font-bold text-white">Universität St. Gallen</h3>
                    <p className="text-gray-300 break-words">{translations[language].hsgBachelor}</p>
                  </div>
                  <div className="min-w-[140px] md:text-right">
                    <span className="text-amber-400 text-sm whitespace-nowrap">Sept. 2015 - Sept. 2018</span>
                  </div>
                </div>
                <p className="text-gray-300 mt-2">
                  {translations[language].hsgDesc}
                </p>
                
                {/* Nested Exchange Semester */}
                <div className="mt-4 ml-6 border-l-2 border-cyan-400 pl-4">
                  <div className="flex flex-col md:flex-row justify-between w-full mb-2">
                    <div className="mb-2 md:mb-0">
                      <h4 className="text-lg font-bold text-white">KEDGE Business School</h4>
                      <p className="text-gray-300 break-words">{translations[language].kedge}</p>
                    </div>
                    <div className="min-w-[140px] md:text-right">
                      <span className="text-cyan-400 text-sm whitespace-nowrap">Sept. 2017 - Dez. 2017</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-1">
                    {translations[language].kedgeDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Side */}
        <div className="mt-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20">
          <h2 className="text-3xl font-bold text-center mb-8">
            {translations[language].beyondCode}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-2xl">🏄‍♂️</span>
                <div>
                  <h4 className="font-bold text-white mb-1">
                    {translations[language].watersports}
                  </h4>
                  <p className="text-gray-300">
                    {translations[language].watersportsDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-400 text-2xl">🎵</span>
                <div>
                  <h4 className="font-bold text-white mb-1">
                    {translations[language].eventOrg}
                  </h4>
                  <p className="text-gray-300">
                    {translations[language].eventOrgDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">🌊</span>
                <div>
                  <h4 className="font-bold text-white mb-1">{translations[language].riverSurfing}</h4>
                  <p className="text-gray-300">
                    {translations[language].riverSurfingDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-purple-400 text-2xl">🗣️</span>
                <div>
                  <h4 className="font-bold text-white mb-1">
                    {translations[language].communication}
                  </h4>
                  <p className="text-gray-300">
                    {translations[language].communicationDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-red-400 text-2xl">🎯</span>
                <div>
                  <h4 className="font-bold text-white mb-1">
                    {translations[language].solutionOriented}
                  </h4>
                  <p className="text-gray-300">
                    {translations[language].solutionOrientedDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-2xl">✈️</span>
                <div>
                  <h4 className="font-bold text-white mb-1">{translations[language].traveler}</h4>
                  <p className="text-gray-300">
                    {translations[language].travelerDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why novu */}
        <div className="mt-20 text-center space-y-8">
          <h2 className="text-4xl font-bold flex flex-col items-center justify-center gap-4 md:flex-row md:items-center">
            {translations[language].whyMe}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white/5 border-white/10 p-6">
              <CardContent className="text-center space-y-4 p-0">
                <div className="text-4xl">🚀</div>
                <h3 className="text-xl font-bold text-white">{translations[language].innovation}</h3>
                <p className="text-gray-300">
                  {translations[language].innovationDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <CardContent className="text-center space-y-4 p-0">
                <div className="text-4xl">🌊</div>
                <h3 className="text-xl font-bold text-white">{translations[language].flowState}</h3>
                <p className="text-gray-300">
                  {translations[language].flowStateDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <CardContent className="text-center space-y-4 p-0">
                <div className="text-4xl">🎯</div>
                <h3 className="text-xl font-bold text-white">{translations[language].impact}</h3>
                <p className="text-gray-300">
                  {translations[language].impactDesc}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-2xl border border-amber-400/20">
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {translations[language].promise}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button className="text-white hover:bg-amber-500 px-8 py-3 text-lg font-medium hover:bg-amber-500">
              <Link href="mailto:maximilian.weber@bluewin.ch" target="_blank">
                📧 maximilian.weber@bluewin.ch
              </Link>
            </Button>
            <Button
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-medium hover:bg-amber-400"
            >
              <Link href="https://www.linkedin.com/in/maximilian-weber-668a76157/" target="_blank">
                {translations[language].linkedinProfile}
              </Link>
            </Button>
            <Button
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-medium hover:bg-amber-500"
            >
              <Link href="https://github.com/mxmlnwbr" target="_blank">
                {translations[language].githubPortfolio}
              </Link>
            </Button>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-20 rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{translations[language].feedback} <span className="text-amber-400"></span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{translations[language].feedbackDesc}</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg">
            <div className="mb-6 max-h-48 overflow-y-auto space-y-3">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-400"></div>
                </div>
              ) : posts.length > 0 ? (
                posts.map((post: {id: number, content: string}) => (
                  <div key={post.id} className="p-3 bg-black rounded">
                    <p className="text-gray-300">{post.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 italic">{translations[language].firstFeedback}</p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                name="content" 
                className="flex-grow bg-black/30 border border-white/20 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder={translations[language].yourFeedback}
                required
              />
              <button 
                type="button" 
                onClick={() => {
                  fetch("/api/posts", {
                    method: "POST",
                    body: JSON.stringify({ content: inputContent }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  setInputContent("");
                  setPosts([...posts, { id: Date.now(), content: inputContent }]);
                }}
                className="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-medium px-6 py-3 rounded-md hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full"
                disabled={!inputContent.trim()}
              >
                {translations[language].send}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        <p>{translations[language].footer}</p>
      </footer>
    </div>
  );
}
