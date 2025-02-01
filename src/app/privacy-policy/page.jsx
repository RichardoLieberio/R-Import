import MediumLayout from '@components/MediumLayout';
import Link from '@components/Link';

export default function PrivacyPolicyPage() {
    return (
        <MediumLayout>
            <Link href="/">Back to home page</Link>
            <article className="mt-8 flex flex-col gap-10">
                <div>
                    <h1 className="text-3xl font-semibold">Privacy Policy</h1>
                    <small className="text-sm">Effective Date: 1 February 2025</small>
                </div>
                <div>At R Import, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your information when using our web application. Please read it carefully.</div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">1. Introduction</h2>
                    <p>R Import is a web application created for case study and demonstration purposes. It showcases how to import images from platforms such as Instagram, Google My Business, and manually uploaded content. The app does not store any client data, and user activity is not tracked or monitored by our platform.</p>
                    <p>The source code of R Import is publicly available, allowing developers around the world to use it for their own purposes and integrate it into their own applications.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">2. Data Collection</h2>
                    <p>We do not collect or store any personal information from our users. The app solely operates for demonstration purposes and does not retain any data related to client activities. No user data is stored on our servers.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">3. Data Usage</h2>
                    <p>Since R Import does not collect or store any personal information, there is no usage of personal data within the platform. All actions within the app are for demonstration and study purposes only.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">4. Data Sharing & Third Parties</h2>
                    <p>We do not share or sell any personal data to third parties. As R Import does not store client data, there is no sharing of such data with external parties.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">5. Data Retention & Security</h2>
                    <p>As we do not store any client data, there is no need for data retention or security protocols for personal information. The app does not track user activity, and no data is stored that would need protection.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">6. User Rights</h2>
                    <p>As no personal data is collected or stored by R Import, users do not need to exercise any rights concerning data access, modification, or deletion.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">7. Contact Information</h2>
                    <p>If you have any questions or concerns about this Privacy Policy or the use of the R Import app, feel free to contact us at:</p>
                    <p>Email: rlieberio@gmail.com</p>
                </div>
            </article>
        </MediumLayout>
    );
}