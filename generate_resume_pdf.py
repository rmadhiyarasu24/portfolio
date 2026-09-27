"""
Generates the official 2-page PDF resume matching Madhiyarasu R's verified resume document.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def create_resume_pdf(output_path: str):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    name_style = ParagraphStyle(
        'ResumeName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.black
    )

    title_style = ParagraphStyle(
        'ResumeTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.black
    )

    contact_style = ParagraphStyle(
        'ResumeContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.black
    )

    heading_style = ParagraphStyle(
        'ResumeSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.black,
        spaceAfter=2
    )

    subheading_style = ParagraphStyle(
        'ResumeSubHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.black
    )

    meta_style = ParagraphStyle(
        'ResumeMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.black,
        alignment=2 # Right aligned
    )

    body_style = ParagraphStyle(
        'ResumeBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.black
    )

    bullet_style = ParagraphStyle(
        'ResumeBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        leftIndent=12,
        textColor=colors.black
    )

    elements = []

    # 1. Header
    elements.append(Paragraph("<b>MADHIYARASU R</b>", name_style))
    elements.append(Paragraph("Artificial Intelligence & Data Science Student", title_style))
    elements.append(Spacer(1, 4))
    
    contact_text = (
        "rmadhiyarasu0803@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; 9344955053 &nbsp;&nbsp;|&nbsp;&nbsp; "
        "Namakkal &nbsp;&nbsp;|&nbsp;&nbsp; linkedin.com/in/rmadhiyarasu<br/>"
        "github.com/rmadhiyarasu24 &nbsp;&nbsp;|&nbsp;&nbsp; leetcode.com/u/MADHIYARASU08/"
    )
    elements.append(Paragraph(contact_text, contact_style))
    elements.append(Spacer(1, 8))

    # Helper for Section Heading
    def add_section_header(title):
        elements.append(Spacer(1, 4))
        elements.append(Paragraph(f"<b>{title}</b>", heading_style))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=5, spaceBefore=1))

    # 2. Career Objective
    add_section_header("CAREER OBJECTIVE")
    elements.append(Paragraph(
        "Motivated Artificial Intelligence & Data Science student with a strong foundation in programming, "
        "data structures, and web development. Seeking an internship opportunity to apply problem-solving skills "
        "and build scalable, real-world applications in software and AI-driven environments.",
        body_style
    ))
    elements.append(Spacer(1, 4))

    # 3. Internship Experience
    add_section_header("INTERNSHIP EXPERIENCE")
    
    # Six O Four Solutions
    exp1_table = Table([
        [
            Paragraph("<b>AI & Machine Learning Intern</b>, <i>Six O Four Solutions</i>", subheading_style),
            Paragraph("06/2026 – 07/2026<br/>Offline - Palani", meta_style)
        ]
    ], colWidths=[380, 160])
    exp1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(exp1_table)
    elements.append(Spacer(1, 2))
    elements.append(Paragraph("• Developed AI applications using LangChain, RAG, Vector Databases, and LLMs.", bullet_style))
    elements.append(Paragraph("• Gained hands-on experience in AI, Machine Learning, and Data Science concepts.", bullet_style))
    elements.append(Paragraph("• Built intelligent AI workflows and enhanced practical problem-solving skills through real-world applications.", bullet_style))
    elements.append(Spacer(1, 5))

    # WebGen Technology
    exp2_table = Table([
        [
            Paragraph("<b>Web Development Intern</b>, <i>WebGen Technology</i>", subheading_style),
            Paragraph("06/2025 – 07/2025<br/>Online", meta_style)
        ]
    ], colWidths=[380, 160])
    exp2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(exp2_table)
    elements.append(Spacer(1, 2))
    elements.append(Paragraph("• Developed responsive web interfaces using modern frontend technologies", bullet_style))
    elements.append(Paragraph("• Assisted in backend integration and basic API handling", bullet_style))
    elements.append(Paragraph("• Used Git for version control and collaborative development", bullet_style))
    elements.append(Paragraph("• Gained practical experience in real-time project workflows and teamwork", bullet_style))
    elements.append(Spacer(1, 4))

    # 4. Education
    add_section_header("EDUCATION")
    edu_table = Table([
        [
            Paragraph("<b>B.Tech – Artificial Intelligence & Data Science</b>,<br/>SNS College of Engineering, Tamil Nadu", subheading_style),
            Paragraph("2024 – 2028<br/>Tamil Nadu, India", meta_style)
        ]
    ], colWidths=[380, 160])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(edu_table)
    elements.append(Spacer(1, 1))
    elements.append(Paragraph("• CGPA: 8.3", bullet_style))
    elements.append(Spacer(1, 4))

    # 5. Technical Skills
    add_section_header("TECHNICAL SKILLS")
    skills_data = [
        [
            Paragraph("<b>Programming Languages</b><br/>Java, Python, C", body_style),
            Paragraph("<b>Web Technologies</b><br/>HTML, CSS, JavaScript, React (Vite + TypeScript)", body_style)
        ],
        [
            Paragraph("<b>Tools & Platforms</b><br/>Git, GitHub, Firebase, Supabase, VS Code", body_style),
            Paragraph("<b>Core Concepts</b><br/>Data Structures & Algorithms, OOP, DBMS, Operating Systems, Machine Learning Basics, Data Science & EDA", body_style)
        ]
    ]
    skills_table = Table(skills_data, colWidths=[270, 270])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    elements.append(skills_table)
    elements.append(Spacer(1, 4))

    # 6. Projects (Part 1 on Page 1)
    add_section_header("PROJECTS")
    elements.append(Paragraph("<b>Real-Time Cybersecurity Anomaly Detection System</b>", subheading_style))
    elements.append(Paragraph("• Built a machine learning-based system to detect unusual network activities in real time", bullet_style))
    elements.append(Paragraph("• Performed data preprocessing, feature engineering, and anomaly detection modeling", bullet_style))
    elements.append(Paragraph("• Improved detection accuracy while reducing false positives", bullet_style))
    elements.append(Paragraph("• Applied data science techniques for identifying potential cyber threats", bullet_style))
    elements.append(Spacer(1, 4))

    elements.append(Paragraph("<b>Budget Buddy – Travel Budget Web App</b>, <i>React + Supabase</i>", subheading_style))
    elements.append(Paragraph("• Developed a responsive web application to manage travel expenses efficiently", bullet_style))
    elements.append(Paragraph("• Integrated Supabase for real-time database and backend services", bullet_style))
    elements.append(Paragraph("• Designed dynamic UI for smooth user interaction and expense tracking", bullet_style))
    elements.append(Paragraph("• Focused on performance optimization and clean UI/UX", bullet_style))
    
    # Page Break to Page 2
    elements.append(PageBreak())

    # Projects Continued on Page 2
    elements.append(Paragraph("<b>Tailoring Service Web Application</b>", subheading_style))
    elements.append(Paragraph("• Building a web platform for a tailoring business to manage customer orders", bullet_style))
    elements.append(Paragraph("• Planning features like order tracking, customer management, and service listing", bullet_style))
    elements.append(Paragraph("• Using Firebase for authentication and database management", bullet_style))
    elements.append(Paragraph("• Aiming to deliver a simple and user-friendly interface for real-world usability", bullet_style))
    elements.append(Spacer(1, 5))

    elements.append(Paragraph("<b>AI Document Classification System</b>", subheading_style))
    elements.append(Paragraph("<i>Tech Stack: Python, Flask, Google Gemini API, OCR, NLP, HTML, CSS, JavaScript</i>", body_style))
    elements.append(Paragraph("• Developed an AI-powered web application to classify documents using OCR and Google Gemini.", bullet_style))
    elements.append(Paragraph("• Implemented document upload, text extraction, and automated classification for PDF, DOCX, JPG, and PNG files.", bullet_style))
    elements.append(Spacer(1, 5))

    elements.append(Paragraph("<b>MediLu – AI-Powered Patient Healthcare Assistant</b>, <i>Tech: React, FastAPI, Supabase, AI/LLM, RAG</i>", subheading_style))
    elements.append(Paragraph("• Developed an AI healthcare assistant that simplifies medical reports and terminology for patients.", bullet_style))
    elements.append(Paragraph("• Integrated RAG, AI symptom checking, health tracking, medication/appointment reminders, and recovery planning.", bullet_style))
    elements.append(Paragraph("• Designed role-based portals with secure authentication, APIs, database, and notification services.", bullet_style))
    elements.append(Spacer(1, 6))

    # 7. Certifications (3 Columns)
    add_section_header("CERTIFICATIONS")
    certs_data = [
        [
            Paragraph("• ServiceNow Virtual Internship", body_style),
            Paragraph("• Artificial Intelligence Fundamentals — IBM SkillsBuild", body_style),
            Paragraph("• Building Trustworthy AI Enterprise Solutions — IBM SkillsBuild", body_style)
        ],
        [
            Paragraph("• Enterprise Design Thinking Practitioner — IBM", body_style),
            Paragraph("• Enterprise Design Thinking Co-Creator — IBM", body_style),
            Paragraph("• Machine Learning with Python — IBM SkillsBuild", body_style)
        ],
        [
            Paragraph("• Python 101 for Data Science — IBM SkillsBuild | 2025", body_style),
            Paragraph("• Diploma in Computer Applications (DCA) — CSC Computer Education", body_style),
            Paragraph("• Python programming - CSC Computer Education", body_style)
        ],
        [
            Paragraph("• Python for Placement Readiness — byteXL, SNS Institutions", body_style),
            Paragraph("• Basic Data Structures and Algorithms — byteXL, SNS Institutions", body_style),
            Paragraph("• Digital Marketing & Social Media Strategies — byteXL, SNS Institutions", body_style)
        ]
    ]
    certs_table = Table(certs_data, colWidths=[180, 180, 180])
    certs_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    elements.append(certs_table)
    elements.append(Spacer(1, 6))

    # 8. Achievements & Activities
    add_section_header("ACHIEVEMENTS & ACTIVITIES")
    elements.append(Paragraph("<b>Problem Solver, LeetCode</b>", subheading_style))
    elements.append(Paragraph("• Active problem solver on LeetCode with consistent practice", bullet_style))
    elements.append(Spacer(1, 3))
    elements.append(Paragraph("<b>Project Development</b>", subheading_style))
    elements.append(Paragraph("• Continuously building real-world projects to enhance development skills", bullet_style))
    elements.append(Spacer(1, 6))

    # 9. Strengths
    add_section_header("STRENGTHS")
    elements.append(Paragraph("• Strong analytical and problem-solving skills", bullet_style))
    elements.append(Paragraph("• Quick learner with adaptability to new technologies", bullet_style))
    elements.append(Paragraph("• Passion for building practical, user-focused applications", bullet_style))

    doc.build(elements)
    print(f"Successfully created resume PDF at: {output_path}")

if __name__ == "__main__":
    create_resume_pdf("public/Madhiyarasu_R_Resume.pdf")
