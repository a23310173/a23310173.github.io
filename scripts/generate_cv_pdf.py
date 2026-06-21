from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_PDF = OUTPUT_DIR / "CV SANTIAGO RAMIREZ OROZCO WP.pdf"


BLUE = colors.HexColor("#0f4fb3")
TEXT = colors.HexColor("#111111")
MUTED = colors.HexColor("#4b5563")
LINE = colors.HexColor("#d6deeb")


def bullet_lines(items):
    return "<br/>".join(f"- {item}" for item in items)


def build_pdf():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        leftMargin=13 * mm,
        rightMargin=13 * mm,
        topMargin=11 * mm,
        bottomMargin=10 * mm,
        title="Santiago Ramirez Orozco CV",
        author="Santiago Ramirez Orozco",
    )

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Name",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=24,
            textColor=BLUE,
            alignment=TA_CENTER,
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.55,
            leading=11.3,
            textColor=TEXT,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Small",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.0,
            leading=10.4,
            textColor=MUTED,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=12.5,
            textColor=BLUE,
            alignment=TA_LEFT,
            spaceAfter=2,
            spaceBefore=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Subheading",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.4,
            leading=11,
            textColor=TEXT,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Meta",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=9.8,
            textColor=MUTED,
            alignment=TA_LEFT,
        )
    )

    story = []

    story.append(Paragraph("SANTIAGO RAMIREZ OROZCO", styles["Name"]))

    contact_table = Table(
        [
            [
                Paragraph("<b>Mobile:</b> (+52) 33 2297 9723", styles["Body"]),
                Paragraph("<b>Languages:</b> Spanish (Native) | English (C1 Certified)", styles["Body"]),
            ],
            [
                Paragraph("<b>Address:</b> Zapopan, Jalisco, Mexico", styles["Body"]),
                Paragraph("<b>Additional Languages:</b> French (A2) | Italian (A2)", styles["Body"]),
            ],
            [
                Paragraph("<b>E-mail:</b> <link href='mailto:santiagor.orozco@gmail.com'>santiagor.orozco@gmail.com</link>", styles["Body"]),
                Paragraph("<b>Portfolio:</b> <link href='https://santiago-orozco.me'>santiago-orozco.me</link> | <link href='https://github.com/a23310173'>github.com/a23310173</link>", styles["Body"]),
            ],
        ],
        colWidths=[87 * mm, 87 * mm],
        hAlign="LEFT",
    )
    contact_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )
    story.append(contact_table)
    story.append(Spacer(1, 3))

    def section(title):
        story.append(Paragraph(title, styles["Section"]))
        story.append(HRFlowable(width="100%", thickness=1, color=BLUE, spaceBefore=1, spaceAfter=4))

    section("SUMMARY")
    summary = (
        "Software developer with experience across manufacturing operations, data analysis, and business-focused web systems. "
        "During my Summer Camp Internship at Jabil, I support Test Engineering through dashboards, databases, and software solutions. "
        "I have also led web relaunches, internal systems, and KPI-driven platforms for real business use cases."
    )
    story.append(Paragraph(summary, styles["Body"]))
    story.append(Spacer(1, 2))

    section("SKILLS")
    skills_table = Table(
        [
            [
                Paragraph(
                    "<b>Technical:</b> Python, PHP, SQL/MySQL, HTML, CSS, JavaScript, Node.js, Angular (TypeScript), "
                    "Dart/Flutter, Power BI, Power Query, MongoDB Atlas, Cybersecurity, Network Installation.",
                    styles["Body"],
                ),
            ],
            [
                Paragraph(
                    "<b>Professional:</b> Data Analysis, Dashboard Development, Project Management, Problem-Solving, "
                    "Analytical Thinking, Team Leadership, Client Collaboration, High-impact presentations (Speak Up).",
                    styles["Body"],
                ),
            ],
        ],
        colWidths=[174 * mm],
    )
    skills_table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    story.append(skills_table)

    section("WORK EXPERIENCE")
    experience = [
        (
            "Summer Camp Intern - Test Engineering",
            "Jabil | Guadalajara, Mexico | Jun 2026 - Aug 2026",
            [
                "Analyze manufacturing test data and support operational decision-making through dashboards and structured reporting.",
                "Build and maintain Power BI dashboards, databases, and software tools for the Test Engineering area.",
            ],
        ),
        (
            "Software Developer & Pharmaceutical Chemist",
            "DermaSun | Zapopan, Mexico | 2020 - Present | https://www.dermasun.net",
            [
                "Developed and relaunched the company's e-commerce website, driving a 200% increase in online sales.",
                "Led internal digital and operational initiatives spanning web systems, process improvement, and infrastructure support.",
            ],
        ),
        (
            "Freelance Web Developer",
            "Natural-hair.mx | Zapopan, Mexico | 2025",
            [
                "Architected and developed a dynamic full-stack catalog website for a beauty industry client.",
                "Implemented a product catalog, location finder, Q&amp;A section, and custom SQL-backed features.",
            ],
        ),
    ]

    for title, meta, bullets in experience:
        story.append(Paragraph(title, styles["Subheading"]))
        story.append(Paragraph(meta, styles["Meta"]))
        story.append(Paragraph(bullet_lines(bullets), styles["Body"]))
        story.append(Spacer(1, 2))

    section("HIGHLIGHTED PROJECTS")
    projects = [
        (
            "app.dermasun.net",
            "Business management system for dermasun.net.",
            "Centralizes internal processes and supports day-to-day business operations.",
        ),
        (
            "OZCTECH.net / ozctech.com.mx",
            "Personal website and professional digital presence.",
            "Presents services, projects, and contact channels as the base of my professional online identity.",
        ),
        (
            "DeployTrack.store",
            "ITIL service management system with KPI dashboard.",
            "Provides visibility into service workflows, incidents, and operational KPIs.",
        ),
        (
            "Milaquiniela.site",
            "Node.js web app for the FIFA World Cup 2026 quiniela.",
            "Manages participants, match tracking, and pool administration for tournament operations.",
        ),
    ]

    for name, label, desc in projects:
        story.append(Paragraph(f"<b>{name}</b> - {label}", styles["Body"]))
        story.append(Paragraph(desc, styles["Small"]))
        story.append(Spacer(1, 2))

    section("EDUCATION")
    education_table = Table(
        [
            [
                Paragraph("Bachelor of Engineering in Software Development, CETI Colomos", styles["Body"]),
                Paragraph("2023 - 2027", styles["Body"]),
            ],
            [
                Paragraph("Technologist in Pharmaceutical Chemistry, CETI Colomos", styles["Body"]),
                Paragraph("2019 - 2022", styles["Body"]),
            ],
        ],
        colWidths=[145 * mm, 29 * mm],
    )
    education_table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (1, -1), "RIGHT"),
            ]
        )
    )
    story.append(education_table)

    section("CERTIFICATES")
    certs = [
        "Power BI Fundamentals - Santander Open Academy - Jun 2026",
        "Speak Up Workshop - Jabil - Jun 2026",
        "ISO 27001 Workshop - 2024",
        "Networking Devices and Initial Configuration by Cisco - 2024",
        "Networking Basics by Cisco - 2023",
        "Cambridge English Placement Test (CEFR Level C1) - 2021",
        "Service Excellence Program - ILAC College, Toronto, Canada - 2021",
    ]
    story.append(Paragraph(bullet_lines(certs), styles["Body"]))

    doc.build(story)


if __name__ == "__main__":
    build_pdf()
