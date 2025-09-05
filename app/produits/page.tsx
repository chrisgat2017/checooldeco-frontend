const base = process.env.NEXT_PUBLIC_STRAPI_URL!;
const token = process.env.STRAPI_API_TOKEN!;

export default async function ProduitsPage() {
  const res = await fetch(`${base}/api/produits?populate=*`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  }).catch((e) => null);

  if (!res || !res.ok) {
    return (
      <main style={{padding:40}}>
        <h1>Impossible de charger les produits</h1>
        <p>Vérifie le token et l’URL Strapi dans Vercel.</p>
      </main>
    );
  }

  const data = await res.json();

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1>Nos produits</h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 16 }}>
        {data.data.map((p: any) => {
          const a = p.attributes;
          const img = a.image?.data?.attributes?.url
            ? (a.image.data.attributes.url.startsWith("http")
                ? a.image.data.attributes.url
                : `${base}${a.image.data.attributes.url}`)
            : null;
          return (
            <li key={p.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
              {img && <img src={img} alt={a.nom} style={{ width: "100%", height: "auto", borderRadius: 6 }} />}
              <h2 style={{ marginTop: 12 }}>{a.nom}</h2>
              <p>{a.description}</p>
              <p><b>{a.prix} CHF</b></p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
