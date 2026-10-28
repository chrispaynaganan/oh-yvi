#!/bin/bash
set -e
B="https://www.figma.com/api/mcp/asset"
mkdir -p public/icons public/images/{hero,featured,categories,products,occasions,about}
dl() { curl -f -L -s -o "$2" "$B/$1" && echo "✓ $2"; }

# Hero
dl 8145ac84-bd90-4a85-9de7-6142fd85205b.png public/images/hero/hero.png
dl 61b99d4c-c449-4eff-9035-0d907d8943b1.png public/images/hero/avatar-1.png
dl 76b2a554-d868-4d6f-858d-85e5b388f14f.png public/images/hero/avatar-2.png
dl 2c18b976-49c1-4df2-b21a-abcdeb77ca4e.png public/images/hero/avatar-3.png
# Featured
dl 979142c8-c7cb-4b36-9a11-7a2810a2d949.png public/images/featured/vo-good-work-journal.png
# Categories
dl abc88c3c-385e-450e-baa6-7d84cde05eda.png public/images/categories/notepads.png
dl 91f23dc5-0b8a-4147-92f9-62cca5da58e9.png public/images/categories/journals.png
dl c99c08ec-f5e4-475e-a753-d7cb1bdd2ec0.png public/images/categories/planners.png
dl f5491b28-e663-40c0-86be-c727931ebe2b.png public/images/categories/calendars.png
dl 4c6fa150-5c70-49f1-8f31-76ebde96d5f2.png public/images/categories/washi-tapes.png
dl 145fa342-d57b-423b-b677-725e2bf9ac3c.png public/images/categories/business-cards.png
dl e886c74b-2e90-4d78-9312-9dcd0cf2fecc.png public/images/categories/bookmarks.png
dl 76410d7c-07dd-4363-a7f4-e904bbe6f532.png public/images/categories/wallpapers.png
# Products
dl 0c826a33-de35-42f1-a1bc-bcd0d20473ed.png public/images/products/vo-project-tracker-notepad.png
dl 07aa8ef9-8d7e-4be3-80c8-efbc7ca79fef.png public/images/products/daily-rhythm-planner.png
dl 853a76b2-70f3-4474-91d3-40cdd012b870.png public/images/products/habit-notes-mini-pad.png
dl 818a40d0-446b-456f-b360-b60c32601097.png public/images/products/mini-calling-card-set.png
# Occasions
dl f086d88d-6561-403b-b8d0-8907435936df.png public/images/occasions/voice-artists.png
dl 7a597fe0-4698-44fe-aacb-253d8a8ed53e.png public/images/occasions/designers.png
dl e1e88276-e56e-4e79-b5be-00919fe4fd1b.png public/images/occasions/dads.png
dl c87ff983-f499-4510-b28f-2466d6ad81de.png public/images/occasions/moms.png
dl 491b5173-3a72-4c68-96d2-12bd73037e1d.png public/images/occasions/partners.png
# About
dl 911002dd-4042-41a5-a6af-2e2803626167.png public/images/about/about.png

# Icons
dl e0366869-4341-421e-a141-cef3e5e3a4c3.svg public/icons/menu.svg
dl f6723bb3-eb66-40b2-9745-f3296537a989.svg public/icons/user.svg
dl 7c941339-aef4-4743-8174-26932aafed94.svg public/icons/heart.svg
dl d82f03dd-e598-4894-8fef-65f77ac937a9.svg public/icons/cart.svg
dl f06e8536-107b-4e95-beee-ef0a6e3eefd3.svg public/icons/search.svg
dl 79d97b9f-f677-492b-a42e-562f4960d52a.svg public/icons/divider.svg
dl 917b8085-a410-4e46-a3c8-63cd2be0e470.svg public/icons/arrow-right-small.svg
dl f6b03f1c-7bac-4ec6-afbf-26e0cfd19e82.svg public/icons/arrow-right.svg
dl 2b0dc0ec-a302-4afe-9ea3-3c8a8d06a681.svg public/icons/arrow-up-right-light.svg
dl 53cf096d-eb8f-422d-93fe-e2ef06893098.svg public/icons/arrow-up-right-dark.svg
dl 13765c9a-3973-446c-9753-dabefd66b58a.svg public/icons/arrow-up-right-small.svg
dl afee7feb-5eaf-400b-9757-081d5169dd45.svg public/icons/card-bag.svg
dl cc775d2d-1c8e-455a-b441-f4ff9b358968.svg public/icons/card-heart.svg
dl 47076177-7449-4c7d-b939-4078feef3d2c.svg public/icons/card-share.svg

echo "Done."