export default function MentionsLegales() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Mentions légales</h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Informations légales</h2>
          <p className="text-muted-foreground">
            Raison sociale : Immoby SAS<br />
            Capital social : 50 000 €<br />
            Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France<br />
            RCS Paris : 123 456 789<br />
            SIRET : 123 456 789 00001<br />
            TVA intracommunautaire : FR 12 123456789
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Directeur de publication</h2>
          <p className="text-muted-foreground">
            Directeur de publication : Jean Dupont<br />
            Contact : contact@immoby.fr
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Hébergement</h2>
          <p className="text-muted-foreground">
            Le site est hébergé par :<br />
            Nom de l'hébergeur : OVH SAS<br />
            Adresse : 2 rue Kellermann, 59100 Roubaix, France<br />
            Téléphone : +33 9 72 10 10 07
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
          <p className="text-muted-foreground">
            L'ensemble du contenu de ce site (textes, images, logos, vidéos) est protégé par le droit d'auteur. 
            Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Responsabilité</h2>
          <p className="text-muted-foreground">
            Immoby s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. 
            Toutefois, Immoby ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Liens hypertextes</h2>
          <p className="text-muted-foreground">
            Ce site peut contenir des liens vers d'autres sites. Immoby n'exerce aucun contrôle sur ces sites 
            et décline toute responsabilité quant à leur contenu.
          </p>
        </section>
      </div>
    </div>
  );
}
