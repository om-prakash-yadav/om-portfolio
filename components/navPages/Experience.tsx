"use client";
import { Calendar, MapPin, GraduationCap, Users } from "lucide-react";
import { jetbrainsMono } from "@/app/font";

const experiences = [
  {
    role: "Software Engineer",
    company: "Deloitte USI",
    duration: "Jul 2024 – Present",
    location: "Hyderabad, India",
    logo: "https://www.google.com/s2/favicons?domain=deloitte.com&sz=128",
    responsibilities: [
      "Built scalable modules for Henry Schein Global E-commerce Platform (GEP) using Angular, Bootstrap, and Sitecore, supporting 1M+ global customers and 300+ clinical solutions.",
      "Optimized API integrations and reusable components, boosting UI performance by 25% and cutting development effort by 30%.",
      "Received two awards for exceptional delivery and innovation in the Henry Schein GEP project."
    ],
    technologies: ["Angular", "Bootstrap", "Sitecore", "React.js", "Redux", "TypeScript", "REST APIs"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    role: "Software Engineer (Part-Time)",
    company: "TetraTrion Technologies Pvt. Ltd.",
    duration: "Sep 2023 – Jul 2024",
    location: "Bhubaneswar, India",
    logo: "https://www.google.com/s2/favicons?domain=tetratrion.com&sz=128",
    responsibilities: [
      "Developed and delivered responsive, client-facing dashboards using React.js and Apache ECharts.",
      "Integrated RESTful APIs and built reusable UI components for scalable frontend architecture.",
      "Collaborated with cross-functional teams to deliver high-quality solutions on time."
    ],
    technologies: ["React.js", "Apache ECharts", "REST APIs"],
    color: "from-purple-500 to-pink-500"
  }
];

const education = [
  {
    degree: "Bachelor of Technology (B.Tech.)",
    institution: "National Institute of Technology, Durgapur",
    duration: "Sep 2020 – Apr 2024",
    location: "Durgapur, India",
    logo: "https://www.google.com/s2/favicons?domain=nitdgp.ac.in&sz=128",
    details: [
      "Graduated with a Bachelor of Technology degree",
      "Active participation in technical societies and student chapters"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    degree: "12th (CBSE) – 90.8%",
    institution: "Jawahar Navodaya Vidyalaya, Purulia",
    duration: "2020",
    location: "Purulia, India",
    logo: null,
    details: [
      "Scored 90.8% in Class 12th CBSE Board Examinations",
      "Strong performance in Science and Mathematics"
    ],
    color: "from-orange-500 to-yellow-500"
  },
  {
    degree: "10th (CBSE) – 9.8 CGPA",
    institution: "Jawahar Navodaya Vidyalaya, Purulia",
    duration: "2018",
    location: "Purulia, India",
    logo: null,
    details: [
      "Achieved 9.8 CGPA in Class 10th CBSE Board Examinations",
      "Consistent academic excellence throughout schooling"
    ],
    color: "from-indigo-500 to-purple-500"
  }
];

const activities = [
  {
    role: "Web Development Head",
    organization: "Indian Society of Technical Education (ISTE) - Student's Chapter",
    institution: "National Institute of Technology, Durgapur",
    duration: "2021 – 2023",
    location: "Durgapur, India",
    logo: null,
    responsibilities: [
      "Led the web development team to design and maintain the official ISTE NIT Durgapur website",
      "Organized technical workshops and events to promote web development skills among students",
      "Collaborated with team members to implement modern web technologies and best practices",
      "Mentored junior students in web development and guided them on various projects"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Web Design"],
    color: "from-teal-500 to-cyan-500"
  }
];

export default function Experience() {
  return (
    <div className={`${jetbrainsMono.className} w-full`}>
      {/* Professional Experience Section */}
      <section id="experience" className="w-full max-w-6xl px-6 pt-8 pb-16 md:py-24 mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 mb-12">
          <h1 className="text-4xl md:text-6xl text-center font-bold">
            Experience
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            My professional journey
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#e8390d] to-transparent"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#e8390d] rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="group relative bg-card dark:bg-card bg-gray-50/80 border border-border/50 rounded-2xl p-6 hover:p-8 hover:shadow-xl hover:border-[#e8390d]/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${exp.color} rounded-t-2xl`}></div>
                    
                    <div className="flex items-start gap-4 mb-4 md:group-hover:mb-6 transition-all duration-500">
                      {exp.logo ? (
                        <div className="p-2 group-hover:p-3 rounded-xl flex items-center justify-center min-w-[50px] group-hover:min-w-[60px] h-[50px] group-hover:h-[60px] transition-all duration-500">
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="object-contain w-[40px] h-[40px] group-hover:w-[50px] group-hover:h-[50px] transition-all duration-500"
                          />
                        </div>
                      ) : (
                        <div className={`p-2 group-hover:p-3 rounded-xl bg-gradient-to-br ${exp.color} text-white min-w-[50px] group-hover:min-w-[60px] h-[50px] group-hover:h-[60px] flex items-center justify-center text-xl group-hover:text-2xl font-bold transition-all duration-500`}>
                          {exp.company.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl group-hover:text-2xl font-bold text-foreground mb-1 transition-all duration-500">{exp.role}</h3>
                        <p className="text-base group-hover:text-lg font-semibold text-[#e8390d] transition-all duration-500">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6 md:mb-0 md:group-hover:gap-4 md:group-hover:mb-6 text-sm text-muted-foreground transition-all duration-500">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 group-hover:px-3 group-hover:py-1.5 rounded-lg bg-muted/50 transition-all duration-500">
                        <Calendar className="w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 group-hover:px-3 group-hover:py-1.5 rounded-lg bg-muted/50 transition-all duration-500">
                        <MapPin className="w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Hidden content on hover */}
                    <div className="max-h-[500px] opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <ul className="space-y-3 mb-6 text-sm text-muted-foreground leading-relaxed">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#e8390d] mt-1 font-bold">•</span>
                            <span className="flex-1">{resp}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#e8390d]/10 text-[#e8390d] border border-[#e8390d]/20 hover:bg-[#e8390d]/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Curricular Activities Section */}
      <section id="activities" className="w-full max-w-6xl px-6 pt-8 pb-16 md:py-24 mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 mb-12">
          <h1 className="text-4xl md:text-6xl text-center font-bold">
            Co-Curricular Activities
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            Leadership and community involvement
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#e8390d] to-transparent"></div>

          <div className="space-y-12">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#e8390d] rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="group relative bg-card dark:bg-card bg-gray-50/80 border border-border/50 rounded-2xl p-6 hover:p-8 hover:shadow-xl hover:border-[#e8390d]/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${activity.color} rounded-t-2xl`}></div>
                    
                    <div className="flex items-start gap-4 mb-4 md:group-hover:mb-6 transition-all duration-500">
                      {activity.logo ? (
                        <div className="p-2 group-hover:p-3 rounded-xl bg-white dark:bg-gray-100 border border-border flex items-center justify-center min-w-[50px] group-hover:min-w-[60px] h-[50px] group-hover:h-[60px] transition-all duration-500">
                          <img
                            src={activity.logo}
                            alt={`${activity.organization} logo`}
                            className="object-contain w-[40px] h-[40px] group-hover:w-[50px] group-hover:h-[50px] transition-all duration-500"
                          />
                        </div>
                      ) : (
                        <div className={`p-2 group-hover:p-3 rounded-xl bg-gradient-to-br ${activity.color} text-white min-w-[50px] group-hover:min-w-[60px] h-[50px] group-hover:h-[60px] flex items-center justify-center text-xl group-hover:text-2xl font-bold transition-all duration-500`}>
                          <Users className="w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-500" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl group-hover:text-2xl font-bold text-foreground mb-1 transition-all duration-500">{activity.role}</h3>
                        <p className="text-base group-hover:text-lg font-semibold text-[#e8390d] transition-all duration-500">{activity.organization}</p>
                        <p className="text-sm text-muted-foreground mt-1">{activity.institution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6 md:mb-0 md:group-hover:gap-4 md:group-hover:mb-6 text-sm text-muted-foreground transition-all duration-500">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 group-hover:px-3 group-hover:py-1.5 rounded-lg bg-muted/50 transition-all duration-500">
                        <Calendar className="w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
                        {activity.duration}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 group-hover:px-3 group-hover:py-1.5 rounded-lg bg-muted/50 transition-all duration-500">
                        <MapPin className="w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
                        {activity.location}
                      </span>
                    </div>

                    {/* Hidden content on hover */}
                    <div className="max-h-[500px] opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <ul className="space-y-3 mb-6 text-sm text-muted-foreground leading-relaxed">
                        {activity.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#e8390d] mt-1 font-bold">•</span>
                            <span className="flex-1">{resp}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {activity.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#e8390d]/10 text-[#e8390d] border border-[#e8390d]/20 hover:bg-[#e8390d]/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="w-full max-w-6xl px-6 pt-8 pb-16 md:py-24 mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 mb-12">
          <h1 className="text-4xl md:text-6xl text-center font-bold">
            Education
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            My academic background
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#e8390d] to-transparent"></div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#e8390d] rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="group relative bg-card dark:bg-card bg-gray-50/80 border border-border/50 rounded-2xl p-6 hover:p-8 hover:shadow-xl hover:border-[#e8390d]/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${edu.color} rounded-t-2xl`}></div>
                    
                    <div className="flex items-start gap-4 mb-4 md:group-hover:mb-6 transition-all duration-500">
                      {edu.logo ? (
                        <div className="p-2 group-hover:p-3 rounded-xl bg-white dark:bg-gray-100 border border-border flex items-center justify-center min-w-[50px] group-hover:min-w-[60px] h-[50px] group-hover:h-[60px] transition-all duration-500">
                          <img
                            src={edu.logo}
                            alt={`${edu.institution} logo`}
                            className="object-contain w-[40px] h-[40px] group-hover:w-[50px] group-hover:h-[50px] transition-all duration-500"
                          />
                        </div>
                      ) : (
                        <div className={`p-2 group-hover:p-3 rounded-xl bg-gradient-to-br ${edu.color} text-white min-w-[50px] group-hover:min-w-[60px] h-[50px] group-hover:h-[60px] flex items-center justify-center text-xl group-hover:text-2xl font-bold transition-all duration-500`}>
                          <GraduationCap className="w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-500" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl group-hover:text-2xl font-bold text-foreground mb-1 transition-all duration-500">{edu.degree}</h3>
                        <p className="text-base group-hover:text-lg font-semibold text-[#e8390d] transition-all duration-500">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6 md:mb-0 md:group-hover:gap-4 md:group-hover:mb-6 text-sm text-muted-foreground transition-all duration-500">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 group-hover:px-3 group-hover:py-1.5 rounded-lg bg-muted/50 transition-all duration-500">
                        <Calendar className="w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 group-hover:px-3 group-hover:py-1.5 rounded-lg bg-muted/50 transition-all duration-500">
                        <MapPin className="w-3.5 h-3.5 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
                        {edu.location}
                      </span>
                    </div>

                    {/* Hidden content on hover */}
                    <div className="max-h-[500px] opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        {edu.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#e8390d] mt-1 font-bold">•</span>
                            <span className="flex-1">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
