export const GS_APP_URL = "https://good-samaritan-504806.web.app/";
export const GS_SUPPORT_EMAIL = "cbreid3@meekearthstudio.net";
export const GS_PRIVACY_URL = "https://good-samaritan-504806.web.app/privacy";
export const GS_TERMS_URL = "https://good-samaritan-504806.web.app/terms";

export const GS_MAILTO = `mailto:${GS_SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Good Samaritan support"
)}&body=${encodeURIComponent(
  [
    "Account email:",
    "Device (iPhone / Android / web app):",
    "What I was trying to do:",
    "What happened (include any error text):",
    "",
  ].join("\n")
)}`;
