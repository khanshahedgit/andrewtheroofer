import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Hammer,
  HardHat,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  X,
} from "lucide-react";
import { type FormEvent, type PointerEvent, useEffect, useRef, useState } from "react";

import heroImage from "../assets/roofing-hero.jpg";
import projectDetail from "../assets/project-detail.jpg";
import projectCraft from "../assets/project-craft.jpg";
import projectHome from "../assets/project-home.jpg";
import andrewOwner from "../assets/andrew-owner.jpg.asset.json";
import compareOneBefore from "../assets/compare-one-before.jpg";
import compareOneAfter from "../assets/compare-one-after.jpg";
import compareTwoBefore from "../assets/compare-two-before.jpg";
import compareTwoAfter from "../assets/compare-two-after.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Andrew The Roofer | Professional Roofing" },
      { name: "description", content: "Professional, dependable roofing workmanship from Andrew The Roofer. Request a free, no-obligation quote." },
      { property: "og:title", content: "Andrew The Roofer | Professional Roofing" },
      { property: "og:description", content: "Professional, dependable roofing workmanship. Request a free quote from Andrew The Roofer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = ["Home", "About", "Services", "Projects", "Videos", "Reviews", "Contact"];
const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

function Button({ children, variant = "primary", onClick, type = "button", className = "" }: { children: React.ReactNode; variant?: "primary" | "outline" | "light"; onClick?: () => void; type?: "button" | "submit"; className?: string }) {
  return <button type={type} onClick={onClick} className={`site-button site-button--${variant} ${className}`}>{children}</button>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled || open ? "site-header--solid" : ""}`}>
      <a href="#home" className="wordmark" aria-label="Andrew The Roofer home">
        <span className="wordmark-mark">A</span><span>ANDREW <b>THE ROOFER</b></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
      </nav>
      <Button className="header-cta" onClick={() => scrollTo("contact")}>GET A FREE QUOTE <ArrowRight size={16} /></Button>
      <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      <div className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}>
        {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}<ArrowRight size={16} /></a>)}
        <Button onClick={() => { setOpen(false); scrollTo("contact"); }}>GET A FREE QUOTE</Button>
      </div>
    </header>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow--light" : ""}`}><span />{children}</div>;
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading reveal ${light ? "section-heading--light" : ""}`}><Eyebrow light={light}>{eyebrow}</Eyebrow><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}

function Hero() {
  return <section id="home" className="hero">
    <img className="hero-image" src={heroImage} alt="Professional roofer inspecting a newly installed tiled roof" width={1920} height={1200} />
    <div className="hero-shade" />
    <div className="hero-content">
      <Eyebrow light>PROFESSIONAL ROOFING · BUILT WITH CARE</Eyebrow>
      <h1><span>A stronger roof.</span><span>A safer home.</span></h1>
      <p>Dependable roofing workmanship, clear communication and careful attention to the details that protect your property.</p>
      <div className="hero-actions"><Button onClick={() => scrollTo("contact")}>GET A FREE QUOTE <ArrowRight size={17} /></Button><Button variant="outline" onClick={() => scrollTo("services")}>VIEW OUR SERVICES</Button></div>
      <div className="hero-rating"><div>{[1,2,3,4,5].map((n) => <Star key={n} size={15} fill="currentColor" />)}</div><strong>3 REVIEWS</strong><span>Customer feedback</span></div>
    </div>
    <button className="scroll-cue" onClick={() => scrollTo("about")} aria-label="Scroll to meet Andrew"><span>DISCOVER</span><ArrowDown size={17} /></button>
  </section>;
}

const trustItems = [
  [ShieldCheck, "Quality Workmanship", "Care in every detail"], [Target, "Reliable Service", "Clear and dependable"], [HardHat, "Professional Roofing", "Built for the elements"], [Sparkles, "Customer Focused", "Your property, respected"],
] as const;

function TrustStrip() {
  return <section className="trust-strip" aria-label="Our commitments"><div className="wrap trust-grid">{trustItems.map(([Icon, title, copy], i) => <div className="trust-item reveal" style={{ transitionDelay: `${i * 80}ms` }} key={title}><Icon /><div><strong>{title}</strong><span>{copy}</span></div></div>)}</div></section>;
}

function About() {
  return <section id="about" className="section about"><div className="wrap about-grid">
    <div className="owner-portrait reveal">
      <div className="owner-photo"><img src={andrewOwner.url} alt="Andrew, owner of Andrew The Roofer" loading="eager" /></div>
      <div className="image-index">01 <span>/ OWNER</span></div>
    </div>
    <div className="about-copy reveal"><Eyebrow>MEET ANDREW</Eyebrow><h2>A personal approach to professional roofing.</h2><div className="accent-rule" /><p className="lead">Andrew The Roofer is built around straightforward service, thoughtful workmanship and treating every property with respect.</p><p>This space is ready for Andrew’s own story—an opportunity to share the values behind the work and help customers know exactly who they are inviting to care for their roof.</p><Button variant="light" onClick={() => scrollTo("contact")}>TALK TO ANDREW <ArrowRight size={17} /></Button></div>
  </div></section>;
}

const services = [
  { icon: Hammer, title: "Roofing Service 01", copy: "Add the name and a short, accurate description of this roofing service." },
  { icon: ShieldCheck, title: "Roofing Service 02", copy: "Add the name and a short, accurate description of this roofing service." },
  { icon: HardHat, title: "Roofing Service 03", copy: "Add the name and a short, accurate description of this roofing service." },
];

function Services() {
  return <section id="services" className="section services"><div className="wrap"><SectionHeading eyebrow="WHAT WE DO" title="Roofing, handled properly." copy="Service details can be updated as soon as Andrew’s confirmed offering is available." /><div className="service-grid">{services.map(({ icon: Icon, title, copy }, i) => <article className="service-card reveal" style={{ transitionDelay: `${i * 100}ms` }} key={title}><span className="service-number">0{i + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p><span className="service-link">DETAILS TO BE ADDED <ArrowRight size={15} /></span></article>)}</div></div></section>;
}

const projects = [
  { image: projectDetail, title: "Roof Detail", category: "Project imagery placeholder", cls: "project-tall" },
  { image: projectCraft, title: "Craft in Progress", category: "Project imagery placeholder", cls: "project-wide" },
  { image: projectHome, title: "Finished Roofline", category: "Project imagery placeholder", cls: "project-small" },
];

function Projects() {
  return <section id="projects" className="section projects"><div className="wrap"><div className="heading-row"><SectionHeading eyebrow="SELECTED WORK" title="The standard is in the detail." /><p className="reveal">Representative roofing imagery is shown until Andrew’s own project photographs and details are added.</p></div><div className="project-grid">{projects.map((item, i) => <figure className={`project-card reveal ${item.cls}`} style={{ transitionDelay: `${i * 90}ms` }} key={item.title}><img src={item.image} alt={item.title} loading="lazy" /><figcaption><span>{item.category}</span><strong>{item.title}</strong></figcaption></figure>)}</div></div></section>;
}

function Comparison({ before, after, number }: { before: string; after: string; number: string }) {
  const [position, setPosition] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const box = ref.current.getBoundingClientRect();
    setPosition(Math.max(2, Math.min(98, ((event.clientX - box.left) / box.width) * 100)));
  };
  return <div ref={ref} className="comparison reveal" onPointerMove={(event) => event.buttons === 1 && move(event)} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); move(event); }}>
    <img src={after} alt={`Completed roof comparison ${number}`} loading="lazy" draggable={false} />
    <div className="before-layer" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src={before} alt={`Roof before work comparison ${number}`} loading="lazy" draggable={false} /></div>
    <span className="compare-label compare-label--before">BEFORE</span><span className="compare-label compare-label--after">AFTER</span>
    <div className="compare-line" style={{ left: `${position}%` }}><div className="compare-handle"><ChevronLeft size={16}/><ChevronRight size={16}/></div></div>
  </div>;
}

function BeforeAfter() {
  return <section className="section before-after"><div className="wrap"><SectionHeading eyebrow="BEFORE / AFTER" title="See the difference." copy="Drag the handles to compare representative before-and-after roofing imagery." /><div className="comparison-grid"><Comparison before={compareOneBefore} after={compareOneAfter} number="one"/><Comparison before={compareTwoBefore} after={compareTwoAfter} number="two"/></div></div></section>;
}

const reels = ["reel1", "reel2", "reel3"];
function Videos() {
  return <section id="videos" className="section videos"><div className="wrap"><SectionHeading eyebrow="ROOFING IN ACTION" title="See the work unfold." copy="Three spaces are ready for Andrew’s Facebook Reels. Add an embed URL to each reel variable to publish it here." light /><div className="reel-grid">{reels.map((reel, i) => <article className="reel-card reveal" style={{ transitionDelay: `${i * 90}ms` }} key={reel}><div className="reel-screen"><div className="reel-placeholder"><span className="play-circle"><Play fill="currentColor" /></span><strong>FACEBOOK REEL</strong><small>{reel} · Embed ready</small></div></div><div className="reel-footer"><span><Facebook size={16}/> FACEBOOK REEL</span><ArrowRight size={18}/></div></article>)}</div></div></section>;
}

const reviews = [1, 2, 3];
function Reviews() {
  const [active, setActive] = useState(0);
  const next = (dir: number) => setActive((active + dir + reviews.length) % reviews.length);
  return <section id="reviews" className="section reviews"><div className="wrap"><div className="review-head"><SectionHeading eyebrow="CUSTOMER FEEDBACK" title="3 Reviews. Real voices to come." /><div className="carousel-controls"><button onClick={() => next(-1)} aria-label="Previous review"><ChevronLeft /></button><button onClick={() => next(1)} aria-label="Next review"><ChevronRight /></button></div></div><div className="review-window reveal"><div className="review-track" style={{ transform: `translateX(-${active * 100}%)` }}>{reviews.map((review) => <article className="review-card" key={review}><div className="stars">{reviews.concat([4,5]).map((n) => <Star key={n} size={18} fill="currentColor" />)}</div><blockquote>“Review text placeholder — replace this with the customer’s original feedback.”</blockquote><footer><div><strong>CUSTOMER NAME</strong><span>Review {review} of 3 · Date optional</span></div><span className="quote-mark">”</span></footer></article>)}</div></div><div className="dots">{reviews.map((n, i) => <button key={n} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`Show review ${n}`} />)}</div></div></section>;
}

function QuoteCta() {
  return <section className="quote-cta"><img src={projectCraft} alt="Roofing craftsmanship detail" loading="lazy" /><div className="wrap reveal"><Eyebrow light>START A CONVERSATION</Eyebrow><h2>Ready for a better roof?</h2><p>Tell Andrew what you need and take the first step with a free, no-obligation quote.</p><Button onClick={() => scrollTo("contact")}>GET A FREE QUOTE <ArrowRight size={17}/></Button></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (event.currentTarget.checkValidity()) setSent(true); };
  return <section id="contact" className="section contact"><div className="wrap contact-grid"><div className="contact-copy reveal"><Eyebrow>GET IN TOUCH</Eyebrow><h2>Let’s talk about your roof.</h2><p>Share a few details below. Contact details and service area can be updated when confirmed.</p><div className="contact-list"><div><Phone/><span><small>PHONE</small>[ADD PHONE NUMBER]</span></div><div><Mail/><span><small>EMAIL</small>[ADD EMAIL ADDRESS]</span></div><div><MapPin/><span><small>SERVICE AREA</small>[ADD LOCATION / AREA]</span></div><div><Facebook/><span><small>FACEBOOK</small>[ADD FACEBOOK PAGE]</span></div></div></div><form className="quote-form reveal" onSubmit={submit}><div className="form-heading"><span>FREE QUOTE REQUEST</span><b>01 — 05</b></div><div className="field-row"><label>Your name<input required maxLength={100} name="name" placeholder="Full name" /></label><label>Phone number<input required maxLength={30} name="phone" type="tel" placeholder="Best contact number" /></label></div><label>Email address<input required maxLength={255} name="email" type="email" placeholder="you@example.com" /></label><label>Project type<select required name="projectType" defaultValue=""><option value="" disabled>Select an option</option><option>Roofing enquiry</option><option>Quote request</option><option>Other</option></select></label><label>Tell us about the project<textarea required maxLength={1500} name="message" rows={4} placeholder="A brief description of what you need…" /></label><Button type="submit">SEND QUOTE REQUEST <ArrowRight size={17}/></Button>{sent && <p className="form-success"><Check size={17}/> Thank you. This demo form is ready to connect to your preferred inbox.</p>}</form></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer-main"><div className="footer-brand"><a href="#home" className="wordmark"><span className="wordmark-mark">A</span><span>ANDREW <b>THE ROOFER</b></span></a><p>Professional roofing, delivered with care and respect for your property.</p><Button onClick={() => scrollTo("contact")}>GET A FREE QUOTE <ArrowRight size={16}/></Button></div><div><strong>NAVIGATE</strong>{navItems.slice(0,4).map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div><div><strong>MORE</strong>{navItems.slice(4).map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div><div><strong>CONTACT</strong><span>[PHONE NUMBER]</span><span>[EMAIL ADDRESS]</span><span>[SERVICE AREA]</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Andrew The Roofer. All rights reserved.</span><span>BUILT ON SOLID FOUNDATIONS.</span></div></div></footer>;
}

function Index() {
  return <><RevealObserver/><Header/><main><Hero/><TrustStrip/><About/><Services/><Projects/><BeforeAfter/><Videos/><Reviews/><QuoteCta/><Contact/></main><Footer/></>;
}