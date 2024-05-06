// Dependencies
import { FC } from 'react';
import { createPortal } from 'react-dom';

// Interfaces
interface SubscribeModalProps {}

/**
 * SubscribeModal Component
 *
 * @interface SubscribeModalProps
 * @returns {JSX.Element} - SubscribeModal Component
 * @exports SubscribeModal
 */
export const SubscribeModal: FC<SubscribeModalProps> = (): JSX.Element => {
    return createPortal(
        <></>,
        document.getElementById('portal') as HTMLDivElement
    );
};