import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useIntersectionObserver } from 'react-use';
import {
  Github,
  Linkedin,
  Cloud,
  Pocket as Docker,
  Container as Kubernetes,
  GitBranch as Terraform,
  Github as Git,
  Cable as CICD,
  Terminal as Linux,
  Code as Python,
  Shield as Security,
  LineChart as Observability,
  Mail,
  BookOpen,
  Award,
  Home,
  Clock,
} from 'lucide-react';
import { Modal } from './components/Modal';
import { BlogPost } from './components/BlogPost';

const skills = [
  { name: 'Cloud', icon: Cloud },
  { name: 'Docker', icon: Docker },
  { name: 'Kubernetes', icon: Kubernetes },
  { name: 'Terraform', icon: Terraform },
  { name: 'Git', icon: Git },
  { name: 'CI/CD', icon: CICD },
  { name: 'Linux', icon: Linux },
  { name: 'Python', icon: Python },
  { name: 'Security', icon: Security },
  { name: 'Observability', icon: Observability },
];

const projects = [
  {
    title: 'Infrastructure as Code Pipeline',
    description: 'Automated cloud infrastructure deployment using Terraform and GitHub Actions',
    tech: ['Terraform', 'AWS', 'GitHub Actions'],
    github: 'https://github.com/rajeev3012/IaC-pipeline-AWS',
  },
  {
    title: 'Python Docker K8s',
    description: 'Containerized Python Flask application using Docker, published to DockerHub and deployed it on Kubernetes cluster using manifest files.',
    tech: ['Python', 'Docker', 'Kubernetes'],
    github: 'https://github.com/rajeev3012/python-docker-k8s',
  },
  {
    title: 'Voting Application',
    description: 'A voting application. It uses Redis for caching and Postgres for storing data. Single kubernetes command to deploy and destroy the whole infrastructure.',
    tech: ['Python', 'nodejs', 'Kubernetes', 'Redis', 'Postgres'],
    github: 'https://github.com/rajeev3012/k8s-voting-app',
  },
];

const certifications = [
  {
    name: 'Cisco Certified Network Associate (CCNA 200-301)',
    issuer: 'Cisco',
    date: '2021',
    image: '/images/ccna.png',
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    date: '2021',
    image: '/images/az900.jpg',
  },
  {
    name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)',
    issuer: 'Microsoft',
    date: '2022',
    image: '/images/az104.png',
  },
  {
    name: 'Kubernetes for the Absolute Beginners - Hands-on Tutorial',
    issuer: 'KodeKloud',
    date: '2025',
    image: '/images/k8s-cert.jpg',
  },
];

