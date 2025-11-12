export default function PolitiqueConfidentialite() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Collecte des données</h2>
          <p className="text-muted-foreground">
            Immoby collecte des données personnelles dans le cadre de l'utilisation de ses services. 
            Ces données incluent notamment : nom, prénom, email, numéro de téléphone, et informations relatives
            à vos biens immobiliers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Utilisation des données</h2>
          <p className="text-muted-foreground">
            Les données collectées sont utilisées pour :
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Fournir et améliorer nos services</li>
            <li>Gérer votre compte utilisateur</li>
            <li>Vous envoyer des communications relatives à nos services</li>
            <li>Assurer la sécurité de la plateforme</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Partage des données</h2>
          <p className="text-muted-foreground">
            Vos données personnelles ne sont pas vendues à des tiers. Elles peuvent être partagées uniquement avec :
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Nos prestataires techniques (hébergement, support)</li>
            <li>Les autorités compétentes en cas d'obligation légale</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Sécurité des données</h2>
          <p className="text-muted-foreground">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour 
            protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Vos droits</h2>
          <p className="text-muted-foreground">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification de vos données</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Pour exercer ces droits, contactez-nous à : contact@immoby.fr
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p className="text-muted-foreground">
            Notre site utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez configurer 
            votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient être limitées.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
          <p className="text-muted-foreground">
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
            Les modifications entrent en vigueur dès leur publication sur cette page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p className="text-muted-foreground">
            Pour toute question concernant cette politique de confidentialité, contactez-nous :<br />
            Email : contact@immoby.fr<br />
            Adresse : 123 Avenue des Champs-Élysées, 75008 Paris, France
          </p>
        </section>
      </div>
    </div>
  );
}
