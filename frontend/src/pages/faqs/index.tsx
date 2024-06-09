// Dependencies
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { AIScriptLogo } from "@/assets";

// Interfaces
interface FAQsPageProps {}

/**
 * Help / FAQs Page Component
 *
 * @interface FAQsPageProps
 * @returns {JSX.Element} - FAQsPage Component
 * @exports FAQsPage
 */
export const FAQsPage: FC<FAQsPageProps> = (): JSX.Element => {
  useDocumentTitle("AIScript - FAQs & Help Center");

  return (
    <>
      <Helmet>
        <title>AIScript - FAQs &amp; Help Center</title>
        <meta
          name="description"
          content="Get answers to frequently asked questions and get help with AIScript. Join the future of book creation today."
        />
      </Helmet>

      <div className="w-full flex items-start justify-center">
        <div className="w-full max-w-5xl md:h-full flex flex-col items-start justify-start gap-8 overflow-y-auto p-4 md:p-6 lg:p-10 font-['Poppins']">
          <Link
            to="/"
            draggable={false}
            className="w-full flex items-center justify-center"
          >
            <img
              src={AIScriptLogo}
              className="h-20 object-contain mb-5"
              alt="AIScript Logo"
              draggable={false}
            />
          </Link>
          
          <h2 className="h2 font-semibold">
            FAQs &amp; Help Center
          </h2>

          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h2 className="text-2xl md:text-3xl w-full">General</h2>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">How does AIScript work?</h3>
              <p className="text-sm md:text-base text-n-3">
                AIScript uses advanced AI to generate book content based on your
                input, format it in{" "}
                <b className="text-n-2 font-semibold">DOCX</b> and{" "}
                <b className="text-n-2 font-semibold">PDF</b> formats, and
                provide you with a downloadable file. You can then edit the
                content as you see fit and publish it as your own for personal
                or commercial use.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">How can I delete specific books?</h3>
              <p className="text-sm md:text-base text-n-3">
                You can delete specific books by going to the{" "}
                <Link
                  to="/library"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  Library
                </Link>{" "}
                page, selecting the book you want to delete, and clicking the
                delete button on the book view page.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h2 className="text-2xl md:text-3xl w-full">Account</h2>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">How can I change my password?</h3>
              <p className="text-sm md:text-base text-n-3">
                You can change your password by going to the{" "}
                <Link
                  to="/profile"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  Profile
                </Link>{" "}
                page, clicking on the "Change your password" button, and
                following the instructions.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">What happens if I forget my password?</h3>
              <p className="text-sm md:text-base text-n-3">
                If you forget your password, you can reset it by clicking the{" "}
                <Link
                  to="/forgot-password"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  Forgot your password?
                </Link>{" "}
                link in the{" "}
                <Link
                  to="/login"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  Log In
                </Link>{" "}
                page and following the instructions.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                What happens if I lose access to my account due to 2FA?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                We cannot recover your account if you lose access due to 2FA.
                Please make sure to keep your 2FA recovery codes in a safe place
                to prevent losing access to your account.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h2 className="text-2xl md:text-3xl w-full">Billing</h2>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                How can I update my billing information?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                You can update your billing information by going to the{" "}
                <Link
                  to="/pricing"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  Pricing
                </Link>{" "}
                page, upgrading your plan, and following the instructions. If
                you want to keep the same plan, you can cancel your subscription
                and resubscribe with the new billing information.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">How can I cancel my subscription?</h3>
              <p className="text-sm md:text-base text-n-3">
                You can cancel your subscription by going to the{" "}
                <Link
                  to="/pricing"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  Pricing
                </Link>{" "}
                page, clicking on the "Cancel Subscription" button under the
                Basic Plan, and confirming the cancelation.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                Is attribution required when I publish books generated by
                AIScript?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                Attribution (e.g. "Generated by AIScript") is{" "}
                <b className="text-n-2 font-semibold">
                  required from free users only
                </b>
                . Paid users are not required to attribute AIScript when
                publishing books generated by our AI.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                Can I sell books generated by AIScript?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                Yes, but{" "}
                <b className="text-n-2 font-semibold">
                  you must have a paid subscription
                </b>{" "}
                to AIScript to sell books generated by our AI. Free users are
                not allowed to sell books generated by AIScript.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                Does subscribing to one of the paid subscription plans grant me
                retroactive commercial rights to the books I generated while on
                the free plan?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                Yes, subscribing to one of the paid subscription plans grants
                you retroactive commercial rights to the books you generated
                while on the free plan. Because we are nice, don't you think?
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h2 className="text-2xl md:text-3xl w-full">
              Ownership &amp; Copyright
            </h2>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                Who owns the content generated by AIScript?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                If you are a paying subscriber, you own the content generated by
                AIScript and have full rights to use it as you see fit.
              </p>
              <p className="text-sm md:text-base text-n-3">
                If you are using the free version of AIScript, we retain the
                rights to the content generated by our AI. You are allowed to
                use the content for personal use, but you are not allowed to
                sell or distribute it without our permission.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                Who owns the cover images generated along with my books?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                If you are a paying subscriber, you own the cover images
                generated along with your books and have full rights to use them
                as you see fit.
              </p>
              <p className="text-sm md:text-base text-n-3">
                If you are using the free version of AIScript, we retain the
                rights to the cover images generated by our AI. You are allowed
                to use the cover images for personal use, but you are not
                allowed to sell or distribute them without our permission.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                Are the books I generate using AIScript subject to copyright
                protection?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                Yes, the books you generate using AIScript are subject to
                copyright protection. You own the content and have full rights
                to control how it is used and distributed.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h2 className="text-2xl md:text-3xl w-full">
              Privacy &amp; Security
            </h2>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">Is my data safe with AIScript?</h3>
              <p className="text-sm md:text-base text-n-3">
                Yes, your data is safe with AIScript. We use advanced encryption
                and security measures to protect your data and ensure that it is
                not accessible to unauthorized users. For granted security, we
                also recommend using a strong password and enabling two-factor
                authentication (2FA) on your account.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                How does AIScript protect my privacy and data?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                AIScript protects your privacy and data by using advanced
                encryption and security measures to ensure that your data is
                safe and secure. We do not share your data with third parties
                without your consent and take all necessary steps to protect
                your privacy. For more information, please read our{" "}
                <Link
                  to="/privacy"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2">
            <h2 className="text-2xl md:text-3xl w-full">Technical</h2>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                What browsers are supported by AIScript?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                AIScript supports the latest versions of{" "}
                <b className="text-n-2 font-semibold">Google Chrome</b>,{" "}
                <b className="text-n-2 font-semibold">Mozilla Firefox</b>,{" "}
                <b className="text-n-2 font-semibold">Microsoft Edge</b>, and{" "}
                <b className="text-n-2 font-semibold">Apple Safari</b>. We
                recommend using one of these browsers for the best experience.
                If you encounter any issues, please{" "}
                <Link
                  to="/contact"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  contact us
                </Link>{" "}
                for further assistance.
              </p>
            </div>

            <div className="w-full border border-n-6 rounded-md p-6 flex flex-col items-start justify-start gap-2">
              <h3 className="text-xl">
                How can I report a bug or issue with AIScript?
              </h3>
              <p className="text-sm md:text-base text-n-3">
                You can report a bug or issue with AIScript by going to the{" "}
                <Link
                  to="/contact"
                  className="text-n-1 hover:text-n-1/80 active:text-n-1/80 hover:underline transition-all duration-300 ease-in-out font-semibold"
                  draggable={false}
                >
                  Contact Us
                </Link>{" "}
                page, filling out the form, and submitting it. We will get back
                to you as soon as possible to resolve the issue.
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center justify-start gap-1 text-n-3 hover:text-n-1 transition-all underline hover:underline"
          >
            <LeftOutlined className="text-sm mb-0.5" /> Back to Home
          </Link>

          <p className="caption text-n-4 lg:block font-['Poppins']">
            &copy; AIScript {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};
