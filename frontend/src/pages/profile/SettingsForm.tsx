// Dependencies
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

// Types
import { MeResponse } from "@/graphql/schema.types";
// Components
import { ChangePasswordModal } from "@/components/profile/ChangePasswordModal";
import { Enable2FAModal } from "@/components/profile/Enable2FAModal";
import { VerifyEmailModal } from "@/components/profile/VerifyEmailModal";

// Interfaces
interface SettingsFormProps {}

/**
 * SettingsForm Component
 *
 * @interface SettingsFormProps
 * @returns {JSX.Element} - SettingsForm Component
 * @exports SettingsForm
 */
export const SettingsForm: FC<SettingsFormProps> = (): JSX.Element => {
  /**
   * States to toggle the modals
   * @type {boolean}
   * @default false
   */
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const [showVerifyEmailModal, setShowVerifyEmailModal] =
    useState<boolean>(false);
  const [showEnable2FAModal, setShowEnable2FAModal] = useState<boolean>(false);

  /**
   * States to store input values
   * @type {string}
   */
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading } = useGetIdentity<MeResponse>();

  useEffect(() => {
    if (identity) {
      setUsername(identity.user.username);
      setEmail(identity.user.connection!.email);
    }
  }, [identity]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <>
      <form
        className="w-full max-w-96 flex flex-col gap-3 font-['Poppins']"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full max-w-96 p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
            placeholder="e.g. johndoe"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            className="w-full max-w-96 p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
            placeholder="Your email address"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          {!isLoading ? (
            identity?.user.connection?.isEmailVerified ? (
              <div className="flex flex-row gap-1 items-center justify-start">
                <CheckCircleOutlined className="text-green-600 text-xs" />
                <p className="text-green-600 text-xs font-light italic">
                  Your email address is verified
                </p>
              </div>
            ) : (
              <div className="flex flex-row gap-1 items-center justify-start">
                <CloseCircleOutlined className="text-red-600/80 text-xs" />
                <p className="text-red-600/80 text-xs font-light italic">
                  Your email address is not verified
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-row gap-1 items-center justify-start">
              <InfoCircleOutlined className="text-n-4 text-xs" />
              <p className="text-n-4 text-xs font-light italic">
                Fetching email verification status...
              </p>
            </div>
          )}
        </div>

        <input
          type="submit"
          value="Save"
          className="w-full max-w-96 px-4 py-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-md shadow-md cursor-pointer transition-all ease-in-out"
        />
      </form>

      <hr className="hidden md:block w-full max-w-96 my-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-n-5 to-transparent opacity-50" />

      <div className="w-full max-w-96 flex flex-col gap-2">
        {!isLoading && !identity?.user.connection?.isEmailVerified && (
          <>
            <button
              className="w-full max-w-96 px-4 py-2 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
              onClick={() => setShowVerifyEmailModal(true)}
            >
              Verify email address
            </button>
            <VerifyEmailModal
              open={showVerifyEmailModal}
              onClose={() => setShowVerifyEmailModal(false)}
            />
          </>
        )}

        <button
          className="w-full max-w-96 px-4 py-2 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
          onClick={() => setShowChangePasswordModal(true)}
        >
          Change password
        </button>
        <ChangePasswordModal
          open={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
        />

        <button
          className="w-full max-w-96 px-4 py-2 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
          onClick={() => setShowEnable2FAModal(true)}
        >
          Enable 2FA
        </button>
        <Enable2FAModal
          open={showEnable2FAModal}
          onClose={() => setShowEnable2FAModal(false)}
        />

        <div className="w-full max-w-96 text-start text-n-4 text-xs font-light italic">
          <p>Joined on 2021-10-01</p>
        </div>
      </div>
    </>
  );
};
