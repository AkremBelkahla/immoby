export default function PolitiqueConfidentialite() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy policy</h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Data collection</h2>
          <p className="text-muted-foreground">
            Immoby collects personal data as part of the use of its services. 
            This data includes, in particular: last name, first name, email, phone number, and information
            relating to your real estate properties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Use of data</h2>
          <p className="text-muted-foreground">
            The collected data is used to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Provide and improve our services</li>
            <li>Manage your user account</li>
            <li>Send you communications relating to our services</li>
            <li>Ensure the security of the platform</li>
            <li>Comply with our legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Data sharing</h2>
          <p className="text-muted-foreground">
            Your personal data is not sold to third parties. It may only be shared with:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Our technical service providers (hosting, support)</li>
            <li>Competent authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational security measures to 
            protect your data against unauthorized access, modification, disclosure or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your rights</h2>
          <p className="text-muted-foreground">
            In accordance with the GDPR, you have the following rights:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Right of access to your personal data</li>
            <li>Right to rectify your data</li>
            <li>Right to erasure of your data</li>
            <li>Right to restriction of processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            To exercise these rights, contact us at: contact@immoby.fr
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p className="text-muted-foreground">
            Our site uses cookies to improve your user experience. You can configure 
            your browser to refuse cookies, but some features of the site may be limited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Changes</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify this privacy policy at any time. 
            Changes take effect as soon as they are published on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p className="text-muted-foreground">
            For any questions about this privacy policy, contact us:<br />
            Email: contact@immoby.fr<br />
            Address: 123 Avenue des Champs-Élysées, 75008 Paris, France
          </p>
        </section>
      </div>
    </div>
  );
}
