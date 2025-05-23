import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { TransactionForm } from "./TransactionForm";
import { useState, type JSX } from "react";

export type TransactionFormDrawerProps = React.ComponentProps<typeof Drawer> & {
  CustomComponent?: JSX.Element;
};

export const TransactionFormDrawer = ({
  children,
  CustomComponent,
  ...props
}: TransactionFormDrawerProps) => {
  const [isOpen, onOpenChange] = useState(false);

  const handleClose = () => {
    if (isOpen) {
      onOpenChange(false);
    }
  };
  const handleOpen = () => {
    if (!isOpen) {
      onOpenChange(true);
    }
  };

  return (
    <Drawer
      {...props}
      direction="right"
      onOpenChange={handleOpen}
      open={isOpen}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerClose className="absolute right-4 top-4">
          <Button variant="ghost" size="icon">
            <XIcon className="w-4 h-4 " />
          </Button>
        </DrawerClose>

        {CustomComponent || <TransactionForm onSubmit={handleClose} />}
      </DrawerContent>
    </Drawer>
  );
};
