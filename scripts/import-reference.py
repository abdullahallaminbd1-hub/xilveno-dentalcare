#!/usr/bin/env python3
"""Import only published BrightSmile demo content from its local SQLite reference."""

import argparse
import json
import re
import sqlite3
from pathlib import Path


DEFAULT_DATABASE = Path(
    r"F:\Desktop\Portfolio website\demo-sites\dentalcare\wordpress\wp-content\database\dentalcare.sqlite"
)
DEFAULT_OUTPUT = Path(__file__).resolve().parents[1] / "src" / "content" / "reference.json"
ALLOWED_PAGES = {"about", "patient-info"}
DEFAULT_SETTINGS = {
    "name": "BrightSmile Dental",
    "tagline": "Family & general dentistry",
    "phone": "(03) 9123 4567",
    "email": "hello@brightsmile.example",
    "address": "18 Harbourview Parade, Brookfield VIC 3050",
    "hours": [
        ["Monday - Thursday", "8:00am - 6:00pm"],
        ["Friday", "8:00am - 5:00pm"],
        ["Saturday", "9:00am - 1:00pm"],
        ["Sunday", "Closed"],
        ["Public holidays", "Closed"],
    ],
    "heroTitle": "Dentistry that feels calm, clear and genuinely unhurried.",
    "heroText": "A small Brookfield practice built around longer appointments and plain-language explanations - so you always know what is happening and why.",
}


def theme_mods(raw):
    values = {}
    if not raw:
        return values
    for key in ("bs_tagline", "bs_phone", "bs_email", "bs_address", "bs_hours", "bs_hero_title", "bs_hero_text"):
        found = re.search(
            rf's:\d+:"{re.escape(key)}";s:\d+:"(.*?)";',
            raw,
            re.DOTALL,
        )
        if found:
            values[key] = found.group(1)
    return values


def lines(value):
    return [line.strip() for line in value.splitlines() if line.strip()]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--database", type=Path, default=DEFAULT_DATABASE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    if not args.database.is_file():
        raise SystemExit(f"Reference SQLite database not found: {args.database}")

    connection = sqlite3.connect(f"file:{args.database.as_posix()}?mode=ro", uri=True)
    connection.row_factory = sqlite3.Row
    settings_row = connection.execute(
        "SELECT option_value FROM wp_options WHERE option_name = 'theme_mods_brightsmile'"
    ).fetchone()
    mods = theme_mods(settings_row["option_value"] if settings_row else "")
    settings = {
        "name": DEFAULT_SETTINGS["name"],
        "tagline": mods.get("bs_tagline", DEFAULT_SETTINGS["tagline"]),
        "phone": mods.get("bs_phone", DEFAULT_SETTINGS["phone"]),
        "email": mods.get("bs_email", DEFAULT_SETTINGS["email"]),
        "address": mods.get("bs_address", DEFAULT_SETTINGS["address"]),
        "hours": DEFAULT_SETTINGS["hours"],
        "heroTitle": mods.get("bs_hero_title", DEFAULT_SETTINGS["heroTitle"]),
        "heroText": mods.get("bs_hero_text", DEFAULT_SETTINGS["heroText"]),
    }
    raw_hours = mods.get("bs_hours")
    if raw_hours:
        settings["hours"] = [
            [day.strip(), hours.strip()]
            for line in raw_hours.splitlines()
            if "|" in line
            for day, hours in [line.split("|", 1)]
        ]

    pages = {}
    for row in connection.execute(
        "SELECT post_name, post_content FROM wp_posts "
        "WHERE post_type = 'page' AND post_status = 'publish'"
    ):
        if row["post_name"] in ALLOWED_PAGES:
            content = re.sub(r"<!--.*?-->", "", row["post_content"] or "", flags=re.DOTALL).strip()
            pages[row["post_name"]] = content

    items = []
    query = connection.execute(
        "SELECT ID, post_name, post_title, post_excerpt, post_content, menu_order "
        "FROM wp_posts WHERE post_type = 'bs_service' AND post_status = 'publish' "
        "ORDER BY menu_order ASC, post_title COLLATE NOCASE ASC"
    )
    for post in query:
        meta = {
            entry["meta_key"].removeprefix("_bs_"): entry["meta_value"]
            for entry in connection.execute(
                "SELECT meta_key, meta_value FROM wp_postmeta "
                "WHERE post_id = ? AND meta_key LIKE '_bs_%'",
                (post["ID"],),
            )
        }
        roles = [
            entry["name"]
            for entry in connection.execute(
                "SELECT t.name FROM wp_terms t "
                "JOIN wp_term_taxonomy tt ON tt.term_id = t.term_id "
                "JOIN wp_term_relationships tr ON tr.term_taxonomy_id = tt.term_taxonomy_id "
                "WHERE tr.object_id = ? AND tt.taxonomy = 'bs_team_role'",
                (post["ID"],),
            )
        ]
        items.append(
            {
                "slug": post["post_name"],
                "title": post["post_title"],
                "excerpt": post["post_excerpt"],
                "content": re.sub(r"<!--.*?-->", "", post["post_content"] or "", flags=re.DOTALL).strip(),
                "role": meta.get("short", ""),
                "qualifications": meta.get("qualifications", ""),
                "interests": lines(meta.get("interests", "")),
                "icon": meta.get("icon", ""),
                "benefits": lines(meta.get("benefits", "")),
                "expect": lines(meta.get("expect", "")),
                "suitable": lines(meta.get("suitable", "")),
                "duration": meta.get("duration", ""),
                "feeNote": meta.get("fee_note", ""),
                "team": bool(roles),
            }
        )

    output = {"settings": settings, "pages": pages, "items": items}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    connection.close()
    print(f"Imported {len(pages)} public content pages and {len(items)} service/team records.")
    print("Excluded generic Sample Page, WordPress-generated privacy text, users, comments, and private requests.")


if __name__ == "__main__":
    main()
