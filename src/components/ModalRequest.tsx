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
} from "./ui/dialog";

const ModalRequest = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary" size="sm" className="mr-auto">
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
              Step 1: Requesting author.. <span>Completed</span>
            </p>
            <p>Step 2: Requesting quote..</p>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="primary" size="sm" className="mr-auto">
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
