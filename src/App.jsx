import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Clock, CloudRain, CloudSun, Container, Cylinder, Download, FileText, FlaskConical, Fuel, Layers,
  Mail, MapPin, Menu, Phone, Recycle, ShieldCheck, Siren, TrainFront, Truck, X,
} from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";
import logo from "./assets/prs-logo.jpg";
import rainier from "./assets/rainier-port.jpg";
import tanks from "./assets/tanks.jpg";
import offloading from "./assets/offloading.jpg";
import totes from "./assets/totes.jpg";
import tankers from "./assets/tankers.jpg";
import vactorHookup from "./assets/vactor-hookup.jpg";
import vactorTruck from "./assets/vactor-truck.jpg";
import drums from "./assets/drums.jpg";
import portCranes from "./assets/port-cranes.jpg";
import nora from "./assets/nora.jpg";
import goingGreen from "./assets/going-green.jpg";
import spectra from "./assets/spectra.png";

// ------------------------------------------------------------ Content (from prsplant.net: Home, About Us, Services, Contact Us,
// Hours of Operation, Federal & State, Regulatory Compliance, Industry Links, Important Documents and the linked Capability
// Statement PDF. The Alaska page currently returns "resource removed".)
const COMPANY = "PRS Group, Inc.";
const ABBR = "prs";
const END_DATE = "2026-12-07T23:59:59-08:00";
const PHONE = "253-383-4175";
const PHONE_TEL = "+12533834175";
const EMERGENCY = "253-988-2531";
const EMERGENCY_TEL = "+12539882531";
const EMAIL = "prs@prsplant.net";
const ADDRESS = ["3003 Taylor Way", "Tacoma, WA 98421"];
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=3003+Taylor+Way+Tacoma+WA+98421";
const WEATHER_URL = "https://www.wunderground.com/dashboard/pws/KWATACOM280";
const DOCS_BASE = "http://www.prsplant.net/";

const NAV = [
  ["What we accept", "#accept"],
  ["How it works", "#process"],
  ["Compliance", "#compliance"],
  ["Agencies", "#agencies"],
  ["Hours", "#hours"],
  ["Contact", "#contact"],
];

// Mon..Sun, from the Hours of Operation page
const HOURS = [
  ["Monday", "6:00 AM – 5:00 PM"],
  ["Tuesday", "6:00 AM – 5:00 PM"],
  ["Wednesday", "6:00 AM – 5:00 PM"],
  ["Thursday", "6:00 AM – 5:00 PM"],
  ["Friday", "6:00 AM – 5:00 PM"],
  ["Saturday", "On call"],
  ["Sunday", "On call"],
];

const INTAKE = [
  [Cylinder, "Barrels & drums"],
  [Container, "Totes"],
  [Truck, "Trucks & bulk loads"],
  [TrainFront, "RR car loads"],
];

const MATERIALS = [
  {
    code: "01", icon: Fuel, title: "Oils & fuels",
    items: ["Used motor oils and oily water", "Fuels: diesel, aircraft and commercial", "Industrial non-lube oils: hydraulic, transmission, quenching", "Non-PCB (<1 ppm) transformer oils", "ATF"],
  },
  {
    code: "02", icon: CloudRain, title: "Waste waters & storm water",
    items: ["Waste water from pressure washing", "Storm water and oil/water separator system wastes", "Industrial waste waters", "Bead blasting materials"],
  },
  {
    code: "03", icon: Layers, title: "Solids & soils",
    items: ["Solids, debris and PCS", "Petroleum contaminated soils", "Drilling slurry", "Absorbents and like materials"],
  },
  {
    code: "04", icon: Recycle, title: "Fluids, filters & drums",
    items: ["Spent antifreeze", "Deicing fluids", "Oil filters: auto and industrial", "Drum disposal"],
  },
];

const STEPS = [
  ["Profile", "Tell us what the waste is. A signed waste profile, with lab data or an SDS when you have it, gets an answer in 2 to 3 days.", FileText],
  ["Deliver", "Bring it to our Port of Tacoma facility by drum, tote, truck or rail car, in large or small quantities.", Truck],
  ["Analyze", "Our on-site team analyzes your materials and walks you through the recommended solution.", FlaskConical],
  ["Treat & test", "Each load is treated, then independently tested and approved by the appropriate regulators before it is discharged.", ShieldCheck],
];

