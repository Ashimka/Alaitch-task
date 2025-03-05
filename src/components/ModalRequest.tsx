import { useRef, useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";

import { IApiResponse, IAuthorData, IErrorData, IQuoteData } from "@/types";

interface ModalRequestProps {
  onResultChange: (
    result: IApiResponse<IQuoteData | IErrorData> | null
  ) => void;
}

const ModalRequest = ({ onResultChange }: ModalRequestProps) => {
  const [isAuthorId, setIsAuthorId] = useState(false);
  const [isQuoteId, setIsQuoteId] = useState(false);
  const { accessToken } = useAuth();

  const controllerRef = useRef<AbortController | null>(null);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async (url: string) => {
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (!data) {
      onResultChange({
        success: false,
        data: {
          message: "Access denied.",
        },
      });
    }
    return data;
  };

  const handleFetchClick = async () => {
    onResultChange(null);
    setIsAuthorId(false);
    setIsQuoteId(false);

    await delay(5000);
    const authorData: IAuthorData[] = await fetchData(
      `${import.meta.env.VITE_SERVER_URL}/author?token=${accessToken}`
    );

    const { authorId } =
      authorData[Math.floor(Math.random() * authorData.length)];

    setIsAuthorId(!!authorId);

    await delay(5000);
    const quoteData: IQuoteData[] = await fetchData(
      `${
        import.meta.env.VITE_SERVER_URL
      }/quote?token=${accessToken}&authorId=${authorId}`
    );

    setIsQuoteId(!!quoteData);

    onResultChange({
      success: true,
      data: quoteData[Math.floor(Math.random() * quoteData.length)],
    });
  };

  const handleCancelClick = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      onResultChange({
        success: false,
        data: {
          message: "Запрос отменен.",
        },
      });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={handleFetchClick}
            variant="primary"
            size="sm"
            className="mr-auto"
          >
            Update
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="mr-auto">Requesting the quote</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="flex flex-col">
            <p>
              Step 1: Requesting author...
              <span>{isAuthorId && <> Completed</>}</span>
            </p>
            <p>
              Step 2: Requesting quote...
              <span>{isQuoteId && <> Completed</>}</span>
            </p>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={handleCancelClick}
                variant="primary"
                size="sm"
                className="mr-auto"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalRequest;
