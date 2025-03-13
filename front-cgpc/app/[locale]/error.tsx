'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        /* eslint-disable no-console */
        console.error(error);
    }, [error]);
    const t = useTranslations('ErrorPage');

    return (
        <div>
            <h2>{t('message')}</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                {t('try-again')}
            </button>
        </div>
    );
}
