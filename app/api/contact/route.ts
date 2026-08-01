import { NextResponse } from "next/server";

// vCard spec requires CRLF line endings.
const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Reid;Carlton;B;;",
  "FN:Carlton B Reid III — Meek Earth Studio",
  "ORG:Meek Earth Studio PBC",
  "TEL;TYPE=CELL,VOICE:571-572-7611",
  "EMAIL;TYPE=WORK:cbreid3@meekearthstudio.net",
  "URL:https://meekearthmusic.com",
  "NOTE:Music for the meek.",
  "END:VCARD",
].join("\r\n");

/**
 * Serves the studio contact card. Phones open .vcf downloads in the
 * contacts app with everything prefilled, ready to save.
 */
export async function GET() {
  return new NextResponse(VCARD, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="meek-earth-studio.vcf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
