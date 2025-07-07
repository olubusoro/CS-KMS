import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button as UIButton } from './ui/button';
import { useState } from 'react';
import { FaTimes, FaTrash } from "react-icons/fa";

export default function DeleteModal({title, onConfirm, buttonTitle }) {
  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function handleConfirm() {
    if (onConfirm) {
      onConfirm()
    }
    close()
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <UIButton
      title={ buttonTitle ? buttonTitle : "Delete"}
        variant="destructive"
        onClick={open}
        // className="px-1 sm:px-2 md:px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition ml-1 sm:ml-2 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-red-600 data-hover:bg-red-600"
      >
        <FaTrash className="inline-block text-white" />
      </UIButton>

      <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-50 bg-black/40 w-screen backdrop-blur-[1px] overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={close}>
                          <FaTimes />
                        </button>
              <DialogTitle as="h3" className="text-base/7 font-medium text-red-600">
                Delete {title ? title : "Item"}
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-gray-600">
                You are about to delete this {title ? title : "Item"}. This action cannot be undone. Please confirm that you want to proceed with this destructive action.
              </p>
              <div className="mt-4 flex justify-around">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 sm:bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-gray-700"
                  onClick={handleConfirm}
                >
                  Confirm!
                </Button>
                <Button
                  className="ml-2 inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-300 data-open:bg-gray-700"
                  onClick={close}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
