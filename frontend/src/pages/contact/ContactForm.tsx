// Dependencies
import emailjs from "@emailjs/browser";
import { FC, FormEvent, RefObject, useRef, useState } from "react";
import { useGetIdentity, useNotification } from "@refinedev/core";
import { MeResponse } from "@/graphql/schema.types";
import { Link } from "react-router-dom";

// Interfaces
interface ContactFormProps {}

/**
 * ContactForm Component
 *
 * @interface ContactFormProps
 * @returns {JSX.Element} - ContactForm Component
 * @exports ContactForm
 */
export const ContactForm: FC<ContactFormProps> = (): JSX.Element => {
  /**
   * State to store if the form is processing
   * @type {boolean}
   * @default false
   */
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  /**
   * Reference to the form element
   * @type {RefObject<HTMLFormElement>}
   */
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);

  /**
   * Notification hook to show notifications to the user
   * @type {function}
   */
  const { open } = useNotification();

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  /**
   * Function to handle form submission
   * @param {FormEvent<HTMLFormElement>} e - Form Event
   * @returns {void}
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Prevent multiple submissions while processing
    if (
      isProcessing ||
      isIdentityLoading ||
      !identity ||
      !identity.user.connection?.isEmailVerified
    )
      return;

    setIsProcessing(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_API_EMAIL_SERVICE_ID,
        import.meta.env.VITE_API_EMAIL_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_API_EMAIL_PUBLIC_KEY
      )
      .then(() => {
        (e.target as HTMLFormElement).reset();
        open?.({
          type: "success",
          description: "Message sent successfully",
          message: "We'll get back to you as soon as possible. Thank you!",
          key: "contact-form-success",
        });
        setIsProcessing(false);
      })
      .catch(() => {
        open?.({
          type: "error",
          description: "Failed to send message",
          message: "We couldn't send your message. Please try again later.",
          key: "contact-form-error",
        });
        setIsProcessing(false);
      });
  };

  return (
    <form
      ref={formRef}
      className="w-full max-w-xl flex flex-col gap-6 font-['Poppins']"
      onSubmit={handleSubmit}
    >
      {identity?.user.connection?.email && (
        <input
          type="hidden"
          id="email"
          name="email"
          value={identity?.user.connection?.email}
        />
      )}

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="e.g. John"
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="w-full min-h-40 p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="Your message here..."
          minLength={50}
          required
        ></textarea>
      </div>

      {!identity?.user.connection?.isEmailVerified ? (
        <div className="w-full mt-2">
          <Link
            to="/profile"
            className="text-n-3 italic hover:text-n-2 active:text-n-2 transition-all hover:underline"
            draggable={false}
          >
            Please verify your email address to send messages. Verify Now
            &gt;&gt;
          </Link>
        </div>
      ) : (
        <>
          <div className="w-full mt-2">
            <button
              type="submit"
              className="w-full text-base bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-5 py-2.5 text-center transition-all duration-300 ease-in-out transform disabled:opacity-80 disabled:cursor-progress"
              disabled={
                isProcessing ||
                isIdentityLoading ||
                !identity ||
                !identity.user.connection?.isEmailVerified
              }
            >
              Send
            </button>
          </div>

          <div className="w-full text-xs text-n-4">
            We'll get back to you as soon as possible. Thank you!
          </div>
        </>
      )}
    </form>
  );
};
