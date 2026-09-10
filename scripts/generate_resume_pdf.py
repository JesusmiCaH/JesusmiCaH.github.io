#!/usr/bin/env python3
"""Generate Chenghao Jiang's one-page resume PDF.

The content lives in this file so benchmark results and role-specific wording can
be updated without reconstructing a browser-exported PDF by hand.
"""

from __future__ import annotations

import argparse
import html
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


PAGE_WIDTH, PAGE_HEIGHT = LETTER
LEFT = 42
RIGHT = PAGE_WIDTH - 42
CONTENT_WIDTH = RIGHT - LEFT

INK = HexColor("#17201c")
BODY = HexColor("#414944")
MUTED = HexColor("#606963")
SUBTLE = HexColor("#7b837d")
ACCENT = HexColor("#dfff43")
PAPER = HexColor("#fffef9")


def register_fonts() -> None:
    font_dir = Path("/System/Library/Fonts/Supplemental")
    fonts = {
        "ArialCustom": font_dir / "Arial.ttf",
        "ArialCustom-Bold": font_dir / "Arial Bold.ttf",
        "GeorgiaCustom": font_dir / "Georgia.ttf",
        "GeorgiaCustom-Bold": font_dir / "Georgia Bold.ttf",
        "GeorgiaCustom-Italic": font_dir / "Georgia Italic.ttf",
    }
    for name, path in fonts.items():
        pdfmetrics.registerFont(TTFont(name, str(path)))


BODY_STYLE = ParagraphStyle(
    "body",
    fontName="ArialCustom",
    fontSize=8.0,
    leading=10.1,
    textColor=BODY,
    spaceAfter=0,
    splitLongWords=False,
)


def draw_paragraph(c: canvas.Canvas, text: str, x: float, top: float, width: float, style: ParagraphStyle = BODY_STYLE) -> float:
    paragraph = Paragraph(html.escape(text), style)
    _, height = paragraph.wrap(width, PAGE_HEIGHT)
    paragraph.drawOn(c, x, top - height)
    return top - height


def draw_bullet(c: canvas.Canvas, text: str, top: float, gap_after: float = 1.3) -> float:
    c.setFillColor(INK)
    c.circle(LEFT + 5.2, top - 4.4, 1.15, fill=1, stroke=0)
    bottom = draw_paragraph(c, text, LEFT + 14, top, CONTENT_WIDTH - 14)
    return bottom - gap_after


def draw_section(c: canvas.Canvas, title: str, top: float) -> float:
    top -= 3
    c.setFillColor(ACCENT)
    c.rect(LEFT, top - 10.5, 4, 11.5, fill=1, stroke=0)
    c.setFillColor(HexColor("#435700"))
    c.setFont("ArialCustom-Bold", 10.1)
    c.drawString(LEFT + 8, top - 8.4, title.upper())
    return top - 18


def draw_heading_row(c: canvas.Canvas, left: str, right: str, top: float, left_size: float = 9.25) -> float:
    c.setFillColor(INK)
    c.setFont("ArialCustom-Bold", left_size)
    c.drawString(LEFT, top - left_size, left)
    c.setFillColor(SUBTLE)
    c.setFont("GeorgiaCustom-Italic", 7.5)
    c.drawRightString(RIGHT, top - left_size + 0.7, right)
    return top - left_size - 2


def draw_subheading_row(c: canvas.Canvas, left: str, right: str, top: float) -> float:
    c.setFillColor(MUTED)
    c.setFont("GeorgiaCustom-Italic", 8.1)
    c.drawString(LEFT, top - 8.1, left)
    c.setFont("GeorgiaCustom", 7.8)
    c.drawRightString(RIGHT, top - 8.1, right)
    return top - 11.5


def draw_education(c: canvas.Canvas, top: float, school: str, dates: str, degree: str, location: str, detail: str) -> float:
    top = draw_heading_row(c, school, dates, top)
    top = draw_subheading_row(c, degree, location, top)
    top = draw_bullet(c, detail, top, gap_after=3.0)
    return top


