"use client";

import { useEffect, useState } from "react";

type AdAccount = {
  id: string;
  platform: string;
  accountId: string;
  accountName: string | null;
};

export default function ConnectionsPage() {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/connections")
      .then((r) => r.json())
      .then((data) => setAccounts(data.accounts ?? []))
      .finally(() => setLoading(false));
  }, []);

  const metaConnected = accounts.some((a) => a.platform === "meta");
  const googleConnected = accounts.some((a) => a.platform === "google");

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Connections</h1>

      {/* META */}
      <div style={{ marginTop: 20 }}>
        <h2>Meta Ads</h2>
        <p>
          Status:{" "}
          {loading
            ? "Checking..."
            : metaConnected
            ? "Connected ✅"
            : "Not connected ❌"}
        </p>

        {!loading && !metaConnected && (
          <a href="/api/auth/meta" style={{ display: "inline-block", marginTop: 8 }}>
            <button style={{ padding: "8px 12px", cursor: "pointer" }}>
              Connect Meta Ads
            </button>
          </a>
        )}

        {!loading && metaConnected && (
          <div style={{ marginTop: 8 }}>
            <strong>Connected Meta accounts:</strong>
            <ul style={{ marginTop: 6 }}>
              {accounts
                .filter((a) => a.platform === "meta")
                .map((a) => (
                  <li key={a.id}>{a.accountName ?? a.accountId}</li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* GOOGLE */}
      <div style={{ marginTop: 20 }}>
        <h2>Google Ads</h2>
        <p>
          Status:{" "}
          {loading
            ? "Checking..."
            : googleConnected
            ? "Connected ✅"
            : "Not connected ❌"}
        </p>

        {!loading && !googleConnected && (
          <a
            href="/api/auth/google"
            style={{ display: "inline-block", marginTop: 8 }}
          >
            <button style={{ padding: "8px 12px", cursor: "pointer" }}>
              Connect Google Ads
            </button>
          </a>
        )}

        {!loading && googleConnected && (
          <div style={{ marginTop: 8 }}>
            <strong>Connected Google accounts:</strong>
            <ul style={{ marginTop: 6 }}>
              {accounts
                .filter((a) => a.platform === "google")
                .map((a) => (
                  <li key={a.id}>{a.accountName ?? a.accountId}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
