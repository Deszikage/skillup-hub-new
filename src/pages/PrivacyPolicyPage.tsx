import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="font-display text-lg font-bold text-foreground">1. Information We Collect</h2>
              <p>When you use CodeForge, we may collect the following information:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong className="text-foreground">Account Information:</strong> Name, email address, and profile picture when you sign up via Google or email.</li>
                <li><strong className="text-foreground">Payment Information:</strong> Payment details processed securely through Paystack. We do not store your card details.</li>
                <li><strong className="text-foreground">Usage Data:</strong> Course progress, quiz scores, and learning activity to personalize your experience.</li>
                <li><strong className="text-foreground">Device Information:</strong> Browser type, IP address, and device identifiers for security and analytics.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">2. How We Use Your Information</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>To provide and maintain our learning platform</li>
                <li>To process subscriptions and payments</li>
                <li>To track your learning progress and issue certificates</li>
                <li>To send important account notifications</li>
                <li>To improve our courses and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">3. Data Sharing</h2>
              <p>We do not sell your personal data. We may share information with:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong className="text-foreground">Payment Processors:</strong> Paystack, to process your subscription payments.</li>
                <li><strong className="text-foreground">Authentication Providers:</strong> Google, when you sign in with your Google account.</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">4. Data Security</h2>
              <p>We implement industry-standard security measures including encryption, secure authentication, and row-level database security to protect your data.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">6. Contact Us</h2>
              <p>If you have questions about this privacy policy, please contact us at <strong className="text-foreground">support@codeforge.com</strong>.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
