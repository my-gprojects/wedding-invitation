/** Guest helpers — URL ?t=Nama+Tamu + QR payload (same shape as wedding-invitation) */
window.GuestUtils = {
  getGuestNameFromUrl() {
    const raw = new URLSearchParams(window.location.search).get("t");
    if (!raw?.trim()) return null;
    return this.formatName(decodeURIComponent(raw.trim()));
  },

  formatName(raw) {
    return raw
      .replace(/\+/g, " ")
      .replace(/[-_]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  },

  makeUniqueKey(name) {
    const slug =
      name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "tamu";

    let hash = 2166136261;
    for (let i = 0; i < name.length; i++) {
      hash ^= name.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `INV-${slug}-${(hash >>> 0).toString(36)}`;
  },

  encodePayload(uniqueKey, nama) {
    return JSON.stringify({ k: uniqueKey, n: nama });
  },

  decodePayload(text) {
    const raw = String(text || "").trim();
    if (!raw) return null;
    try {
      const data = JSON.parse(raw);
      if (data?.k && data?.n) {
        return { unique_key: String(data.k), nama: String(data.n) };
      }
    } catch (_) {}
    if (raw.includes("|")) {
      const [k, ...rest] = raw.split("|");
      return { unique_key: k.trim(), nama: rest.join("|").trim() || k.trim() };
    }
    if (raw.startsWith("INV-")) {
      return {
        unique_key: raw,
        nama: raw
          .replace(/^INV-/, "")
          .replace(/-[a-z0-9]+$/i, "")
          .replace(/-/g, " "),
      };
    }
    return null;
  },
};