const PERMITS = [
  ["Permit", "RCRA ID", "WAD 980 511 729"],
  ["Permit", "Tacoma Environmental Services", "TAC 026-2025"],
  ["Permit", "Tacoma-Pierce County Health Department", "27-728"],
  ["Permit", "Waste Disposal Authorization", "# 2826"],
  ["Permit", "Puget Sound Clean Air Agency", "10529"],
  ["License", "Washington State Master Business License", "C 602 341 518"],
  ["License", "City of Tacoma Business License", "500031084"],
  ["Insurance", "Crum & Forster Specialty", "EPK-100278"],
];

const GOV_CODES = [
  ["Designation", "Small Business"],
  ["DUNS", "616449778"],
  ["CAGE", "4A0Z9"],
  ["NAICS", "562219, 562998"],
];

const PAST_PERFORMANCE = ["US Coast Guard", "City of Tacoma", "Washington State DOT", "NRC Environmental", "Safety-Kleen"];

const CLIENTS = [
  ["Washington State Department of Transportation", "http://wsdot.wa.gov"],
  ["Safety-Kleen", "http://safety-kleen.com"],
  ["Tacoma Public Utilities", "http://mytpu.org"],
  ["Cowlitz Clean Sweep", ""],
  ["City of Tacoma", "http://cityoftacoma.org"],
  ["NRC Environmental", "http://nrces.com"],
];

const PARTNERS = [
  ["NW Cascade Flowhawks", "http://www.flohawks.com/"],
  ["Clean Harbors", "http://www.cleanharbors.com/"],
  ["Greenfield Services", "http://goteamgreenfield.com"],
  ["Washington Marine Cleaning", "http://washingtonmarinecleaning.com/"],
  ["Northern Environmental", "https://www.northernenv.com/"],
];

const ASSOCIATIONS = [
  ["NORA", "National Oil Recyclers Association", "http://www.noranews.org/"],
  ["PSCWA", "Puget Sound Car Wash Association", "http://pscarwash.org"],
  ["Propeller Club", "Propeller Club of Tacoma", "http://tacomapropellerclub.com"],
  ["Propeller Club", "Propeller Club of Seattle", "http://seattlepropellerclub.org"],
];

const STAFF = [
  ["Josh Simmons", "General Manager · Plant Manager", "Josh@prsplant.net", "206-255-7432"],
  ["Colton Puzon", "Waste Acceptance & Environmental Compliance", "Colton@prsplant.net", ""],
  ["Jillian Smith", "Billing & Accounting", "Jillian@prsplant.net", ""],
];

const DOCS = [
  ["Capability Statement", "Core competencies, past performance and codes", "Capability_Statement_2018.pdf"],
  ["Waste Profile", "Profile and recertification form for a new waste stream", "PRS_Profile_with_recert_120822.pdf"],
  ["Credit Application", "Open a PRS account (net 30 terms)", "prsCredit_Application2017.pdf"],
];

const GALLERY = [
  [offloading, "Trucks offloading at the PRS plant beside the blue storage tanks"],
  [tanks, "PRS storage tanks at the Port of Tacoma on a frosty morning"],
  [totes, "Totes staged for processing"],
  [tankers, "Tanker trailers delivering bulk liquid loads"],
  [vactorHookup, "Crew connecting a vactor truck hose"],
  [vactorTruck, "Vactor truck used for storm system wastes"],
];

const MATERIAL_TYPES = ["Used oil / oily water", "Fuels", "Industrial non-lube oils", "Pressure wash or bead blast water", "Storm water / oil-water separator waste", "Solids, debris or PCS", "Drilling slurry", "Antifreeze or deicing fluid", "Oil filters", "Drums or totes for disposal", "Something else"];

// ------------------------------------------------------------ Helpers
function useTacomaStatus() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  return useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", weekday: "long", hour: "numeric", hour12: false }).formatToParts(now);
    const day = parts.find((p) => p.type === "weekday")?.value || "";
    const hour = Number(parts.find((p) => p.type === "hour")?.value || 0) % 24;
    const weekday = !["Saturday", "Sunday"].includes(day);
    const open = weekday && hour >= 6 && hour < 17;
    return { day, open };
  }, [now]);
}

