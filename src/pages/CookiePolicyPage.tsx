import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="font-display text-lg font-bold text-foreground">1. What Are Cookies?</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">2. How We Use Cookies</h2>
              <p>CodeForge uses the following types of cookies:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong className="text-foreground">Essential Cookies:</strong> Required for authentication and security. These keep you logged in and protect your account. Cannot be disabled.
                </li>
                <li>
                  <strong className="text-foreground">Functional Cookies:</strong> Remember your preferences such as theme settings (dark/light mode) and language.
                </li>
                <li>
                  <strong className="text-foreground">Analytics Cookies:</strong> Help us understand how you use CodeForge so we can improve the platform. This data is anonymized.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">3. Third-Party Cookies</h2>
              <p>Some cookies may be set by third-party services we use:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong className="text-foreground">Google:</strong> For authentication when you sign in with Google.</li>
                <li><strong className="text-foreground">YouTube:</strong> For embedded video content in courses.</li>
                <li><strong className="text-foreground">Paystack:</strong> For processing payments securely.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">4. Managing Cookies</h2>
              <p>You can manage cookies through your browser settings:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong className="text-foreground">Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong className="text-foreground">Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                <li><strong className="text-foreground">Safari:</strong> Preferences → Privacy → Cookies</li>
              </ul>
              <p className="mt-2">Note: Disabling essential cookies may prevent you from using CodeForge properly.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">5. Local Storage</h2>
              <p>In addition to cookies, we use browser local storage to maintain your authentication session and store user preferences. This data stays on your device and is not transmitted to third parties.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-foreground">6. Contact</h2>
              <p>If you have questions about our cookie practices, contact us at <strong className="text-foreground">support@codeforge.com</strong>.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
