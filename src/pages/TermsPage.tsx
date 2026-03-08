import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="font-display text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>By accessing and using CodeForge, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">2. Account Registration</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>You must provide accurate information when creating an account.</li>
                <li>You are responsible for maintaining the security of your account credentials.</li>
                <li>You must be at least 13 years old to use CodeForge.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">3. Subscriptions & Payments</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Pro subscriptions are billed monthly at the listed price (₦9,500/month).</li>
                <li>Payments are processed securely through Paystack.</li>
                <li>Subscriptions provide access to all Pro courses, lessons, and certificates.</li>
                <li>You may cancel your subscription at any time; access continues until the end of your billing period.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">4. Refund Policy</h2>
              <p>Refund requests may be considered on a case-by-case basis within 7 days of purchase. Contact our support team to request a refund.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">5. Content & Intellectual Property</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>All course content, videos, and materials are owned by CodeForge.</li>
                <li>You may not copy, redistribute, or resell any course content.</li>
                <li>Certificates are for personal use and represent completion of coursework.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">6. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Share your account with others</li>
                <li>Attempt to bypass payment or access restrictions</li>
                <li>Use the platform for any illegal purpose</li>
                <li>Interfere with the platform's operation</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">7. Termination</h2>
              <p>We reserve the right to suspend or terminate accounts that violate these terms, without prior notice.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">8. Limitation of Liability</h2>
              <p>CodeForge is provided "as is." We are not liable for any damages arising from your use of the platform, including but not limited to loss of data or interruption of service.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">9. Contact</h2>
              <p>For questions about these terms, contact us at <strong className="text-foreground">support@codeforge.com</strong>.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