function CycleRing({ className = "" }) {
  // Three chasing arrows, drawn from the circular red arrows in the PRS logo
  return (
    <svg className={`cycle ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      {[0, 120, 240].map((r) => (
        <g key={r} transform={`rotate(${r} 100 100)`}>
          <path d="M100 14a86 86 0 0 1 72 39" fill="none" strokeWidth="13" strokeLinecap="butt" />
          <path d="M183 48l-6 26-22-15z" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="topline">
        <div className="wrap topline-in">
          <span><Siren size={15} /> 24/7 emergency on call: <a href={`tel:${EMERGENCY_TEL}`}>{EMERGENCY}</a></span>
          <span className="tl-hide"><MapPin size={15} /> Port of Tacoma · {ADDRESS[0]}</span>
        </div>
      </div>
      <div className="wrap header-in">
        <a href="#top" className="brand" aria-label="PRS Group home">
          <span className="logo-plate"><img src={logo} alt="PRS Group logo" width="48" height="60" /></span>
          <span className="brand-text"><strong>PRS Group, Inc.</strong><small>Non-hazardous waste treatment · Tacoma</small></span>
        </a>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-call" href={`tel:${PHONE_TEL}`} onClick={() => setOpen(false)}><Phone size={16} /> {PHONE}</a>
        </nav>
        <button type="button" className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const { day, open } = useTacomaStatus();
  return (
    <section className="hero" id="top">
      <img className="hero-bg" src={rainier} alt="" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Port of Tacoma · 30+ years in the Northwest</p>
          <h1>Worry-free disposal of your <span>liquid and solid</span> non-hazardous waste.</h1>
          <p className="lede">Industrial waste waters, storm water, used oils and fuels, treated at our Port of Tacoma facility. Human health and the environment come first in how we approach and treat every material.</p>
          <div className="hero-actions">
            <a className="btn btn-red" href="#contact">Profile a waste stream <ArrowRight size={18} /></a>
            <a className="btn btn-ghost" href={`tel:${PHONE_TEL}`}><Phone size={18} /> {PHONE}</a>
          </div>
        </div>
        <aside className="ticket" aria-label="Hours and contact">
          <div className="ticket-head">
            <span className="ticket-label">Plant status</span>
            <span className={`status ${open ? "is-open" : "is-call"}`}>{open ? "Open now" : "On call"}</span>
          </div>
          <ul className="ticket-hours">
            {HOURS.map(([d, h]) => <li key={d} className={d === day ? "is-today" : ""}><span>{d}</span><span>{h}</span></li>)}
          </ul>
          <a className="ticket-row" href={`tel:${PHONE_TEL}`}><Phone size={18} /><span><small>Office</small>{PHONE}</span></a>
          <a className="ticket-row emergency" href={`tel:${EMERGENCY_TEL}`}><Siren size={18} /><span><small>24/7 emergency</small>{EMERGENCY}</span></a>
          <CycleRing className="ticket-ring" />
        </aside>
      </div>
      <div className="intake">
        <div className="wrap intake-in">
          <p>We accept large and small quantities from</p>
          <ul>{INTAKE.map(([Icon, label]) => <li key={label}><Icon size={20} /> {label}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Accept() {
  return (
    <section className="section accept" id="accept">
      <div className="wrap">
        <header className="sec-head">
          <p className="eyebrow dark"><Recycle size={16} /> What we accept</p>
          <h2>Bulk and drum wastes, <em>accepted and recycled.</em></h2>
          <p>Liquid or solid, if it's non-hazardous we can likely take it. Every material is listed in our capability statement and services page. Don't see yours? Call and ask.</p>
        </header>
        <div className="labels">
          {MATERIALS.map(({ code, icon: Icon, title, items }) => (
            <article key={code} className="label-card">
              <div className="label-top"><span>NON-HAZ · {code}</span><Icon size={22} /></div>
              <h3>{title}</h3>
              <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="accept-foot">
          <img src={drums} alt="Blue steel drums lined up" loading="lazy" />
          <p><strong>More materials?</strong> Just contact us and ask. Not sure how to handle a particular waste issue? One of our experienced staff will guide you through the recommended solutions.</p>
          <a className="btn btn-navy" href={`tel:${PHONE_TEL}`}><Phone size={18} /> {PHONE}</a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process" id="process">
      <div className="wrap">
        <header className="sec-head light">
          <p className="eyebrow"><ShieldCheck size={16} /> How a load is handled</p>
          <h2>Tested before it leaves. <em>Every load.</em></h2>
          <p>Each load discharged from our facility is independently tested and approved by the appropriate regulators first. Unlike some facilities, we do not run ongoing discharge, which would leave you unnecessarily exposed to additional liability.</p>
        </header>
        <ol className="steps">
          {STEPS.map(([title, text, Icon], i) => (
            <li key={title}>
              <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className="lab-note">
          <img src={spectra} alt="Spectra Laboratories logo" width="189" height="60" loading="lazy" />
          <p>We depend on our independent laboratory partners for the security that each material you entrust to us is handled the right way, every time.</p>
        </div>
      </div>
    </section>
  );
}

function Compliance() {
  return (
    <section className="section compliance" id="compliance">
      <div className="wrap comp-grid">
        <div className="comp-copy">
          <p className="eyebrow dark"><FileText size={16} /> Regulatory compliance</p>
          <h2>Regulations change. <em>Your liability shouldn't.</em></h2>
          <p>State and federal environmental compliance laws are complicated and ever changing. Our facility at the Port of Tacoma is regulated by many environmental laws through several agencies and departments, and our staff have dealt with many complex waste issues. As your one-stop waste management partner, we save you time and put an end to regulation and compliance worry.</p>
          <figure className="comp-photo"><img src={portCranes} alt="Port of Tacoma cranes with Mount Rainier behind" loading="lazy" /></figure>
        </div>
        <div className="permit-board" aria-label="Permits, licenses and insurance">
          <div className="pb-head"><span>Permits &amp; codes</span><span>PRS Group, Inc.</span></div>
          {PERMITS.map(([kind, name, num]) => (
            <div key={name} className="pb-row">
              <span className="pb-kind">{kind}</span>
              <span className="pb-name">{name}</span>
              <span className="pb-num">{num}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Agencies() {
  return (
    <section className="section agencies" id="agencies">
      <div className="wrap">
        <div className="ag-grid">
          <div className="ag-copy">
            <p className="eyebrow dark"><ShieldCheck size={16} /> Federal &amp; state</p>
            <h2>Ready for agency schedules.</h2>
            <p>We are pleased to serve federal, state and local governmental agencies throughout the Northwest. We receive materials from throughout Washington and Alaska through all Washington ports of entry, truck and rail.</p>
            <dl className="codes">{GOV_CODES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <a className="text-link" href={`${DOCS_BASE}Capability_Statement_2018.pdf`} target="_blank" rel="noopener noreferrer"><Download size={16} /> Capability Statement (PDF)</a>
          </div>
          <div className="ag-lists">
            <div className="ag-card">
              <h3>Past performance</h3>
              <ul>{PAST_PERFORMANCE.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className="ag-card">
              <h3>Valued clients &amp; references</h3>
              <ul>{CLIENTS.map(([n, u]) => <li key={n}>{u ? <a href={u} target="_blank" rel="noopener noreferrer">{n} <ArrowUpRight size={13} /></a> : n}</li>)}</ul>
            </div>
            <div className="ag-card">
              <h3>Industry partners</h3>
              <ul>{PARTNERS.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noopener noreferrer">{n} <ArrowUpRight size={13} /></a></li>)}</ul>
            </div>
          </div>
        </div>
        <div className="assoc">
          <div className="assoc-badges">
            <a href="http://www.noranews.org/" target="_blank" rel="noopener noreferrer" className="badge"><img src={nora} alt="NORA, Association of Responsible Recyclers" loading="lazy" /></a>
            <span className="badge"><img src={goingGreen} alt="Going Green Washington" loading="lazy" /></span>
          </div>
          <div className="assoc-list">
            <h3>Industry associations</h3>
            <ul>{ASSOCIATIONS.map(([short, name, url]) => (
              <li key={name}><a href={url} target="_blank" rel="noopener noreferrer"><strong>{short}</strong><span>{name}</span></a></li>
            ))}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plant() {
  return (
    <section className="section plant" id="about">
      <div className="wrap plant-grid">
        <div className="plant-copy">
          <p className="eyebrow"><Recycle size={16} /> About PRS Group</p>
          <h2>Doing what's right for you and the environment. <em>The right way, every time.</em></h2>
          <p>With more than 30 years of critical waste management experience in the Northwest, we are experts in managing and processing oils, fuels, industrial waste waters, storm water and more. Our highly trained on-site team is ready to analyze your materials and help with all of your disposal questions.</p>
          <p>We proudly support industry leaders in construction, storm waste, environmental cleanup and the petroleum industries, and we're available 24 hours a day, 7 days a week.</p>
          <a className="text-link light" href={WEATHER_URL} target="_blank" rel="noopener noreferrer"><CloudSun size={16} /> Live conditions from our weather station <ArrowUpRight size={14} /></a>
        </div>
        <div className="plant-photos">
          {GALLERY.map(([src, alt], i) => (
            <figure key={alt} className={`pp pp-${i}`}><img src={src} alt={alt} loading="lazy" /></figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", service: "", location: "", notes: "", website: "" });
  const [status, setStatus] = useState("idle");
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json().catch(() => ({}));
      setStatus(r.ok && d.success ? (d.demo ? "demo" : "sent") : "error");
    } catch { setStatus("error"); }
  }
  if (status === "sent" || status === "demo") {
    return (
      <div className="form-done">
        <h3>Thanks, we have it.</h3>
        <p>{status === "demo" ? `This concept's form isn't connected yet. Please call ${PHONE} or email ${EMAIL}.` : "Someone from waste acceptance will be in touch about your material."}</p>
      </div>
    );
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>Name *<input required value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" /></label>
        <label>Company<input value={form.company} onChange={(e) => update("company", e.target.value)} autoComplete="organization" /></label>
      </div>
      <div className="form-row">
        <label>Phone *<input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></label>
      </div>
      <div className="form-row">
        <label>Material
          <select value={form.service} onChange={(e) => update("service", e.target.value)}>
            <option value="">Select one...</option>
            {MATERIAL_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label>Quantity &amp; containers<input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. 6 drums, 1 tote, 4,000 gal" /></label>
      </div>
      <label>About the waste<textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="How it was generated, lab data or SDS available, where it's coming from..." /></label>
      <input className="hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} aria-hidden="true" />
      {status === "error" && <p className="form-error" role="alert">That didn't go through. Please call {PHONE}.</p>}
      <button className="btn btn-red btn-block" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send to waste acceptance"} <ArrowRight size={18} /></button>
    </form>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-info" id="hours">
          <p className="eyebrow dark"><Clock size={16} /> Hours &amp; contact</p>
          <h2>Call the plant, or send the details.</h2>
          <div className="hours-card">
            <div className="hc-main"><strong>Mon – Fri</strong><span>6:00 AM – 5:00 PM</span></div>
            <div className="hc-main"><strong>Sat – Sun</strong><span>On call</span></div>
            <a className="hc-emerg" href={`tel:${EMERGENCY_TEL}`}><Siren size={20} /> 24/7 on call emergency <b>{EMERGENCY}</b></a>
          </div>
          <ul className="contact-list">
            <li><Phone size={18} /><div><span>Office</span><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></div></li>
            <li><Mail size={18} /><div><span>Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></li>
            <li><MapPin size={18} /><div><span>Facility</span><a href={MAP_URL} target="_blank" rel="noopener noreferrer">{ADDRESS[0]}, {ADDRESS[1]} <ArrowUpRight size={14} /></a></div></li>
          </ul>
          <div className="staff">
            {STAFF.map(([name, role, email, mobile]) => (
              <div key={name} className="person">
                <strong>{name}</strong><span>{role}</span>
                <a href={`mailto:${email}`}>{email}</a>
                {mobile && <a href={`tel:+1${mobile.replaceAll("-", "")}`}>Mobile {mobile}</a>}
              </div>
            ))}
          </div>
        </div>
        <div className="contact-card">
          <h3>Ask about a material</h3>
          <p className="cc-sub">Waste acceptance will reply with next steps or a waste profile to complete.</p>
          <ContactForm />
          <div className="docs">
            <h4>Important documents</h4>
            {DOCS.map(([t, d, f]) => (
              <a key={f} href={`${DOCS_BASE}${f}`} target="_blank" rel="noopener noreferrer" className="doc">
                <FileText size={20} /><span><strong>{t}</strong><small>{d}</small></span><Download size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="logo-plate"><img src={logo} alt="PRS Group logo" width="48" height="60" loading="lazy" /></span>
          <p><strong>PRS Group, Inc.®</strong><br />Worry-free disposal of liquid and solid non-hazardous waste for the Northwest for more than 30 years.</p>
        </div>
        <div>
          <h4>Facility</h4>
          <p>{ADDRESS[0]}<br />{ADDRESS[1]}</p>
          <p><a href={`tel:${PHONE_TEL}`}>{PHONE}</a><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
        <div>
          <h4>Hours</h4>
          <p>Mon – Fri 6:00 AM – 5:00 PM<br />Sat – Sun on call</p>
          <p>24/7 emergency<br /><a href={`tel:${EMERGENCY_TEL}`}>{EMERGENCY}</a></p>
        </div>
        <div>
          <h4>On this page</h4>
          {NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </div>
      </div>
      <div className="wrap footer-line">
        <span>© {new Date().getFullYear()} {COMPANY} · Concept redesign by Blueprint WebStudio · independent concept, not for official use</span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Accept />
        <Process />
        <Contact />
        <Compliance />
        <Agencies />
        <Plant />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={import.meta.env.VITE_CONCEPT_END_DATE || END_DATE} />
    </>
  );
}