def draw_contact_line(c: canvas.Canvas, y: float) -> None:
    entries = [
        ("Los Angeles, CA", None),
        ("tommyjiangch@gmail.com", "mailto:tommyjiangch@gmail.com"),
        ("(608) 867-9882", "tel:+16088679882"),
        ("Chenghao-Jiang", "https://linkedin.com/in/Chenghao-Jiang"),
        ("JesusmiCaH", "https://github.com/JesusmiCaH"),
        ("jesusmicah.github.io", "https://jesusmicah.github.io"),
    ]
    c.setFont("ArialCustom", 7.15)
    x = LEFT
    for index, (label, url) in enumerate(entries):
        if index:
            c.setFillColor(ACCENT)
            c.drawString(x, y, "|")
            x += 8
        c.setFillColor(HexColor("#d8ddd9"))
        c.drawString(x, y, label)
        width = pdfmetrics.stringWidth(label, "ArialCustom", 7.15)
        if url:
            c.linkURL(url, (x, y - 1, x + width, y + 8), relative=0)
        x += width + 8


def build_resume(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(output_path), pagesize=LETTER, pageCompression=1)
    c.setTitle("Resume - Chenghao Jiang")
    c.setAuthor("Chenghao Jiang")

    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(INK)
    c.rect(0, PAGE_HEIGHT - 92, PAGE_WIDTH, 92, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.rect(0, PAGE_HEIGHT - 94.5, PAGE_WIDTH, 2.5, fill=1, stroke=0)

    c.setFillColor(HexColor("#ffffff"))
    c.setFont("GeorgiaCustom-Bold", 24.8)
    c.drawString(LEFT, PAGE_HEIGHT - 39, "Chenghao (Tommy) Jiang")
    c.setFillColor(HexColor("#d8ddd9"))
    c.setFont("ArialCustom", 9.1)
    c.drawString(LEFT, PAGE_HEIGHT - 57, "3D Computer Vision · SLAM · Generative Models")
    draw_contact_line(c, PAGE_HEIGHT - 76)

    y = PAGE_HEIGHT - 108

    y = draw_section(c, "Education", y)
    y = draw_education(c, y, "University of Wisconsin-Madison", "Sep 2024 - Dec 2025", "MS in Electrical and Computer Engineering", "Madison, WI", "GPA: 3.82/4.0")
    y = draw_education(c, y, "University of Manchester", "Sep 2022 - Dec 2023", "MS in Communication and Signal Processing", "Manchester, UK", "GPA: 83.5/100 · Distinction Honor")
    y = draw_education(c, y, "Changchun University of Science and Technology", "Sep 2018 - Jun 2022", "BEng in Optoelectronic Information Science and Engineering", "Changchun, China", "GPA: 3.86/5.00 · Rank: 10/221")

    y = draw_section(c, "Experience", y + 1)
    y = draw_heading_row(c, "Tera AI", "Remote", y)
    y = draw_subheading_row(c, "3D Vision Researcher", "Feb 2026 - Present", y)
    y = draw_bullet(c, "Built a geometry-guided data pipeline to derive high-confidence geometric pseudo-labels for dense image correspondence from internally collected flight video and prior scene geometry.", y)
    y = draw_bullet(c, "Fine-tuned UFM on internal evaluation pairs, reducing average endpoint error by 67.5% for camera-to-map matching (12.40 to 4.03 px) and 31.7% for frame tracking (5.33 to 3.64 px).", y)
    y = draw_bullet(c, "Developed flight-replay diagnostics linking correspondence failures to downstream pose processing and geographic priors; the UFM frontend raised matching throughput 5x (4 to 20 FPS) versus RoMa and helped reduce GPS-referenced trajectory RMSE from >10 m to approx. 3 m.", y)
    y = draw_bullet(c, "Implemented and benchmarked 3D reconstruction pipelines spanning classical SfM, feed-forward 3D models, and Gaussian Splatting; evaluated Sim(3)-aligned point clouds by point-to-mesh distance and novel-view quality by held-out photometric error.", y, gap_after=1.5)
    y = draw_subheading_row(c, "Research Intern - Part-time", "Aug 2025 - Feb 2026", y)
    y = draw_bullet(c, "Prototyped windowed deployment of STream3R for long-horizon flight video; identified memory growth and clip-level latency as blockers for real-time, edge-constrained localization, motivating an online correspondence-based frontend.", y, gap_after=2.2)

    y = draw_heading_row(c, "Johns Hopkins University", "Sep 2025 - Feb 2026", y)
    y = draw_subheading_row(c, "Research Assistant · Advisor: Prof. Anand Bhattad", "Remote", y)
    y = draw_bullet(c, "Developed a ViT-based latent encoder that disentangles illumination from scene content; on the MIT Multi-Illumination test set, reduced color-corrected relighting RMSE by 7.2% (0.222 to 0.206) and improved SSIM from 0.571 to 0.600 over the published latent-intrinsics baseline.", y)
    y = draw_bullet(c, "Designed a DiT-based generative pipeline using illumination as a prompt and reference scene content as control for high-quality, controllable image relighting.", y, gap_after=2.2)

    y = draw_heading_row(c, "The Hong Kong University of Science and Technology (Guangzhou)", "Nov 2023 - Jun 2024", y, left_size=8.55)
    y = draw_subheading_row(c, "Research Assistant · Advisor: Prof. Haoang Li", "Remote", y)
    y = draw_bullet(c, "Developed an animatable human Gaussian Splatting pipeline using a canonical avatar representation and SMPL-driven deformation across per-frame body poses.", y)
    y = draw_bullet(c, "Co-designed and implemented a correspondence-guided feature-consistency loss using RoMA matches and DINO features across viewpoints and body poses, complementing photometric supervision to enforce part-level appearance consistency under articulated motion.", y, gap_after=1.5)

    y = draw_section(c, "Selected Projects", y)
    y = draw_heading_row(c, "Privacy-Aware Sensor Data for Cooperative Perception", "Jun 2025 - Jul 2025", y)
    y = draw_subheading_row(c, "Supervised by Prof. Akarsh Prabhakara", "Madison, WI", y)
    y = draw_bullet(c, "Explored cooperative SLAM under privacy constraints using SHARP, transmitting pointmap-based novel-view renderings instead of raw images.", y)
    y = draw_bullet(c, "Evaluated VGGT on the OPV2V dataset across ego-only, SHARP-generated, and raw multi-agent inputs.", y)
    y = draw_bullet(c, "Extended the CARLA simulation in OPV2V with depth sensing for point-cloud rescaling and downstream 3D recovery.", y, gap_after=1.5)

    y = draw_section(c, "Publications", y)
    y = draw_heading_row(c, "Privacy-Aware Sharing of Raw Spatial Sensor Data for Cooperative Perception", "HotMobile 2026", y, left_size=8.45)
    y = draw_subheading_row(c, "Bangya Liu, Chenghao Jiang, Chengpo Yan, Suman Banerjee, Akarsh Prabhakara", "Under review", y)

    y = draw_section(c, "Skills", y + 1)
    c.setFillColor(INK)
    c.setFont("ArialCustom-Bold", 8.25)
    c.drawString(LEFT, y - 7.5, "Programming")
    c.setFillColor(MUTED)
    c.setFont("GeorgiaCustom-Italic", 7.6)
    c.drawString(LEFT + 90, y - 7.5, "Python · CUDA · PyTorch · LaTeX")
    y -= 14
    c.setFillColor(INK)
    c.setFont("ArialCustom-Bold", 8.25)
    c.drawString(LEFT, y - 7.5, "Research")
    c.setFillColor(MUTED)
    c.setFont("GeorgiaCustom-Italic", 7.6)
    c.drawString(LEFT + 90, y - 7.5, "3D reconstruction · SLAM · Gaussian Splatting · Diffusion Models · VLMs")
    y -= 11

    if y < 23:
        raise RuntimeError(f"Resume content overflowed the footer safety margin: y={y:.1f}")

    c.setFillColor(HexColor("#979e99"))
    c.setFont("GeorgiaCustom-Italic", 6.5)
    c.drawRightString(RIGHT, 13, "Last updated · Sep 2026")
    c.showPage()
    c.save()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=Path("output/pdf/resume-chenghao-jiang.pdf"))
    args = parser.parse_args()
    register_fonts()
    build_resume(args.output)


if __name__ == "__main__":
    main()
