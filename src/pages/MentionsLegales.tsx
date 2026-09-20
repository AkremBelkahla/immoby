export default function MentionsLegales() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Legal notice</h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Legal information</h2>
          <p className="text-muted-foreground">
            Company name: Immoby SAS<br />
            Share capital: €50,000<br />
            Registered office: 123 Avenue des Champs-Élysées, 75008 Paris, France<br />
            RCS Paris: 123 456 789<br />
            SIRET: 123 456 789 00001<br />
            EU VAT number: FR 12 123456789
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Publication director</h2>
          <p className="text-muted-foreground">
            Publication director: Jean Dupont<br />
            Contact: contact@immoby.fr
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Hosting</h2>
          <p className="text-muted-foreground">
            This site is hosted by:<br />
            Host name: OVH SAS<br />
            Address: 2 rue Kellermann, 59100 Roubaix, France<br />
            Phone: +33 9 72 10 10 07
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual property</h2>
          <p className="text-muted-foreground">
            All content on this site (text, images, logos, videos) is protected by copyright. 
            Any reproduction, distribution or use without prior authorization is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Liability</h2>
          <p className="text-muted-foreground">
            Immoby strives to ensure the accuracy and updating of the information published on this site. 
            However, Immoby cannot guarantee the accuracy, precision or completeness of the information provided.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Hyperlinks</h2>
          <p className="text-muted-foreground">
            This site may contain links to other websites. Immoby has no control over these sites 
            and accepts no responsibility for their content.
          </p>
        </section>
      </div>
    </div>
  );
}
