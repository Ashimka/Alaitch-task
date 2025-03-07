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
  authorQuote: (author: IAuthorData | null) => void;
}

const ModalRequest = ({ onResultChange, authorQuote }: ModalRequestProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorId, setIsAuthorId] = useState(false);
  const [isQuoteId, setIsQuoteId] = useState(false);

  const { accessToken } = useAuth();

  const controllerRef = useRef<AbortController | null>(null);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async (url: string) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      await delay(5000);
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (!data) {
        return onResultChange({
          success: false,
          data: {
            message: "Access denied.",
          },
        });
      }

      return data;
    } catch (error) {
      if (error === "AbortError") {
        onResultChange({
          success: false,
          data: {
            message: "Access denied.",
          },
        });
      } else {
        throw error;
      }
    } finally {
      controllerRef.current = null;
    }
  };

  const handleFetchClick = async () => {
    onResultChange(null);
    setIsAuthorId(false);
    setIsQuoteId(false);
    setIsOpen(true);

    try {
      const authorsData: IAuthorData[] = await fetchData(
        `${import.meta.env.VITE_SERVER_URL}/author?token=${accessToken}`
      );

      const authorData =
        authorsData[Math.floor(Math.random() * authorsData.length)];

      setIsAuthorId(!!authorData);

      const quoteData: IQuoteData[] = await fetchData(
        `${
          import.meta.env.VITE_SERVER_URL
        }/quote?token=${accessToken}&authorId=${authorData.authorId}`
      );

      setIsQuoteId(!!quoteData);

      return (
        onResultChange({
          success: true,
          data: quoteData[Math.floor(Math.random() * quoteData.length)],
        }),
        authorQuote(authorData)
      );
    } catch (error) {
      if (error === "AbortError") {
        onResultChange({
          success: false,
          data: {
            message: "Произошла ошибка при выполнении запроса.",
          },
        });
      } else {
        onResultChange({
          success: false,
          data: {
            message: "Произошла ошибка при выполнении запроса!",
          },
        });
      }
    } finally {
      await delay(500);
      setIsOpen(false);
    }
  };

  const handleCancelClick = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
