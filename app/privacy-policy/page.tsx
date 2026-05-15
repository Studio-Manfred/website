import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Studio Manfred",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageNav />
      <main id="main" tabIndex={-1}>
        <section className="bg-white px-6 md:px-12 py-20 md:py-32">
          <div className="mx-auto" style={{ maxWidth: "760px" }}>

            <h1
              className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-12"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Privacy policy
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              <p className="font-light text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1.15rem, 1.75vw, 1.4rem)", lineHeight: 1.6 }}>
                This privacy policy will explain how our company uses your personal data we collect from you when you use our website.
              </p>

              <Section heading="What data do we collect?">
                <p>Our Company might collects the following data:</p>
                <ul>
                  <li>Personal identification information (Name, email address, phone number, etc.).</li>
                  <li>Digital usage like web and mail.</li>
                </ul>
              </Section>

              <Section heading="How do we collect your data?">
                <p>You directly provide Studio Manfred with most of the data we collect. We collect data and process data when you:</p>
                <ul>
                  <li>Register online or place an order for any of our products or services.</li>
                  <li>Voluntarily complete a customer survey or provide feedback on any of our message boards or via email.</li>
                  <li>Use or view our website via your browser&apos;s cookies.</li>
                  <li>Sign up for our newsletter</li>
                  <li>Get in touch via mail</li>
                </ul>
              </Section>

              <Section heading="How will we use your data?">
                <p>Our Company collects your data so that we can:</p>
                <ul>
                  <li>Process your order and manage your account.</li>
                  <li>Email you with special offers on other products and services we think you might like.</li>
                  <li>Improve our webpage.</li>
                </ul>
                <p>If you agree, Studio Manfred will share your data with our partner companies like IT and cloud services such as Visma, Google, Folk, Squarespace, Notion, Slack etc.</p>
              </Section>

              <Section heading="How do we store your data?">
                <p>Our Company securely stores your data. Our Company will keep your personal data for as long as we need. Once this time period has expired, we will delete your data.</p>
              </Section>

              <Section heading="Marketing">
                <p>We would like to send you information about products and services of ours that we think you might like.</p>
                <p>If you have agreed to receive content from us, you may always opt out at a later date.</p>
                <p>You have the right at any time to stop Studio Manfred from contacting you.</p>
                <p>If you no longer wish to be contacted for marketing purposes, please contact us.</p>
              </Section>

              <Section heading="What are your data protection rights?">
                <p>Our Company would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                <ul>
                  <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                  <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request us to complete the information you believe is incomplete.</li>
                  <li><strong>The right to delete</strong> – You have the right to request that we delete your personal data, under certain conditions.</li>
                  <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                  <li><strong>The right to object to processing</strong> – You have the right to object that we are processing your personal data, under certain conditions.</li>
                  <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected directly to you, under certain conditions.</li>
                </ul>
                <p>If you make a request, we have one month to respond to you. If you would like to use any of these rights, please contact us at our email: <a href="mailto:hello@studiomanfred.com" className="underline underline-offset-2 hover:text-[var(--color-business-blue)] transition-colors">hello@studiomanfred.com</a></p>
              </Section>

              <Section heading="Cookies">
                <p>Cookies are text files placed on your computer to collect standard Internet log information and visitor behaviour information. When you visit our websites, we may collect information from you automatically through cookies or similar technology</p>
                <p>For further information, visit <a href="https://allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-business-blue)] transition-colors">allaboutcookies.org</a>.</p>
              </Section>

              <Section heading="How do we use cookies?">
                <p>We uses cookies in a range of ways to improve your experience on our website, including:</p>
                <ul>
                  <li>Keeping you signed in</li>
                  <li>Understanding how you use our website</li>
                </ul>
              </Section>

              <Section heading="What types of cookies do we use?">
                <p>There are several types of cookies, however, our website uses:</p>
                <ul>
                  <li><strong>Functionality</strong> – Our Company uses these cookies so that we recognize you on our website and remember your previously selected preferences. These could include what language you prefer and the location you are in. A mix of first-party and third-party cookies are used.</li>
                </ul>
              </Section>

              <Section heading="How to manage cookies">
                <p>You can set your browser not to accept cookies, and the above website tells you how to remove cookies from your browser. However, in a few cases, some of our website features may not function as a result.</p>
              </Section>

              <Section heading="Privacy policies of other websites">
                <p>The Our Company website contains links to other websites. Our privacy policy applies only to our website, so if you click on a link to another website, you should read their privacy policy.</p>
              </Section>

              <Section heading="Changes to our privacy policy">
                <p>Our Company keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 28th of May 2023.</p>
              </Section>

              <Section heading="How to contact us">
                <p>If you need any clarification about our privacy policy, the data we hold on you, or you would like to use one of your data protection rights, please do not hesitate to contact us.</p>
                <p>Email us at: <a href="mailto:hello@studiomanfred.com" className="underline underline-offset-2 hover:text-[var(--color-business-blue)] transition-colors">hello@studiomanfred.com</a></p>
              </Section>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--color-border-default)] pt-8">
      <h2
        className="font-extrabold text-[var(--color-text-primary)] mb-4"
        style={{ fontSize: "clamp(1.1rem, 1.75vw, 1.4rem)" }}
      >
        {heading}
      </h2>
      <div
        className="font-light text-[var(--color-text-secondary)] leading-relaxed flex flex-col gap-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:mt-2 [&_li]:list-disc [&_ul]:pl-5 [&_strong]:font-semibold [&_strong]:text-[var(--color-text-primary)]"
        style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", lineHeight: 1.6 }}
      >
        {children}
      </div>
    </div>
  );
}