const blogPosts = [
  {
    posts: [
      {
        title: 'The Future of Cloud Computing',
        description: 'Exploring emerging trends in cloud technology and their impact on business.',
        content: `
        <p className="paragraph-spacing">Cloud computing continues to evolve at a rapid pace, and if you’re still thinking of it as just a glorified USB drive in the sky, it’s time to catch up. The next wave is all about serverless architectures, AI-driven automation, and multi-cloud strategies. Serverless isn’t just a buzzword—it’s letting developers focus on writing code while the cloud handles the boring stuff, like scaling and maintenance. Imagine a world where your biggest worry isn’t provisioning servers but remembering to water your office plant. Meanwhile, AI is sneaking into everything, from optimizing resource allocation to predicting outages before your coffee goes cold.</p>
        
        <p className="paragraph-spacing">But here’s the kicker: the future isn’t just in the cloud—it’s between clouds. Companies are adopting multi-cloud setups to avoid vendor lock-in, spread risk, and shop for the best deals (because even billion-dollar enterprises love a good Black Friday sale). Hybrid clouds are also gaining traction, blending on-prem infrastructure with public cloud flexibility. Think of it as a buffet where you can have your cake (security) and eat it too (scalability).</p>
        
        <p className="paragraph-spacing">And let’s not forget sustainability. Cloud providers are racing to hit carbon-neutral goals, with data centers powered by renewables and cooling systems that use less energy than my smartwatch. The future of cloud computing isn’t just smarter and faster—it’s greener. Now if only they could fix my Wi-Fi.</p>`,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
        author: 'Rajeev Ranjan',
        date: new Date('2024-03-01'),
        readingTime: 5,
      },
      {
        title: 'Edge Computing Revolution',
        description: 'How edge computing is transforming data processing and analysis.',
        content: `
        <p className="paragraph-spacing">The rise of edge computing is changing how we think about data—no more waiting for your cat video to buffer while it travels to a server farm 500 miles away. Edge computing brings processing closer to the source, like having a mini data center in your backyard (or on a cell tower, if your HOA is strict). This isn’t just about speed; it’s a game-changer for industries like healthcare, manufacturing, and even your smart fridge that judges your midnight snack choices.</p>
        
        <p className="paragraph-spacing">Why does this matter? Latency. Autonomous cars can’t afford to wait for a cloud server to decide whether to brake for a squirrel. Factories need real-time analytics to prevent $10 million oopsies. With edge computing, data is processed on-site, reducing reliance on distant data centers. It’s like having a sous chef prepping ingredients right in your kitchen instead of outsourcing to a restaurant across town.</p>
        
        <p className="paragraph-spacing">But edge isn’t replacing the cloud—it’s teaming up with it. Critical data still syncs to the cloud for long-term storage and big-picture analytics. The result? A tag-team duo where edge handles the urgent “need-it-now” tasks, and the cloud plays the wise librarian archiving knowledge. Just don’t ask either of them to fix your printer.</p>`,
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop',
        author: 'Rajeev Ranjan',
        date: new Date('2024-02-28'),
        readingTime: 4,
      },
      {
        title: 'Optimizing Cloud Costs',
        description: 'Strategies for managing and optimizing cloud infrastructure costs.',
        content: `
        <p className="paragraph-spacing">Cloud cost optimization is becoming increasingly important, mostly because nobody wants to explain to their CFO why last month’s bill could fund a small moon mission. The first rule of cloud club? Stop treating it like an all-you-can-eat buffet. Overprovisioned instances, forgotten test environments, and zombie workloads (running 24/7 for no reason) are the usual suspects. Tools like AWS Cost Explorer or Azure Cost Management are your new best friends—think of them as financial therapists for your cloud guilt.</p>
        
        <p className="paragraph-spacing">But saving money isn’t just about cutting corners. Rightsizing resources, leveraging spot instances, and committing to reserved capacity can slash costs without sacrificing performance. It’s like downgrading from a luxury SUV to a hybrid—still gets you there, but with fewer tears at the gas pump. Automating scaling policies (e.g., Kubernetes Horizontal Pod Autoscaler) ensures you’re not paying for idle resources while your app naps.</p>
        
        <p className="paragraph-spacing">And let’s talk about FinOps—the art of making finance, engineering, and ops teams stop glaring at each other. By tagging resources, setting budgets, and fostering accountability, you turn cloud spending from a blame game into a team sport. Pro tip: If your devs complain about budget alerts, remind them that every dollar saved is a dollar closer to pizza Fridays.</p>`,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        author: 'Rajeev Ranjan',
        date: new Date('2024-02-25'),
        readingTime: 6,
      },
      {
        title: 'GitOps Best Practices',
        description: 'Implementing GitOps for better deployment and management.',
        content: `
        <p className="paragraph-spacing">GitOps is revolutionizing how we manage infrastructure, mostly by making YAML files the unofficial currency of DevOps. The core idea? Everything is code, and Git is the single source of truth. If your infrastructure isn’t version-controlled, you’re basically navigating a minefield blindfolded. With GitOps, changes to environments are made via pull requests, giving you audit trails, rollbacks, and fewer “oops-I-accidentally-deleted-production” moments.</p>
        
        <p className="paragraph-spacing">But GitOps isn’t just about pushing buttons—it’s about workflows. Tools like ArgoCD or Flux act as your overachieving interns, constantly syncing your cluster state with the Git repo. Declarative configurations mean you define the what (“I want 5 pods”), not the how (“please beg Kubernetes nicely”). And yes, this does mean fewer 3 a.m. panic calls.</p>
        
        <p className="paragraph-spacing">The golden rule? Keep it simple. Start small—automate deployments for a single app before conquering the entire microservices army. Document everything like you’re writing a love letter to Future You. And remember, GitOps isn’t magic; it’s just good habits with a fancy name. Now go forth and make merge requests, not chaos.</p>`,
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop',
        author: 'Rajeev Ranjan',
        date: new Date('2024-02-20'),
        readingTime: 7,
      },
    ],
  },
];

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="px-4 py-2 text-gray-400 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[rgb(var(--neon-blue))] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
  >
    {children}
  </a>
);

