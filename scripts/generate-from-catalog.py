#!/usr/bin/env python3
"""Pilot generator: print catalog entries in the dual-update format.

Usage:
  python3 scripts/generate-from-catalog.py
  python3 scripts/generate-from-catalog.py --section "Deliverability & Testing Tools"
"""
import argparse
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("pip install pyyaml", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "data" / "catalog.yml"

SECTION_TO_DOCS = {
    "Newsletter Platforms": "website/docs/tools/newsletter-platforms.md",
    "Self-Hosted ESPs": "website/docs/tools/self-hosted-esp.md",
    "Email Builders & Templates": "website/docs/tools/email-builders.md",
    "Deliverability & Testing Tools": "website/docs/tools/deliverability-tools.md",
    "Growth & Automation Tools": "website/docs/tools/growth-automation-tools.md",
    "Email Service Providers": "website/docs/tools/email-service-providers.md",
    "Email Marketing For eCommerce": "website/docs/tools/ecommerce.md",
    "Automation Email Marketing platform": "website/docs/tools/automation-platforms.md",
    "Tools for effective work with emails": "website/docs/tools/email-work-tools.md",
    "HTML Email Templates": "website/docs/development/html-email-templates.md",
    "Open source tools": "website/docs/tools/open-source-tools.md",
}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--section", help="Filter by section")
    args = ap.parse_args()

    data = yaml.safe_load(CATALOG.read_text()) or {}
    entries = data.get("entries") or []
    if args.section:
        entries = [e for e in entries if e.get("section") == args.section]

    for e in entries:
        name = e["name"]
        url = e["url"]
        desc = e.get("description", "").rstrip(".")
        disc = e.get("disclosure")
        line = f"- [{name}]({url}) — {desc}."
        if disc:
            line += f" ({disc})"
        section = e.get("section", "?")
        docs = SECTION_TO_DOCS.get(section, "(unknown — check AGENTS.md map)")
        print(f"# {section} → {docs}")
        print(line)
        print()

if __name__ == "__main__":
    main()
