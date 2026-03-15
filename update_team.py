#!/usr/bin/env python3
# -*- coding: utf-8 -*-

with open('edupass-ai.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace team members
old_team = """1. Phạm Như Anh - Content & Learning Material Support
2. Lê Hoàng Gia Huy - Idea Development & Operation Support
3. Hồ Nguyễn Trúc Ngân - Design & Learning Experience Support
4. Nguyễn Minh Tiến - Learning Resource & Exam Bank Development
5. Nguyễn Gia Hòa - Content & Project Support
6. Lê Nhất Duy - Project & Community Support"""

new_team = """1. Phạm Như Anh - Co-Founder
2. Lê Hoàng Gia Huy - Co-Founder
3. Lê Hoàng Khang - Co-Founder
4. Nguyễn Gia Hòa - Co-Founder
5. Nguyễn Minh Tiến - Co-Founder
6. Lê Nhất Duy - Co-Founder
7. Hồ Nguyễn Trúc Ngân - Co-Founder"""

content = content.replace(old_team, new_team)

with open('edupass-ai.js', 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("Team updated successfully!")
