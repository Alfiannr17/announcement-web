import React from 'react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function DeleteConfirmModal({ 
    show, 
    onClose, 
    onConfirm, 
    title = "", 
    message = "",
    processing = false 
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6 text-center">
                
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                    {title}
                </h2>
                
                <p className="text-sm text-gray-500 mb-6">
                    {message}
                </p>

                <div className="flex justify-center space-x-2">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton
                        onClick={onConfirm}
                        disabled={processing}
                    >
                        {processing ? 'Deleting...' : 'Yes, Delete'}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}