function App() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0]['posts'][0] | null>(null);
  
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const certificationsRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button
            onClick={scrollToTop}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <div className="flex justify-center py-4 space-x-2 md:space-x-6">
            <NavLink href="#about" onClick={() => scrollToSection(aboutRef)}>About Me</NavLink>
            <NavLink href="#skills" onClick={() => scrollToSection(skillsRef)}>Skills</NavLink>
            <NavLink href="#projects" onClick={() => scrollToSection(projectsRef)}>Projects</NavLink>
            <NavLink href="#certifications" onClick={() => scrollToSection(certificationsRef)}>Certifications</NavLink>
            <NavLink href="#blog" onClick={() => scrollToSection(blogRef)}>Blog</NavLink>
            <NavLink href="#contact" onClick={() => scrollToSection(contactRef)}>Contact</NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--neon-blue),0.1),transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8 overflow-hidden rounded-full inline-block">
              <img
                src="/images/pp.jpg"
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full border-4 border-[rgb(var(--neon-blue))]"
              />
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="gradient-text">Rajeev Ranjan</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-400 mb-8"
            >
              DevOps Engineer
            </motion.h2>
            
            <div className="terminal mb-8 inline-block">
              <TypeAnimation
                sequence={[
                  '> Automating the future...',
                  2000,
                  '> Building reliable systems...',
                  2000,
                  '> Scaling infrastructure...',
                  2000,
                ]}
                repeat={Infinity}
                className="text-[rgb(var(--neon-blue))]"
              />
            </div>

            <div className="flex justify-center gap-6 relative z-10">
              <a 
                href="https://github.com/rajeev3012" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/rajeev01/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text">About Me</h2>
            <div className="card">
              <p className="text-lg leading-relaxed">
                Passionate DevOps Engineer with expertise in cloud infrastructure, automation, and CI/CD pipelines.
                Specializing in containerization, Kubernetes orchestration, and Infrastructure as Code.
                Committed to building scalable, reliable, and secure systems that drive business success.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 gradient-text">Skills & Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                <div className="skill-icon">
                  <skill.icon className="w-8 h-8 text-[rgb(var(--neon-blue))]" />
                </div>
                <span className="text-sm font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 gradient-text">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group"
              >
                <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 text-[rgb(var(--neon-blue))] hover:text-[rgb(var(--neon-purple))] transition-colors"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section ref={certificationsRef} id="certifications" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 gradient-text">Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card cursor-pointer group"
                onClick={() => setSelectedCert(cert)}
              >
                <Award className="w-8 h-8 text-[rgb(var(--neon-blue))] mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[rgb(var(--neon-blue))] transition-colors">
                  {cert.name}
                </h3>
                <p className="text-gray-400">{cert.issuer}</p>
                <p className="text-sm text-gray-500 mt-2">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 gradient-text">Blog</h2>
          {blogPosts.map((category) => (
            <div key={category.category} className="mb-16">
              <h3 className="text-2xl font-semibold mb-8">{category.category}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {category.posts.map((post) => (
                  <motion.div
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readingTime} min read
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-[rgb(var(--neon-blue))] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-400">{post.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Get in Touch</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card max-w-2xl mx-auto"
          >
            <p className="text-lg mb-8">
              Interested in collaborating or have a project in mind? Let's connect!
            </p>
            <a
              href="mailto:rajeevr.3012@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[rgb(var(--neon-blue))] hover:bg-[rgb(var(--neon-purple))] transition-colors"
            >
              <Mail size={20} />
              Contact Me
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.name}
      >
        {selectedCert && (
          <div className="space-y-4">
            <img
              src={selectedCert.image}
              alt={selectedCert.name}
              className="w-full h-auto rounded-lg"
            />
            <h3 className="text-xl font-semibold">{selectedCert.name}</h3>
            <p className="text-gray-400">{selectedCert.issuer}</p>
            <p className="text-sm text-gray-500">{selectedCert.date}</p>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        title={selectedPost?.title}
      >
        {selectedPost && <BlogPost {...selectedPost} category={blogPosts.find(
          cat => cat.posts.includes(selectedPost)
        )?.category || ''} />}
      </Modal>
    </div>
  );
}

export default App;